import React, { useState } from 'react';
import { Play, Check, X, MonitorPlay, Mic, Video } from 'lucide-react';
import './LandingPage.css';
import BuyCreditsModal from './BuyCreditsModal';

interface LandingPageProps {
  onConnect: () => void;
  
}

const LandingPage: React.FC<LandingPageProps> = ({ onConnect }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  return (
    <div className="landing-wrapper">
      {/* ================== NAVIGATION ================== */}
      
      {/* ================== FLOATING PILLS NAVIGATION ================== */}
      
      <div className="pro-floating-nav-container">
        <div className="nav-group-left">
          <div className="pro-nav-pill logo-pill">
            <div className="pro-logo-icon">
              <Play size={16} strokeWidth={0} />
            </div>
            <span className="pro-logo-text">ThumbAI Pro</span>
          </div>
        </div>
        
        <div className="nav-group-center">
          <a href="#features-card" className="pro-nav-pill nav-link">Fonctionnalités</a>
          <a href="#checkout-card" className="pro-nav-pill nav-link">Tarifs</a>
        </div>
        
        <div className="nav-group-right">
          <button className="pro-nav-pill login-pill" onClick={() => setShowLogin(true)}>Se connecter</button>
        </div>
      </div>
      
      {/* ================== HERO SECTION ================== */}
      <section className="pro-hero" id="features">
        {/* Background Effects (reused from pricing section styling) */}
        <div className="hero-floating-elements">
          <div className="hero-float-icon hi-1"><MonitorPlay size={64} strokeWidth={1.5} /></div>
          <div className="hero-float-icon hi-2"><Mic size={48} strokeWidth={1.5} /></div>
          <div className="hero-float-icon hi-3"><Video size={56} strokeWidth={1.5} /></div>
          <div className="hero-float-text hi-4">16:9</div>
          <div className="hero-float-text hi-5">4K</div>
        </div>
        <div className="pricing-glass-bg">
          <div className="pricing-wave" style={{ opacity: 0.6, transform: 'rotate(-5deg) translateY(-20%)' }}></div>
          <div className="blue-streak s1" style={{ top: '20%', left: '-5%' }}></div>
          <div className="blue-streak s2" style={{ top: '60%', right: '-15%' }}></div>
          <div className="bg-floating-icon yt-float-1">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="rgba(22, 125, 255, 0.03)"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02l0-6.53 6.06 3.26-6.06 3.27z"/></svg>
          </div>
          <div className="bg-floating-icon yt-float-2">
            <div className="yt-fake-badge">16:9</div>
          </div>
        </div>

        <div className="pro-hero-content">
          <h1 className="pro-hero-title electric-text" style={{ textShadow: '0 0 30px rgba(22, 125, 255, 0.5)' }}>
            Le Studio IA Ultime<br />pour vos miniatures
          </h1>
          <p className="pro-hero-subtitle">
            Un seul mode de création, une qualité maximale. Inscrivez-vous et recevez<br/>3 crédits gratuits pour générer vos premiers concepts.
          </p>
          <div className="pro-hero-buttons">
            <button className="btn-liquid-glass large" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Démarrer (3 Crédits Offerts)
            </button>
          </div>
        </div>

        <div className="pro-hero-mockup">
          <div className="hero-glass-container">
            <div className="dashboard-mockup">
              {/* Top Row */}
              <div className="dashboard-top-section">
                  {/* Video Player */}
                  <div className="dashboard-card video-player">
                      <div></div> {/* Spacer */}
                      <div className="play-button">
                          <div className="play-icon"></div>
                      </div>
                      <div className="progress-bar">
                          <div className="progress-fill">
                              <div className="progress-knob"></div>
                          </div>
                      </div>
                  </div>

                  {/* Charts Side */}
                  <div className="charts">
                      {/* Retension Chart */}
                      <div className="dashboard-card chart-card">
                          <div className="pill-label">Analyse de rétention</div>
                          <svg className="chart-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
                              {/* Area fill */}
                              <path className="chart-area" d="M 10 80 Q 50 80, 80 50 T 150 40 T 220 20 T 290 10 L 290 100 L 10 100 Z" />
                              {/* Line */}
                              <path className="chart-line" d="M 10 80 Q 50 80, 80 50 T 150 40 T 220 20 T 290 10" />
                              <circle className="chart-point" cx="150" cy="40" r="5" />
                              <circle className="chart-point" cx="290" cy="10" r="5" />
                              {/* Label */}
                              <g transform="translate(130, 20)">
                                  <rect width="45" height="18" rx="4" fill="var(--dark-blue)" />
                                  <text x="5" y="12" fill="#fff" fontSize="10" fontFamily="sans-serif">Ret: 68%</text>
                              </g>
                          </svg>
                      </div>

                      {/* Hotspots Chart */}
                      <div className="dashboard-card chart-card">
                          <div className="pill-label">Points chauds</div>
                          <svg className="chart-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
                              <path className="chart-line" d="M 10 80 L 70 40 L 130 60 L 190 20 L 280 45" />
                              <circle className="chart-point" cx="70" cy="40" r="5" />
                              <circle className="chart-point" cx="130" cy="60" r="5" />
                              <circle className="chart-point" cx="190" cy="20" r="5" />
                              <circle className="chart-point" cx="280" cy="45" r="5" />
                              
                              {/* Labels */}
                              <g transform="translate(45, 20)">
                                  <rect width="55" height="16" rx="4" fill="var(--dark-blue)" />
                                  <text x="4" y="11" fill="#fff" fontSize="9" fontFamily="sans-serif">Time: 4:32</text>
                              </g>
                              <g transform="translate(100, 80)">
                                  <rect width="55" height="16" rx="4" fill="var(--dark-blue)" />
                                  <text x="4" y="11" fill="#fff" fontSize="9" fontFamily="sans-serif">Rme: 4:7.1</text>
                              </g>
                              <g transform="translate(165, 0)">
                                  <rect width="55" height="16" rx="4" fill="var(--dark-blue)" />
                                  <text x="4" y="11" fill="#fff" fontSize="9" fontFamily="sans-serif">Time: 4:32</text>
                              </g>
                              <g transform="translate(250, 65)">
                                  <rect width="50" height="16" rx="4" fill="var(--dark-blue)" />
                                  <text x="4" y="11" fill="#fff" fontSize="9" fontFamily="sans-serif">Ret: 1:18</text>
                              </g>
                          </svg>
                      </div>
                  </div>
              </div>

              {/* Bottom Row */}
              <div className="dashboard-bottom-section">
                  {/* Vidéo YouTube Thumbnail Card */}
                  <div className="dashboard-card format-card">
                      <div className="check-badge">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <div className="card-header">
                          <div className="icon-box yt-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02l0-6.53 6.06 3.26-6.06 3.27z"/></svg>
                          </div>
                          <div>
                              <div className="card-title">Paysage</div>
                              <div className="card-subtitle">16:9</div>
                          </div>
                      </div>
                      <div className="thumbnail-container">
                          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" alt="Vidéo YouTube Thumbnail" className="thumbnail" style={{ width: '100%', aspectRatio: '16/9', display: 'block' }} />
                      </div>
                  </div>

                  {/* Podcast Card */}
                  <div className="dashboard-card format-card">
                      <div className="check-badge">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <div className="card-header">
                          <div className="icon-box pod-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                          </div>
                          <div>
                              <div className="card-title">Carré</div>
                              <div className="card-subtitle">1:1</div>
                          </div>
                      </div>
                      <div className="thumbnail-container">
                          <img src="https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?auto=format&fit=crop&w=600&q=80" alt="Podcast Thumbnail" className="thumbnail" style={{ width: '100%', aspectRatio: '1/1', display: 'block' }} />
                      </div>
                  </div>

                  {/* Portrait Card */}
                  <div className="dashboard-card format-card">
                      <div className="check-badge">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <div className="card-header">
                          <div className="icon-box" style={{background: 'rgba(22, 125, 255, 0.1)', color: '#167DFF'}}>
                              <MonitorPlay size={20} />
                          </div>
                          <div>
                              <div className="card-title">Portrait</div>
                              <div className="card-subtitle">9:16</div>
                          </div>
                      </div>
                      <div className="thumbnail-container">
                          <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80" alt="Portrait Thumbnail" className="thumbnail" style={{ width: '100%', aspectRatio: '9/16', display: 'block' }} />
                      </div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== PRICING SECTION ================== */}
      <section id="pricing" className="pro-pricing-section">
        
        {/* Background Effects */}
        <div className="pricing-glass-bg">
          <div className="pricing-wave"></div>
          <div className="blue-streak s1"></div>
          <div className="blue-streak s2"></div>
          <div className="bg-floating-icon yt-float-3">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="rgba(22, 125, 255, 0.02)"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02l0-6.53 6.06 3.26-6.06 3.27z"/></svg>
          </div>
          <div className="bg-floating-icon yt-float-4">
            <div className="yt-fake-badge outline">4K HD</div>
          </div>
        </div>
        
        <div className="pricing-titles">
          <h2 className="pricing-title-main electric-text">Nos Tarifs</h2>
          <p className="pricing-subtitle-main">L'arsenal complet pour des miniatures virales.</p>
        </div>
        
        
        <div className="pricing-split-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '0 2rem' }}>
          {/* Pack Découverte */}
          <div className="pricing-glass-card checkout-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="checkout-content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="pricing-card-header" style={{ marginBottom: '2rem' }}>
                <h3 className="plan-name" style={{ fontSize: '1.4rem' }}>Pack Découverte</h3>
                <div className="plan-price electric-price" style={{ fontSize: '2.5rem', margin: '1rem 0' }}>9,99€</div>
                <div style={{ background: 'rgba(22, 125, 255, 0.1)', color: '#167DFF', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem' }}>
                  ⚡ 100 Crédits
                </div>
                <p className="plan-desc">Parfait pour tester l'outil et générer vos premières miniatures virales.</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Accès complet au Studio</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Qualité 4K HD</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Crédits valables à vie</li>
              </ul>
              <div className="pricing-btn-container">
                <button className="btn-liquid-glass w-full" style={{ background: 'rgba(255,255,255,0.8)', color: '#0F172A' }} onClick={() => setShowPayment(true)}>Acheter</button>
              </div>
            </div>
          </div>

          {/* Pack Pro (Popular) */}
          <div className="pricing-glass-card checkout-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', transform: 'scale(1.05)', border: '2px solid #167DFF', position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #167DFF 0%, #00F0FF 100%)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem', boxShadow: '0 10px 20px rgba(22,125,255,0.3)' }}>
              LE PLUS POPULAIRE
            </div>
            <div className="checkout-content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="pricing-card-header" style={{ marginBottom: '2rem', marginTop: '1rem' }}>
                <h3 className="plan-name" style={{ fontSize: '1.4rem' }}>Pack Pro</h3>
                <div className="plan-price electric-price" style={{ fontSize: '3.5rem', margin: '1rem 0' }}>29,99€</div>
                <div style={{ background: 'rgba(22, 125, 255, 0.15)', color: '#167DFF', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem' }}>
                  ⚡ 500 Crédits
                </div>
                <p className="plan-desc">L'arsenal complet pour les créateurs sérieux qui publient régulièrement.</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569', fontWeight: 500 }}><Check size={18} color="#167DFF" /> Tout du Pack Découverte</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Scan facial des émotions premium</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Support technique prioritaire</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> -40% d'économie au crédit</li>
              </ul>
              <div className="pricing-btn-container">
                <button className="btn-liquid-glass w-full" onClick={() => setShowPayment(true)}>Acheter le Pack Pro</button>
              </div>
            </div>
          </div>

          {/* Pack Studio */}
          <div className="pricing-glass-card checkout-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="checkout-content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="pricing-card-header" style={{ marginBottom: '2rem' }}>
                <h3 className="plan-name" style={{ fontSize: '1.4rem' }}>Pack Studio</h3>
                <div className="plan-price electric-price" style={{ fontSize: '2.5rem', margin: '1rem 0' }}>49,99€</div>
                <div style={{ background: 'rgba(22, 125, 255, 0.1)', color: '#167DFF', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem' }}>
                  ⚡ 1000 Crédits
                </div>
                <p className="plan-desc">Pour les agences et créateurs massifs. Le coût par miniature le plus bas.</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Accès complet au Studio</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Historique illimité des projets</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: '#475569' }}><Check size={18} color="#167DFF" /> Accès aux futures betas IA</li>
              </ul>
              <div className="pricing-btn-container">
                <button className="btn-liquid-glass w-full" style={{ background: 'rgba(255,255,255,0.8)', color: '#0F172A' }} onClick={() => setShowPayment(true)}>Acheter</button>
              </div>
            </div>
          </div>
        </div>
</section>

      {/* ================== LOGIN MODAL ================== */}
      {showLogin && (
        <div className="login-modal-overlay">
          <div className="pricing-glass-card login-modal">
            <button className="close-modal-btn" onClick={() => setShowLogin(false)}><X size={24} /></button>
            <h3 className="pro-title" style={{marginTop: 0}}>Connexion</h3>
            <p style={{marginBottom: '1.5rem', color: '#334155', fontWeight: 500}}>Accédez à votre espace ThumbAI Pro.</p>
            <form className="login-form" onSubmit={(e) => { e.preventDefault(); setShowLogin(false); onConnect(); }}>
              <input type="email" placeholder="Adresse e-mail" required />
              <input type="password" placeholder="Mot de passe" required />
              <button type="submit" className="pro-btn-primary" style={{width: '100%', marginTop: '1rem', padding: '0.8rem 1.5rem'}}>Se connecter</button>
            </form>
          </div>
        </div>
      )}

      {/* ================== PAYMENT MODAL ================== */}
      <BuyCreditsModal isOpen={showPayment} onClose={() => setShowPayment(false)} reason="buy" />
    </div>
  );
};

export default LandingPage;
