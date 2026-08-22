import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, ArrowLeft, ArrowRight, PlayCircle, BarChart2, PenTool, Layers, MousePointer2, Wand2,
  Smartphone, SquarePlay, MonitorPlay, Eye, Sparkles, Layout,
  Sun, Moon, Lightbulb, Cloud, Palette, Droplet, Aperture, PaintBucket
} from 'lucide-react';
import './QuickMode.css';
import { CheckCircle2, Send, Eraser, MousePointer } from 'lucide-react';
import { useCredits } from '../contexts/CreditsContext';
import BuyCreditsModal from './BuyCreditsModal';

interface ProModeProps {
  onBackToHome: () => void;
}

const ProMode: React.FC<ProModeProps> = ({ onBackToHome }) => {
  const [step, setStep] = useState<number>(1);
  const { credits, useCredit } = useCredits();
  const [showBuyModal, setShowBuyModal] = useState(false);
  
  // State for 10 steps
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [mandatoryElements, setMandatoryElements] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedLighting, setSelectedLighting] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);

  // Options
  const formatsList = [
    { id: 'youtube', name: 'Vidéo YouTube', desc: '16:9', icon: <MonitorPlay size={40} /> },
    { id: 'short', name: 'Vidéo Verticale', desc: '9:16', icon: <Smartphone size={40} /> },
    { id: 'podcast', name: 'Format Carré', desc: '1:1', icon: <SquarePlay size={40} /> },
  ];
  const niches = [
    { id: 'gaming', label: 'Gaming', icon: <PlayCircle size={40} /> },
    { id: 'vlog', label: 'Vlog & Lifestyle', icon: <MonitorPlay size={40} /> },
    { id: 'tech', label: 'Tech & Business', icon: <BarChart2 size={40} /> },
    { id: 'education', label: 'Éducation', icon: <PenTool size={40} /> },
  ];
  const emotions = [
    { id: 'choc', icon: <span style={{fontSize: '40px'}}>😲</span>, label: 'Choc / Surprise' },
    { id: 'peur', icon: <span style={{fontSize: '40px'}}>😨</span>, label: 'Peur / Urgence' },
    { id: 'joie', icon: <span style={{fontSize: '40px'}}>🤩</span>, label: 'Joie / Succès' },
    { id: 'mystere', icon: <span style={{fontSize: '40px'}}>🤔</span>, label: 'Mystère' },
  ];
  const themes = [
    { id: 'realiste', icon: <Aperture size={40} />, label: 'Réaliste / Photo' },
    { id: 'anime', icon: <Wand2 size={40} />, label: 'Animé / Manga' },
    { id: 'cartoon', icon: <MousePointer2 size={40} />, label: 'Cartoon / Dessin' },
    { id: 'cyber', icon: <Zap size={40} />, label: 'Futuriste / Cyberpunk' },
  ];
  const lightings = [
    { id: 'lumineux', icon: <Sun size={40} />, label: 'Lumineuse / Studio' },
    { id: 'sombre', icon: <Moon size={40} />, label: 'Sombre / Horreur' },
    { id: 'neon', icon: <Lightbulb size={40} />, label: 'Néon / Coloré' },
    { id: 'naturel', icon: <Cloud size={40} />, label: 'Lumière Naturelle' },
  ];
  const colors = [
    { id: 'vibrant', icon: <Palette size={40} />, label: 'Vibrantes & Saturées' },
    { id: 'pastel', icon: <Droplet size={40} />, label: 'Douces & Pastel' },
    { id: 'sombre', icon: <Layers size={40} />, label: 'Sombre & Contraste' },
    { id: 'mono', icon: <PaintBucket size={40} />, label: 'Monochrome / Bichromie' },
  ];
  const styles = [
    { id: 'energie', icon: <Zap size={40} />, label: 'Énergique' },
    { id: 'premium', icon: <Sparkles size={40} />, label: 'Premium' },
    { id: 'curiosite', icon: <Eye size={40} />, label: 'Curiosité' },
    { id: 'minimal', icon: <Layout size={40} />, label: 'Minimal' },
  ];

  // Validation logic
  const isCurrentStepValid = useMemo(() => {
    switch(step) {
      case 1: return !!selectedFormat;
      case 2: return videoTitle.trim().length > 0 || videoTitle === 'auto';
      case 3: return videoDesc.trim().length > 0 || videoDesc === 'auto';
      case 4: return !!selectedNiche;
      case 5: return mandatoryElements.trim().length > 0 || mandatoryElements === 'auto';
      case 6: return !!selectedEmotion;
      case 7: return !!selectedTheme;
      case 8: return !!selectedLighting;
      case 9: return !!selectedColors;
      case 10: return !!activeStyle;
      default: return true;
    }
  }, [step, selectedFormat, videoTitle, videoDesc, selectedNiche, mandatoryElements, selectedEmotion, selectedTheme, selectedLighting, selectedColors, activeStyle]);

  const handleNext = () => {
    if (isCurrentStepValid && step < 12) {
      // Check credits before generating (step 10 -> 11)
      if (step === 10) {
        if (credits <= 0) {
          setShowBuyModal(true);
          return;
        }
        useCredit();
      }
      setStep(s => s + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(s => s - 1);
    else onBackToHome();
  };

  const handleAiDecide = () => {
    switch(step) {
      case 2: setVideoTitle('auto'); break;
      case 3: setVideoDesc('auto'); break;
      case 4: setSelectedNiche('auto'); break;
      case 5: setMandatoryElements('auto'); break;
      case 6: setSelectedEmotion('auto'); break;
      case 7: setSelectedTheme('auto'); break;
      case 8: setSelectedLighting('auto'); break;
      case 9: setSelectedColors('auto'); break;
      case 10: setActiveStyle('auto'); break;
    }
    setTimeout(() => {
      setStep(s => s < 12 ? s + 1 : s);
    }, 100);
  };

  
  // State for Step 12 (Inpainting Studio)
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{x: number, y: number, w: number, h: number} | null>(null);
  const [startPos, setStartPos] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([{role: 'ai', text: 'Bonjour ! Dessinez une zone sur l\'image (Lasso/Box) puis dites-moi ce que vous souhaitez modifier.'}]);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({x, y});
    setSelectionBox({x, y, w: 0, h: 0});
    setIsDrawing(true);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    setSelectionBox({
      x: Math.min(currentX, startPos.x),
      y: Math.min(currentY, startPos.y),
      w: Math.abs(currentX - startPos.x),
      h: Math.abs(currentY - startPos.y)
    });
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  const handleSendPrompt = () => {
    if (!chatMessage.trim()) return;
    if (!selectionBox || selectionBox.w === 0) {
      alert("Veuillez d'abord sélectionner une zone sur l'image à modifier.");
      return;
    }
    setChatHistory([...chatHistory, {role: 'user', text: chatMessage}, {role: 'ai', text: 'Modification en cours... (Ceci coûte 1 crédit)'}]);
    setChatMessage('');
    // Simulate generation
    setTimeout(() => {
      setChatHistory(prev => [...prev, {role: 'ai', text: 'Modification appliquée avec succès !'}]);
      setSelectionBox(null);
    }, 2000);
  };


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isCurrentStepValid && step < 12) {
        if (e.target instanceof HTMLTextAreaElement) return; // Ignore Enter in textarea
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCurrentStepValid, step]);

  // Generation step effect
  const [isGenerating, setIsGenerating] = useState(false);
  useEffect(() => {
    if (step === 11) {
      setIsGenerating(true);
      const timer = setTimeout(() => setIsGenerating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="speed-mode-wrapper" style={{paddingBottom: '80px'}}>
      <div className="bg-watermarks">
        <PlayCircle className="watermark w1" />
        <BarChart2 className="watermark w2" />
        <PenTool className="watermark w3" />
        <Layers className="watermark w4" />
        <Wand2 className="watermark w5" />
        <MousePointer2 className="watermark w6" />
      </div>

      <div className="speed-mode-window">
        {/* TOP NAVIGATION */}
        <nav className="speed-nav">
          <div className="nav-left">
            <div className="logo-icon-box">
              <Zap size={22} className="text-electric" strokeWidth={2.5} fill="#1677FF" />
            </div>
            <span className="logo-text text-electric" style={{lineHeight: 1, fontWeight: 800}}>AI CREATIVE STUDIO</span>
          </div>
          <div className="nav-right">
             <button className="liquid-btn small" style={{background: 'rgba(22, 119, 255, 0.1)', color: '#1677FF', border: '1px solid rgba(22, 119, 255, 0.3)'}} onClick={() => setShowBuyModal(true)}>
               ⚡ {credits} Crédit{credits !== 1 ? 's' : ''}
             </button>
          </div>
        </nav>

        <main className="speed-main full-screen-step" style={{paddingTop: 0, paddingBottom: '100px'}}>
          
          {/* PROGRESS BAR */}
          {step < 11 && (
            <div className="questionnaire-progress fade-in" style={{marginTop: '2rem'}}>
              <div className="progress-text text-electric">
                ÉTAPE {step} SUR 10
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${(step / 10) * 100}%` }}></div>
              </div>
            </div>
          )}

          {/* RENDERS */}
          <div className="fade-in w-full max-w-4xl" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="step-question text-main">Quel format souhaitez-vous créer ?</h2>
                <p className="step-desc">Choisissez la destination de votre miniature.</p>
                <div className="glass-grid">
                  {formatsList.map(f => (
                    <div key={f.id} className={`liquid-card interactive ${selectedFormat === f.id ? 'selected' : ''}`} onClick={() => setSelectedFormat(f.id)}>
                      <div className="card-icon">{f.icon}</div>
                      <h3>{f.name}</h3>
                      <p style={{color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem'}}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div style={{width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 className="step-question text-main">Quel est le titre de la vidéo ?</h2>
                <p className="step-desc">L'IA s'en servira pour créer une synergie visuelle parfaite.</p>
                <input type="text" className="liquid-input" placeholder="Ex: J'ai survécu 24h..." value={videoTitle === 'auto' ? '' : videoTitle} onChange={(e) => setVideoTitle(e.target.value)} autoFocus />
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div style={{width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 className="step-question text-main">De quoi parle la vidéo ?</h2>
                <p className="step-desc">Décrivez brièvement le sujet pour inspirer l'IA.</p>
                <textarea className="liquid-input" style={{minHeight: '150px', borderRadius: '24px', resize: 'none'}} placeholder="Ex: Je montre les meilleures astuces pour..." value={videoDesc === 'auto' ? '' : videoDesc} onChange={(e) => setVideoDesc(e.target.value)} autoFocus />
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <>
                <h2 className="step-question text-main">Quelle est votre audience cible ?</h2>
                <p className="step-desc">L'IA s'adaptera aux codes visuels de votre niche.</p>
                <div className="glass-grid">
                  {niches.map(n => (
                    <div key={n.id} className={`liquid-card interactive ${selectedNiche === n.id ? 'selected' : ''}`} onClick={() => setSelectedNiche(n.id)}>
                      <div className="card-icon">{n.icon}</div>
                      <h3>{n.label}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div style={{width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 className="step-question text-main">Y a-t-il un élément obligatoire ?</h2>
                <p className="step-desc">Exemple: Un visage surpris, un logo spécifique, une flèche rouge...</p>
                <input type="text" className="liquid-input" placeholder="Ex: Ajouter une grande flèche rouge..." value={mandatoryElements === 'auto' ? '' : mandatoryElements} onChange={(e) => setMandatoryElements(e.target.value)} autoFocus />
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <>
                <h2 className="step-question text-main">Quelle émotion transmettre ?</h2>
                <p className="step-desc">Le moteur visuel va générer des couleurs et expressions adaptées.</p>
                <div className="glass-grid">
                  {emotions.map(e => (
                    <div key={e.id} className={`liquid-card interactive ${selectedEmotion === e.id ? 'selected' : ''}`} onClick={() => setSelectedEmotion(e.id)}>
                      <div className="card-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>{e.icon}</div>
                      <h3>{e.label}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 7 */}
            {step === 7 && (
              <>
                <h2 className="step-question text-main">Quel est le thème visuel ?</h2>
                <p className="step-desc">Choisissez l'univers artistique de votre miniature.</p>
                <div className="glass-grid">
                  {themes.map(t => (
                    <div key={t.id} className={`liquid-card interactive ${selectedTheme === t.id ? 'selected' : ''}`} onClick={() => setSelectedTheme(t.id)}>
                      <div className="card-icon">{t.icon}</div>
                      <h3>{t.label}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 8 */}
            {step === 8 && (
              <>
                <h2 className="step-question text-main">Quelle ambiance lumineuse ?</h2>
                <p className="step-desc">Définissez l'éclairage de votre concept.</p>
                <div className="glass-grid">
                  {lightings.map(l => (
                    <div key={l.id} className={`liquid-card interactive ${selectedLighting === l.id ? 'selected' : ''}`} onClick={() => setSelectedLighting(l.id)}>
                      <div className="card-icon">{l.icon}</div>
                      <h3>{l.label}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 9 */}
            {step === 9 && (
              <>
                <h2 className="step-question text-main">Quelles couleurs dominantes ?</h2>
                <p className="step-desc">Ajustez la colorimétrie pour impacter votre audience.</p>
                <div className="glass-grid">
                  {colors.map(c => (
                    <div key={c.id} className={`liquid-card interactive ${selectedColors === c.id ? 'selected' : ''}`} onClick={() => setSelectedColors(c.id)}>
                      <div className="card-icon">{c.icon}</div>
                      <h3>{c.label}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 10 */}
            {step === 10 && (
              <>
                <h2 className="step-question text-main">Style Visuel (Finition)</h2>
                <p className="step-desc">Sélectionnez la touche finale de votre miniature.</p>
                <div className="glass-grid">
                  {styles.map(s => (
                    <div key={s.id} className={`liquid-card interactive ${activeStyle === s.id ? 'selected' : ''}`} onClick={() => setActiveStyle(s.id)}>
                      <div className="card-icon">{s.icon}</div>
                      <h3>{s.label}</h3>
                    </div>
                  ))}
                </div>
              </>
            )}
            

            {/* STEP 12 : Inpainting Studio */}
            {step === 12 && (
              <div className="fade-in w-full max-w-7xl responsive-step12-container">
                {/* Left side: Canvas / Image */}
                <div className="pricing-glass-card" style={{flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', position: 'relative'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                    <h3 className="pro-title" style={{fontSize: '1.2rem', margin: 0}}><MousePointer size={18}/> Zone de dessin (Bounding Box)</h3>
                    <button className="liquid-btn secondary small" onClick={() => setSelectionBox(null)} style={{padding: '0.4rem 1rem'}}><Eraser size={14}/> Effacer sélection</button>
                  </div>
                  
                  <div 
                    style={{
                      flex: 1, 
                      background: 'url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800) center/cover no-repeat', 
                      borderRadius: '12px', 
                      position: 'relative',
                      cursor: 'crosshair',
                      overflow: 'hidden'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {/* The bounding box */}
                    {selectionBox && (
                      <div style={{
                        position: 'absolute',
                        left: selectionBox.x,
                        top: selectionBox.y,
                        width: selectionBox.w,
                        height: selectionBox.h,
                        border: '2px solid #167DFF',
                        backgroundColor: 'rgba(22, 125, 255, 0.2)',
                        boxShadow: '0 0 15px rgba(22, 125, 255, 0.5)',
                        pointerEvents: 'none',
                        transition: isDrawing ? 'none' : 'all 0.2s ease'
                      }} />
                    )}
                  </div>
                  <div style={{marginTop: '1rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem'}}>
                     {/* History Gallery */}
                     {[1, 2, 3].map(v => (
                       <div key={v} style={{width: '80px', height: '45px', borderRadius: '8px', background: '#e2e8f0', flexShrink: 0, border: v === 1 ? '2px solid #167DFF' : 'none', overflow: 'hidden'}}>
                         <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=150" alt="V" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                       </div>
                     ))}
                  </div>
                </div>

                {/* Right side: Assistant IA */}
                <div className="pricing-glass-card" style={{width: '350px', display: 'flex', flexDirection: 'column', padding: '1.5rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                    <div style={{background: 'linear-gradient(135deg, #167DFF, #00F0FF)', padding: '0.5rem', borderRadius: '12px'}}>
                      <Sparkles size={20} color="white" />
                    </div>
                    <div>
                      <h3 className="pro-title" style={{fontSize: '1.1rem', margin: 0}}>Assistant IA</h3>
                      <span style={{fontSize: '0.8rem', color: '#64748b'}}>Modifications par Inpainting</span>
                    </div>
                  </div>

                  <div style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1rem'}}>
                    {chatHistory.map((msg, i) => (
                      <div key={i} style={{
                        alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                        background: msg.role === 'ai' ? 'rgba(22,125,255,0.05)' : '#167DFF',
                        color: msg.role === 'ai' ? '#0F172A' : '#fff',
                        padding: '0.8rem 1rem',
                        borderRadius: '12px',
                        borderBottomLeftRadius: msg.role === 'ai' ? 0 : '12px',
                        borderBottomRightRadius: msg.role === 'user' ? 0 : '12px',
                        maxWidth: '85%',
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                      }}>
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <div style={{marginTop: 'auto', position: 'relative'}}>
                    <textarea 
                      placeholder="Ex: Change le t-shirt en rouge..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendPrompt();
                        }
                      }}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(22,125,255,0.2)',
                        borderRadius: '12px',
                        padding: '1rem 3rem 1rem 1rem',
                        fontSize: '0.9rem',
                        resize: 'none',
                        outline: 'none',
                        height: '100px'
                      }}
                    />
                    <button 
                      onClick={handleSendPrompt}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        bottom: '15px',
                        background: '#167DFF',
                        border: 'none',
                        borderRadius: '8px',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <Send size={16} />
                    </button>
                    <div style={{textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem'}}>
                      Coût: <span style={{color: '#167DFF', fontWeight: 'bold'}}>⚡ 1 Crédit</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 11 */}
            {step === 11 && (
              <div className="fade-in w-full max-w-6xl" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {isGenerating ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                    <div className="ai-context-icon" style={{ animation: 'floatHero 2s infinite ease-in-out', marginBottom: '2rem', padding: '2rem', background: 'rgba(22,119,255,0.1)', borderRadius: '50%' }}>
                      <Sparkles size={64} fill="#1677FF" color="#1677FF" />
                    </div>
                    <h2 className="step-question text-main" style={{marginBottom: '1rem'}}>Création en cours...</h2>
                    <p className="step-desc">Analyse de vos 10 critères et génération des concepts.</p>
                  </div>
                ) : (
                  <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h2 className="step-question text-main" style={{marginBottom: '3rem'}}>Choisissez votre concept</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', maxWidth: '800px' }}>
                      {[1, 2].map((concept) => {
                        const isPortrait = selectedFormat === 'short';
                        const isSquare = selectedFormat === 'podcast';
                        const ratio = isPortrait ? '9/16' : isSquare ? '1/1' : '16/9';
                        
                        return (
                          <div key={concept} className={`liquid-card interactive ${selectedConcept === concept ? 'selected' : ''}`} onClick={() => setSelectedConcept(concept)} style={{padding: '1rem'}}>
                            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: ratio, background: '#e2e8f0', marginBottom: '1.5rem', position: 'relative' }}>
                               <img src={isPortrait ? "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=400" : isSquare ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" : "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600"} alt={`Concept ${concept}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                               {selectedConcept === concept && (
                                 <div style={{position: 'absolute', top: '1rem', right: '1rem', background: '#fff', borderRadius: '50%', padding: '0.2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
                                   <CheckCircle2 size={24} color="#1677FF" fill="rgba(22,119,255,0.1)" />
                                 </div>
                               )}
                            </div>
                            <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>Concept {concept}</h3>
                            <p style={{color: 'var(--text-sec)'}}>Taux de clic estimé: {92 - concept * 4}%</p>
                            
                            {selectedConcept === concept && (
                              <button className="liquid-btn small" onClick={() => setStep(12)} style={{width: "100%", marginTop: "1.5rem"}}>
                                Ouvrir l'éditeur <ArrowRight size={16} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* FIXED BOTTOM ACTION BAR */}
        {step < 11 && (
          <div style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            padding: '1rem',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(22,119,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 9999,
            boxShadow: '0 -10px 30px rgba(0,0,0,0.02)'
          }}>
            <button className="liquid-btn small secondary" onClick={handlePrev} style={{padding: '0.8rem 1.5rem'}}>
              <ArrowLeft size={16} /> Retour
            </button>
            
            <div style={{display: 'flex', gap: '1rem'}}>
              {step > 1 && (
                <button className="liquid-btn small secondary" style={{color: '#167DFF', background: 'rgba(22,125,255,0.05)', border: '1px solid rgba(22,125,255,0.2)'}} onClick={handleAiDecide}>
                  <Sparkles size={16} /> <span className='hide-mobile'>Laissez l'IA décider</span>
                </button>
              )}
              <button className="liquid-btn small" onClick={handleNext} disabled={!isCurrentStepValid} style={{padding: '0.8rem 2rem'}}>
                {step === 10 ? "Générer les concepts (1 crédit)" : "Continuer"} <ArrowRight size={16} />
                {isCurrentStepValid && <div className="shimmer"></div>}
              </button>
            </div>
          </div>
        )}

      </div>
    <BuyCreditsModal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)} reason={credits <= 0 ? 'no-credits' : 'buy'} />
  </div>
  );
};
export default ProMode;
