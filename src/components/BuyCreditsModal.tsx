import React, { useState } from 'react';
import { X, Zap, Check, Sparkles, Loader2, ShoppingCart } from 'lucide-react';
import { CREDIT_PACKS, useCredits } from '../contexts/CreditsContext';
import { initiateMonerooCheckout } from '../services/moneroo';
import './BuyCreditsModal.css';

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'no-credits' | 'buy';
}

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ isOpen, onClose, reason = 'buy' }) => {
  const { credits } = useCredits();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBuyPack = async (packId: string) => {
    const pack = CREDIT_PACKS.find(p => p.id === packId);
    if (!pack) return;

    setIsLoading(packId);
    setError(null);

    const result = await initiateMonerooCheckout({
      amount: pack.priceXOF,
      currency: 'XOF',
      packId: pack.id,
      packName: pack.name,
      creditsAmount: pack.credits,
      customerEmail: 'utilisateur@exemple.com', // TODO: Get from auth context
      customerName: 'Utilisateur',
    });

    setIsLoading(null);

    if (result.ok) {
      // Redirect to Moneroo hosted checkout
      window.location.href = result.checkoutUrl;
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="credits-modal-overlay" onClick={onClose}>
      <div className="credits-modal" onClick={(e) => e.stopPropagation()}>
        <button className="credits-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <div className="credits-modal-header">
          {reason === 'no-credits' ? (
            <>
              <div className="credits-modal-icon warning">
                <Zap size={32} />
              </div>
              <h2>Plus de crédits ! 😢</h2>
              <p>
                Vous avez utilisé vos <strong>{credits}</strong> crédit{credits !== 1 ? 's' : ''}. 
                Rechargez pour continuer à créer des miniatures incroyables.
              </p>
            </>
          ) : (
            <>
              <div className="credits-modal-icon">
                <ShoppingCart size={32} />
              </div>
              <h2>Acheter des crédits</h2>
              <p>
                Solde actuel : <strong className="credits-highlight">{credits} crédit{credits !== 1 ? 's' : ''}</strong>. 
                Choisissez un pack pour recharger.
              </p>
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="credits-modal-error">
            ⚠️ {error}
          </div>
        )}

        {/* Packs Grid */}
        <div className="credits-packs-grid">
          {CREDIT_PACKS.map((pack, index) => (
            <div 
              key={pack.id} 
              className={`credits-pack-card ${pack.popular ? 'popular' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pack.popular && (
                <div className="pack-popular-badge">
                  <Sparkles size={12} /> LE PLUS POPULAIRE
                </div>
              )}
              
              <div className="pack-header">
                <h3>{pack.name}</h3>
                <div className="pack-credits-badge">
                  <Zap size={14} fill="currentColor" />
                  {pack.credits} Crédits
                </div>
              </div>

              <div className="pack-price">
                <span className="pack-price-amount">{pack.priceXOF.toLocaleString('fr-FR')}</span>
                <span className="pack-price-currency">XOF</span>
              </div>
              <div className="pack-price-eur">
                ≈ {pack.priceEUR}€
              </div>

              <p className="pack-description">{pack.description}</p>

              <ul className="pack-features">
                {pack.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={14} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`pack-buy-btn ${pack.popular ? 'primary' : ''}`}
                onClick={() => handleBuyPack(pack.id)}
                disabled={isLoading !== null}
              >
                {isLoading === pack.id ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    Acheter — {pack.priceXOF.toLocaleString('fr-FR')} XOF
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="credits-modal-footer">
          <div className="credits-modal-secure">
            🔒 Paiement sécurisé via Moneroo — Mobile Money & Carte Bancaire
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCreditsModal;
