import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, XCircle, ArrowRight } from 'lucide-react';
import { useCredits, CREDIT_PACKS } from '../contexts/CreditsContext';

interface CheckoutReturnProps {
  onContinue: () => void;
}

const CheckoutReturn: React.FC<CheckoutReturnProps> = ({ onContinue }) => {
  const { addCredits } = useCredits();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [creditsToAdd, setCreditsToAdd] = useState(0);
  const [packName, setPackName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const credits = parseInt(params.get('credits') || '0', 10);
    const packId = params.get('pack') || '';
    const paymentStatus = params.get('paymentStatus') || '';

    const pack = CREDIT_PACKS.find(p => p.id === packId);
    setPackName(pack?.name || 'Pack');
    setCreditsToAdd(credits);

    // Simulate verification delay
    const timer = setTimeout(() => {
      if (credits > 0 && paymentStatus !== 'failed') {
        addCredits(credits);
        setStatus('success');
      } else {
        setStatus('failed');
      }

      // Clean the URL
      window.history.replaceState({}, '', window.location.pathname);
    }, 2000);

    return () => clearTimeout(timer);
  }, [addCredits]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e8f4ff 50%, #f0f4ff 100%)',
      padding: '2rem',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(40px)',
        borderRadius: '28px',
        padding: '3rem',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid rgba(22, 125, 255, 0.1)',
        boxShadow: '0 25px 60px rgba(22, 125, 255, 0.08)',
      }}>
        {status === 'verifying' && (
          <>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(22, 125, 255, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <Loader2 size={40} color="#167DFF" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              Vérification en cours...
            </h2>
            <p style={{ color: '#64748b', margin: 0 }}>
              Nous vérifions votre paiement. Un instant s'il vous plaît.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <CheckCircle2 size={40} color="#22c55e" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              Paiement réussi ! 🎉
            </h2>
            <p style={{ color: '#64748b', margin: '0 0 1.5rem' }}>
              <strong style={{ color: '#167DFF' }}>{creditsToAdd} crédits</strong> ({packName}) ont été ajoutés à votre compte.
            </p>
            <button onClick={onContinue} style={{
              background: 'linear-gradient(135deg, #167DFF, #0052CC)',
              color: 'white',
              border: 'none',
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 25px rgba(22, 125, 255, 0.3)',
              transition: 'all 0.3s ease',
            }}>
              Continuer <ArrowRight size={18} />
            </button>
          </>
        )}

        {status === 'failed' && (
          <>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <XCircle size={40} color="#ef4444" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              Paiement échoué
            </h2>
            <p style={{ color: '#64748b', margin: '0 0 1.5rem' }}>
              Le paiement n'a pas abouti. Aucun crédit n'a été débité. Vous pouvez réessayer.
            </p>
            <button onClick={onContinue} style={{
              background: 'rgba(22, 125, 255, 0.08)',
              color: '#167DFF',
              border: '1px solid rgba(22, 125, 255, 0.2)',
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
            }}>
              Retour au dashboard <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutReturn;
