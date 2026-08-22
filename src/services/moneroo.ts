/**
 * Moneroo payment service for ThumbAI Pro.
 * Adapted from the izisaas mobile money skill's Moneroo adapter.
 * 
 * Moneroo is a hosted multi-provider aggregator covering 
 * African mobile money (Wave, Orange Money, MTN, Moov, etc.) + cards.
 * The buyer is redirected to Moneroo's hosted checkout page.
 * 
 * NOTE: For production, move the secret key to a backend (Supabase Edge Function).
 * This client-side implementation is for MVP/development only.
 */

const MONEROO_API_URL = 'https://api.moneroo.io';
const FETCH_TIMEOUT_MS = 15_000;

export interface CheckoutParams {
  amount: number;           // Integer amount in XOF (no decimals)
  currency: 'XOF';         // For now, XOF only (Mobile Money West Africa)
  packId: string;           // Our internal pack identifier
  packName: string;         // Human-readable pack name
  creditsAmount: number;    // Number of credits being purchased
  customerEmail: string;    // Required by Moneroo
  customerName?: string;    // Optional but recommended
}

export type CheckoutResult = {
  ok: true;
  checkoutUrl: string;
  transactionId: string;
} | {
  ok: false;
  error: string;
};

/**
 * Split a full name into first/last for the Moneroo API.
 * Moneroo requires both first_name and last_name — silent 400 if missing.
 */
function splitName(full: string | undefined, fallbackEmail: string): { first: string; last: string } {
  const v = (full ?? '').trim();
  if (!v) {
    const local = fallbackEmail.split('@')[0] || 'Customer';
    return { first: local, last: '-' };
  }
  const parts = v.split(/\s+/);
  return { first: parts[0]!, last: parts.slice(1).join(' ') || '-' };
}

/**
 * Initiate a Moneroo checkout session.
 * Returns a checkout URL to redirect the user to.
 */
export async function initiateMonerooCheckout(params: CheckoutParams): Promise<CheckoutResult> {
  const secretKey = import.meta.env.VITE_MONEROO_SECRET_KEY;
  
  if (!secretKey) {
    return {
      ok: false,
      error: 'Clé API Moneroo non configurée. Ajoutez VITE_MONEROO_SECRET_KEY dans votre fichier .env',
    };
  }

  const { first, last } = splitName(params.customerName, params.customerEmail);

  // Build the return URL with credit info for the return page
  const returnUrl = `${window.location.origin}?checkout=return&credits=${params.creditsAmount}&pack=${params.packId}`;

  const body = {
    amount: params.amount,
    currency: params.currency,
    description: `ThumbAI Pro - ${params.packName} (${params.creditsAmount} crédits)`.slice(0, 200),
    return_url: returnUrl,
    customer: {
      email: params.customerEmail,
      first_name: first,
      last_name: last,
    },
    metadata: {
      packId: params.packId,
      creditsAmount: String(params.creditsAmount),
      source: 'thumbai-pro',
    },
  };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${MONEROO_API_URL}/v1/payments/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });

    const parsed = await res.json().catch(() => null) as {
      data?: { id?: string; checkout_url?: string };
      message?: string;
    } | null;

    if (!res.ok || !parsed?.data?.id || !parsed?.data?.checkout_url) {
      return {
        ok: false,
        error: parsed?.message || `Erreur Moneroo (${res.status}). Veuillez réessayer.`,
      };
    }

    return {
      ok: true,
      checkoutUrl: parsed.data.checkout_url,
      transactionId: parsed.data.id,
    };
  } catch (err) {
    const message = (err as Error).name === 'AbortError'
      ? 'Le serveur Moneroo ne répond pas. Veuillez réessayer.'
      : `Erreur réseau: ${(err as Error).message}`;
    return { ok: false, error: message };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Verify a Moneroo payment status by re-querying their API.
 * Used on the checkout return page for UX feedback.
 * 
 * NOTE: In production, entitlement should ONLY be granted via webhook,
 * not from the return URL. This is for UX hints only.
 */
export async function verifyMonerooPayment(paymentId: string): Promise<{
  status: 'success' | 'pending' | 'failed';
  amount?: number;
} | null> {
  const secretKey = import.meta.env.VITE_MONEROO_SECRET_KEY;
  if (!secretKey) return null;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${MONEROO_API_URL}/v1/payments/${encodeURIComponent(paymentId)}/verify`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Accept': 'application/json',
        },
        signal: ctrl.signal,
      },
    );

    if (!res.ok) return null;

    const json = await res.json().catch(() => null) as {
      data?: {
        status?: string;
        amount?: number | string;
      };
    } | null;

    if (!json?.data?.status) return null;

    const rawStatus = String(json.data.status).toLowerCase();
    const status: 'success' | 'pending' | 'failed' =
      rawStatus === 'success' || rawStatus === 'succeeded' ? 'success' :
      rawStatus === 'failed' || rawStatus === 'cancelled' ? 'failed' :
      'pending';

    return {
      status,
      amount: typeof json.data.amount === 'string'
        ? parseInt(json.data.amount, 10)
        : json.data.amount,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
