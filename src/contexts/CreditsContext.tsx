import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface CreditsContextType {
  credits: number;
  useCredit: () => boolean;
  addCredits: (amount: number) => void;
  isLoaded: boolean;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

const STORAGE_KEY = 'thumbai_credits';
const INITIAL_CREDITS = 3;

export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState<number>(INITIAL_CREDITS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load credits from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        setCredits(parsed);
      }
    }
    // If no stored value, it's a new user → keep INITIAL_CREDITS (3)
    setIsLoaded(true);
  }, []);

  // Persist credits to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, String(credits));
    }
  }, [credits, isLoaded]);

  const useCredit = useCallback((): boolean => {
    if (credits <= 0) return false;
    setCredits(prev => prev - 1);
    return true;
  }, [credits]);

  const addCredits = useCallback((amount: number) => {
    setCredits(prev => prev + amount);
  }, []);

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
