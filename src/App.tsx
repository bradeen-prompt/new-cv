import { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import ProMode from './components/ProMode';
import Dashboard from './components/Dashboard';
import CheckoutReturn from './components/CheckoutReturn';
import { CreditsProvider } from './contexts/CreditsContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'pro-mode' | 'dashboard' | 'checkout-return'>('landing');

  // Check if returning from Moneroo checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'return') {
      setCurrentPage('checkout-return');
    }
  }, []);

  return (
    <CreditsProvider>
      <div className="app-container">
        {currentPage === 'landing' && <LandingPage onConnect={() => setCurrentPage('dashboard')} />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={(mode) => setCurrentPage(mode as any)} onLogout={() => setCurrentPage('landing')} />}
        {currentPage === 'pro-mode' && <ProMode onBackToHome={() => setCurrentPage('dashboard')} />}
        {currentPage === 'checkout-return' && <CheckoutReturn onContinue={() => setCurrentPage('dashboard')} />}
      </div>
    </CreditsProvider>
  );
}

export default App;
