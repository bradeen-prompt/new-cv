import React, { useState } from 'react';
import { 
  FolderOpen, Users, Settings, LogOut, 
  Zap, Crown, ArrowRight, User, 
  Plus, Search, Sparkles, LayoutDashboard, History, Edit2, Upload, Trash2, PlusCircle, ShoppingCart
} from 'lucide-react';
import './Dashboard.css';
import { useCredits } from '../contexts/CreditsContext';
import BuyCreditsModal from './BuyCreditsModal';

interface DashboardProps {
  onNavigate: (mode: 'quick-mode' | 'pro-mode') => void;
  onLogout: () => void;
}

type TabType = 'home' | 'projects' | 'profiles' | 'history' | 'settings' | 'profile' | 'buy-credits';

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const { credits } = useCredits();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [userName, setUserName] = useState('Nom Utilisateur');
  const [isEditingName, setIsEditingName] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?u=alex');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState([
    { id: 1, name: "Miniature VLOG Forêt", folder: "VLOGS 2026", date: "15 Septembre 2026, 14:30" },
    { id: 2, name: "Tuto React Thumbnail", folder: "Tutoriels Code", date: "14 Septembre 2026, 09:15" },
    { id: 3, name: "Cover Podcast Ep 12", folder: "Podcasts Audio", date: "10 Septembre 2026, 11:20" },
    { id: 4, name: "Setup Gaming 2026", folder: "Tech & Setup", date: "05 Septembre 2026, 16:10" }
  ]);

    const renderHome = () => (
    <div className="fade-in" style={{ animation: 'slideUpFade 0.5s ease forwards' }}>
      
      {/* HEADER SECTION */}
      <div className="dash-header responsive-dash-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            {isEditingName ? (
              <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                autoFocus
                style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', border: 'none', borderBottom: '2px solid #167DFF', background: 'transparent', outline: 'none', padding: 0, width: '250px' }}
              />
            ) : (
              <h1 
                onClick={() => setIsEditingName(true)}
                style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                title="Cliquer pour modifier"
              >
                Bonjour, {userName} <Edit2 size={16} color="#94a3b8" />
              </h1>
            )}
            
          </div>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Prêt à créer votre prochaine miniature virale ?</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="search-bar pricing-glass-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2rem 0.8rem', borderRadius: '30px', gap: '0.4rem', flexWrap: 'nowrap', width: 'fit-content' }}>
            <Search size={14} color="#64748b" style={{ flexShrink: 0 }} />
            <input type="text" placeholder="Rechercher..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100px', fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* BIG CREATE BUTTON CTA (Skinny) */}
      <div className="pricing-glass-card create-banner responsive-create-banner">
        <div className="responsive-banner-inner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#167DFF', fontWeight: 700, marginBottom: '0.8rem', background: 'rgba(22, 125, 255, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '20px', width: 'fit-content', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => setShowBuyModal(true)}>
              <Zap size={14} fill="currentColor" /> ⚡ {credits} CRÉDIT{credits !== 1 ? 'S' : ''}
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Nouvelle Création</h2>
          </div>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '450px', margin: 0, lineHeight: '1.5' }}>
            Démarrez un nouveau projet avec l'IA. Contrôle total sur vos miniatures.
          </p>
        </div>
        <div style={{ zIndex: 2 }}>
          <button 
            className="pro-cta-primary" 
            style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }} 
            onClick={() => onNavigate('pro-mode')}
          >
            <Plus size={16} /> Créer un nouveau projet
            <div className="cta-shimmer"></div>
          </button>
        </div>
        <div className="banner-art" style={{ position: 'absolute', right: '-10%', top: '-50%', opacity: 0.8, zIndex: 1 }}>
          <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80" alt="Creative" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', filter: 'blur(30px)', opacity: 0.3 }} />
        </div>
      </div>

      {/* RECENT PROJECTS */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>Mes projets récents</h3>
          <button onClick={() => setActiveTab('projects')} style={{ background: 'transparent', border: 'none', color: '#167DFF', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}>
            Voir tout <ArrowRight size={14} />
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.2rem' }}>
          {[
            { id: 1, name: 'VLOG - 24H EN FORÊT', date: 'Hier', format: 'Vidéo YouTube', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80' },
            { id: 2, name: 'TEST VOITURE', date: 'Il y a 3 jours', format: 'YouTube Short', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80' },
            { id: 3, name: 'PODCAST #12', date: 'La semaine dernière', format: 'Podcast Cover', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80' },
            { id: 4, name: 'TUTO REACT', date: 'Il y a 2 semaines', format: 'Vidéo YouTube', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80' }
          ].map((p, i) => (
            <div key={p.id} className="pricing-glass-card project-card-new" style={{ animation: `slideUpFade 0.5s ${0.2 + (i * 0.1)}s ease forwards`, opacity: 0 }}>
              <div className="project-thumb-container">
                <img src={p.img} alt={p.name} className="project-thumb-new" />
                
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ color: '#167DFF', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem', textTransform: 'uppercase' }}>{p.format}</div>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.95rem', color: '#0F172A', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Modifié {p.date.toLowerCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const renderProfile = () => (
    <div className="fade-in settings-container pricing-glass-card" style={{ padding: '3rem' }}>
      <div className="page-header" style={{ marginBottom: '3rem' }}>
        <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Mon Profil</h1>
        <p className="page-subtitle" style={{ color: '#64748b' }}>Gérez vos informations et connexions</p>
      </div>

      <div className="settings-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <img src={avatarUrl} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 10px 25px rgba(22,125,255,0.2)' }} />
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{userName}</h2>
            <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>utilisateur@exemple.com</p>
            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
              <button className="liquid-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={16} /> Modifier la photo
              </button>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                style={{ position: 'absolute', top: 0, left: 0, opacity: 0, cursor: 'pointer', height: '100%', width: '100%' }} 
              />
            </div>
          </div>
        </div>

        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group-new">
            <label>Nom d'affichage</label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="form-group-new">
            <label>Pseudo</label>
            <input type="text" defaultValue="@CreateurPro" />
          </div>
          <div className="form-group-new" style={{ gridColumn: 'span 2' }}>
            <label>Adresse e-mail</label>
            <input type="email" defaultValue="utilisateur@exemple.com" />
          </div>
          <div className="form-group-new" style={{ gridColumn: 'span 2' }}>
            <label>Nouveau mot de passe (si modification e-mail)</label>
            <input type="password" placeholder="Saisissez un mot de passe pour confirmer" />
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="pro-cta-primary" style={{ padding: '1rem 2rem' }}>Enregistrer les modifications</button>
        </div>
      </div>
    </div>
  );


  
  const renderProjects = () => (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Mes Projets</h1>
          <p className="page-subtitle" style={{ color: '#64748b' }}>Retrouvez toutes vos créations antérieures.</p>
        </div>
        <button className="pro-cta-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', fontSize: '0.95rem' }} onClick={() => onNavigate('pro-mode')}>
          <Plus size={16} /> Nouveau
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {[
          { id: 1, name: 'VLOG - 24H EN FORÊT', date: 'Aujourd\'hui', format: 'Vidéo YouTube', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80' },
          { id: 2, name: 'TEST VOITURE', date: 'Hier', format: 'YouTube Short', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80' },
          { id: 3, name: 'PODCAST #12', date: 'Il y a 3 jours', format: 'Podcast Cover', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80' },
          { id: 4, name: 'TUTO REACT', date: 'La semaine dernière', format: 'Vidéo YouTube', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80' },
          { id: 5, name: 'SETUP GAMING 2026', date: 'Le mois dernier', format: 'Vidéo YouTube', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80' },
          { id: 6, name: 'RECETTE FACILE', date: 'Le mois dernier', format: 'Instagram Post', img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=600&q=80' }
        ].map((p, i) => (
          <div key={p.id} onClick={() => onNavigate('pro-mode')} className="pricing-glass-card project-card-new" style={{ cursor: 'pointer', animation: `slideUpFade 0.4s ${0.1 * i}s ease forwards`, opacity: 0 }}>
            <div className="project-thumb-container">
              <img src={p.img} alt={p.name} className="project-thumb-new" />
              
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ color: '#167DFF', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem', textTransform: 'uppercase' }}>{p.format}</div>
              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.95rem', color: '#0F172A', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Modifié {p.date.toLowerCase()}</span>
                <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }} onClick={(e) => e.stopPropagation()}><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Historique des créations</h1>
        <p className="page-subtitle" style={{ color: '#64748b' }}>Retrouvez toutes vos miniatures et dossiers récents.</p>
      </div>

      <div className="pricing-glass-card" style={{ padding: '1rem 2rem', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(22,125,255,0.2)', color: '#64748b', fontSize: '0.85rem' }}>
              <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Nom de la miniature</th>
              <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Dossier</th>
              <th style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>Date Exacte</th>
              <th style={{ padding: '1rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Gérer</th>
            </tr>
          </thead>
          <tbody>
            {historyItems.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(22,125,255,0.05)' }}>
                <td style={{ padding: '1rem 0.5rem', color: '#0F172A', fontWeight: 700, fontSize: '0.95rem' }}>{item.name}</td>
                <td style={{ padding: '1rem 0.5rem', color: '#475569', fontSize: '0.9rem' }}><span style={{background:'rgba(22,125,255,0.1)', color:'#167DFF', padding:'0.2rem 0.6rem', borderRadius:'6px'}}>{item.folder}</span></td>
                <td style={{ padding: '1rem 0.5rem', color: '#475569', fontSize: '0.9rem' }}>{item.date}</td>
                <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                  <button onClick={() => setHistoryItems(historyItems.filter(i => i.id !== item.id))} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', borderRadius: '8px', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {historyItems.length === 0 && (
              <tr><td colSpan={4} style={{textAlign:'center', padding:'2rem', color:'#64748b'}}>Aucun historique</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProfiles = () => (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Mes Profils IA</h1>
          <p className="page-subtitle" style={{ color: '#64748b' }}>Modèles de visages et styles pour l'API de génération.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        
        {/* ADD NEW PROFILE CARD */}
        <div className="pricing-glass-card" onClick={() => setIsProfileModalOpen(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', border: '2px dashed rgba(22,125,255,0.3)', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: 'rgba(255,255,255,0.3)', minHeight: '220px' }}
             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(22,125,255,0.05)'}
             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}>
          <div style={{ background: 'rgba(22,125,255,0.1)', padding: '0.8rem', borderRadius: '50%', color: '#167DFF', marginBottom: '0.8rem' }}>
            <PlusCircle size={24} />
          </div>
          <h4 style={{ color: '#0F172A', fontWeight: 700, margin: '0 0 0.3rem 0', fontSize: '1rem' }}>Scanner votre visage</h4>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Importez 4 angles.</p>
        </div>

        {/* PROFILE 1: VISAGE (4 Images Mini Grid) */}
        <div className="pricing-glass-card project-card-new">
          <div className="project-thumb-container" style={{ aspectRatio: '1/1', padding: '0.4rem', background: '#f8fafc' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem', height: '100%' }}>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" alt="Face" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Profile L" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Profile R" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" alt="Back" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
            </div>
          </div>
          <div style={{ padding: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#167DFF', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.1rem', textTransform: 'uppercase' }}>Visage 3D</div>
              <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#0F172A', fontWeight: 700 }}>Alex V1</h4>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14}/></button>
          </div>
        </div>

        {/* PROFILE 2: STYLE (Looping Video) */}
        <div className="pricing-glass-card project-card-new">
          <div className="project-thumb-container" style={{ aspectRatio: '1/1', background: 'black' }}>
            <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-humanoid-head-32439-large.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{ padding: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#8b5cf6', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.1rem', textTransform: 'uppercase' }}>Animation</div>
              <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#0F172A', fontWeight: 700 }}>Neon Tech</h4>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14}/></button>
          </div>
        </div>

      </div>

      {/* MODAL NEW PROFILE */}
      {isProfileModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="pricing-glass-card" style={{ background: 'rgba(255,255,255,0.9)', width: '90%', maxWidth: '600px', padding: '2rem', borderRadius: '24px', position: 'relative' }}>
            <button onClick={() => setIsProfileModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 800, color: '#64748b' }}>X</button>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Scanner votre visage</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Importez 4 angles de votre visage pour un clone 3D parfait.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ border: '2px dashed #cbd5e1', padding: '1rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', background: 'rgba(241, 245, 249, 0.5)' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(22,125,255,0.05)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(241, 245, 249, 0.5)'}>
                <Upload size={20} color="#94a3b8" style={{ marginBottom: '0.5rem' }}/>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>1. Face</div>
              </div>
              <div style={{ border: '2px dashed #cbd5e1', padding: '1rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', background: 'rgba(241, 245, 249, 0.5)' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(22,125,255,0.05)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(241, 245, 249, 0.5)'}>
                <Upload size={20} color="#94a3b8" style={{ marginBottom: '0.5rem' }}/>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>2. Profil Gauche</div>
              </div>
              <div style={{ border: '2px dashed #cbd5e1', padding: '1rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', background: 'rgba(241, 245, 249, 0.5)' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(22,125,255,0.05)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(241, 245, 249, 0.5)'}>
                <Upload size={20} color="#94a3b8" style={{ marginBottom: '0.5rem' }}/>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>3. Profil Droit</div>
              </div>
              <div style={{ border: '2px dashed #cbd5e1', padding: '1rem', textAlign: 'center', borderRadius: '12px', cursor: 'pointer', background: 'rgba(241, 245, 249, 0.5)' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(22,125,255,0.05)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(241, 245, 249, 0.5)'}>
                <Upload size={20} color="#94a3b8" style={{ marginBottom: '0.5rem' }}/>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>4. Arrière</div>
              </div>
            </div>

            <button className="pro-cta-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', display:'flex', justifyContent:'center', alignItems:'center', gap:'0.5rem' }} onClick={() => setIsProfileModalOpen(false)}>
              <Sparkles size={18}/> Démarrer le Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="fade-in settings-container pricing-glass-card" style={{ padding: '3rem' }}>
      <div className="page-header" style={{ marginBottom: '3rem' }}>
        <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Paramètres</h1>
        <p className="page-subtitle" style={{ color: '#64748b' }}>Gérez votre compte et votre abonnement.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="settings-section">
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} color="#167DFF" /> Mon Compte
          </h3>
          <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(22,125,255,0.1)' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Adresse E-mail connectée</label>
              <div style={{ fontSize: '1rem', color: '#0F172A', fontWeight: 500, marginTop: '0.3rem' }}>createur@exemple.com</div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Crown size={20} color="#167DFF" /> Abonnement
          </h3>
          <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(22,125,255,0.1)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: 0, color: '#0F172A', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Plan Actuel : <span style={{ color: '#167DFF' }}>Studio Pro</span></h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>Dernier renouvellement :</span>
                  <span style={{ color: '#0F172A', fontWeight: 600 }}>12 Septembre 2026</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>Prochain paiement :</span>
                  <span style={{ color: '#0F172A', fontWeight: 600 }}>12 Octobre 2026</span>
                </div>
              </div>
            </div>
            <button className="pro-cta-primary" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', fontSize: '0.95rem' }}>Gérer mon abonnement</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout-new">
      {/* SIDEBAR */}
      <aside className="sidebar-new pricing-glass-card" style={{ background: 'linear-gradient(180deg, rgba(22, 125, 255, 0.08) 0%, rgba(255, 255, 255, 0.4) 100%)', padding: '2rem 1rem' }}>
        <div className="sidebar-brand-new" style={{ marginBottom: '2.5rem', padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#0F172A', fontWeight: 800, fontSize: '1.1rem' }}>
            <div className="brand-icon-new" style={{ background: 'linear-gradient(135deg, #167DFF, #0052CC)', padding: '0.4rem', borderRadius: '10px', color: 'white', display: 'flex', boxShadow: '0 8px 20px rgba(22,125,255,0.3)' }}>
              <Zap size={20} fill="currentColor" />
            </div>
            ThumbAI <span style={{ color: '#167DFF' }}>Pro</span>
          </div>
        </div>

        <div className="nav-group-new" style={{ flex: 1 }}>
          <div className="nav-label" style={{ paddingLeft: '0.5rem', fontSize: '0.7rem' }}>Menu Principal</div>
          <button className={`nav-item-new ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <LayoutDashboard size={18} /> Accueil
          </button>
          <button className={`nav-item-new ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <FolderOpen size={18} /> Mes Projets
          </button>
          <button className={`nav-item-new ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <History size={18} /> Historique
          </button>
          <button className={`nav-item-new ${activeTab === 'profiles' ? 'active' : ''}`} onClick={() => setActiveTab('profiles')} title="Enregistrez vos visages et styles récurrents">
            <Users size={18} /> Mes Profils IA
          </button>
          <button className={`nav-item-new ${activeTab === 'buy-credits' ? 'active' : ''}`} onClick={() => setActiveTab('buy-credits')} style={credits <= 0 ? { color: '#f59e0b' } : {}}>
            <ShoppingCart size={18} /> Crédits ({credits})
          </button>

          <div className="nav-label" style={{ marginTop: '2rem', paddingLeft: '0.5rem', fontSize: '0.7rem' }}>Préférences</div>
          <button className={`nav-item-new ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={18} /> Mon Profil
          </button>
          <button className={`nav-item-new ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={18} /> Paramètres
          </button>
        </div>

        <div className="sidebar-footer-new" style={{ borderTop: '1px solid rgba(22,125,255,0.1)', paddingTop: '1.2rem', marginTop: '2rem', paddingLeft: '0.5rem' }}>
          <button className="nav-item-new logout" onClick={onLogout} style={{ color: '#ef4444', padding: '0.8rem 0' }}>
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main-new">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'profiles' && renderProfiles()}
          {activeTab === 'buy-credits' && (
            <div className="fade-in">
              <div className="page-header" style={{ marginBottom: '2rem' }}>
                <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Acheter des crédits</h1>
                <p className="page-subtitle" style={{ color: '#64748b' }}>
                  Solde actuel : <strong style={{ color: '#167DFF' }}>{credits} crédit{credits !== 1 ? 's' : ''}</strong>. Rechargez pour continuer à créer.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {([
                  { id: 'decouverte', name: 'Pack Découverte', credits: 100, priceXOF: 6500, priceEUR: 9.99, popular: false },
                  { id: 'pro', name: 'Pack Pro', credits: 500, priceXOF: 19500, priceEUR: 29.99, popular: true },
                  { id: 'studio', name: 'Pack Studio', credits: 1000, priceXOF: 32500, priceEUR: 49.99, popular: false },
                ]).map((pack, i) => (
                  <div key={pack.id} className="pricing-glass-card" style={{ padding: '2rem', position: 'relative', border: pack.popular ? '2px solid #167DFF' : undefined, animation: `slideUpFade 0.4s ${0.1 * i}s ease forwards`, opacity: 0 }}>
                    {pack.popular && (
                      <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #167DFF, #00F0FF)', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, boxShadow: '0 6px 16px rgba(22,125,255,0.3)', whiteSpace: 'nowrap' }}>
                        <Sparkles size={10} /> POPULAIRE
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>{pack.name}</h3>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(22,125,255,0.1)', color: '#167DFF', padding: '0.3rem 0.8rem', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
                      <Zap size={14} fill="currentColor" /> {pack.credits} Crédits
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A' }}>{pack.priceXOF.toLocaleString('fr-FR')}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>XOF</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1.5rem' }}>≈ {pack.priceEUR}€</div>
                    <button className="pro-cta-primary" style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', fontSize: '0.95rem' }} onClick={() => setShowBuyModal(true)}>
                      Acheter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>

      <BuyCreditsModal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)} reason="buy" />
    </div>
  );
};

export default Dashboard;