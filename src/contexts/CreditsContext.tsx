import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface CreditsContextType {
  credits: number;
  useCredit: () => Promise<boolean>;
  addCredits: (amount: number, packId?: string, price?: number, currency?: string) => Promise<void>;
  isLoaded: boolean;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

const INITIAL_CREDITS = 3;

export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get the current session user
    const fetchUserAndCredits = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        await loadCredits(session.user.id);
      } else {
        // Fallback for visual rendering if no user yet (will be 0 until logged in)
        setIsLoaded(true);
      }
    };
    fetchUserAndCredits();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        await loadCredits(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadCredits = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', uid)
        .single();

      if (error && error.code === 'PGRST116') {
        // No row found, let's create one with initial credits
        const { error: insertError } = await supabase
          .from('user_credits')
          .insert({ user_id: uid, credits: INITIAL_CREDITS });
        
        if (!insertError) {
          setCredits(INITIAL_CREDITS);
        }
      } else if (data) {
        setCredits(data.credits);
      }
    } catch (err) {
      console.error("Error loading credits:", err);
    } finally {
      setIsLoaded(true);
    }
  };

  const useCredit = useCallback(async (): Promise<boolean> => {
    if (credits <= 0) return false;
    
    // Optimistic UI update
    setCredits(prev => prev - 1);
    
    if (userId) {
      const { data, error } = await supabase.rpc('consume_credit');
      if (error || !data) {
        // Revert optimistic update
        setCredits(prev => prev + 1);
        return false;
      }
      return true;
    }
    return false;
  }, [credits, userId]);

  const addCredits = useCallback(async (amount: number, packId: string = 'unknown', price: number = 0, currency: string = 'EUR') => {
    // Optimistic UI update
    setCredits(prev => prev + amount);
    
    if (userId) {
      // Get current credits
      const { data: currentData } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', userId)
        .single();
        
      const newTotal = (currentData?.credits || 0) + amount;
      
      // Update credits
      await supabase
        .from('user_credits')
        .update({ credits: newTotal, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
        
      // Record purchase history
      await supabase
        .from('purchase_history')
        .insert({
          user_id: userId,
          pack_id: packId,
          amount: price,
          currency: currency,
          credits_added: amount
        });
    }
  }, [userId]);

  return (
    <CreditsContext.Provider value={{ credits, useCredit, addCredits, isLoaded }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = (): CreditsContextType => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

// Credit pack definitions
export const CREDIT_PACKS = [
  {
    id: 'decouverte',
    name: 'Pack Découverte',
    credits: 100,
    priceEUR: 9.99,
    priceXOF: 6500,
    popular: false,
    description: 'Parfait pour tester l\'outil et générer vos premières miniatures virales.',
    features: ['Accès complet au Studio', 'Qualité 4K HD', 'Crédits valables à vie'],
  },
  {
    id: 'pro',
    name: 'Pack Pro',
    credits: 500,
    priceEUR: 29.99,
    priceXOF: 19500,
    popular: true,
    description: 'L\'arsenal complet pour les créateurs sérieux qui publient régulièrement.',
    features: ['Tout du Pack Découverte', 'Scan facial des émotions premium', 'Support technique prioritaire', '-40% d\'économie au crédit'],
  },
  {
    id: 'studio',
    name: 'Pack Studio',
    credits: 1000,
    priceEUR: 49.99,
    priceXOF: 32500,
    popular: false,
    description: 'Pour les agences et créateurs massifs. Le coût par miniature le plus bas.',
    features: ['Accès complet au Studio', 'Historique illimité des projets', 'Accès aux futures betas IA'],
  },
] as const;

export type CreditPack = typeof CREDIT_PACKS[number];
