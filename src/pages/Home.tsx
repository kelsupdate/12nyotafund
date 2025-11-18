import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [installBtnVisible, setInstallBtnVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallModal(true);
      setInstallBtnVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('✅ PWA install accepted');
      } else {
        console.log('❌ PWA install dismissed');
      }
      setDeferredPrompt(null);
      setShowInstallModal(false);
    }
  };

  const closeModal = () => {
    setShowInstallModal(false);
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-red-50 min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 fade-in">
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-xl">
          <img
            src="/nyotafund.png"
            alt="NYOTA FUND Logo"
            className="w-28 h-28 mx-auto mb-6 rounded-full shadow-lg border border-gray-200"
          />

          <h1 className="text-5xl font-bold text-green-700 mb-4 tracking-wide">
            OKASH LOANS
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            The program provides financial support to kickstart business ventures.
            This can include grants, loans, or equity investments, depending on the nature
            of the business and its potential for growth.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="inline-block bg-green-600 hover:bg-red-500 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl"
          >
            Next →
          </button>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-700">OKASH LOANS</span>. All rights reserved.
      </footer>

      {showInstallModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-center max-w-sm w-[90%] fade-in">
            <img
              src="/nyotafund.png"
              alt="NYOTA FUND Logo"
              className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md border border-green-100"
            />

            <h3 className="text-2xl font-bold text-green-700 mb-2 tracking-wide">
              Install OKASH LOANS
            </h3>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Add OKASH LOANS to your home screen for easy access and offline use.
            </p>

            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              className="h-12 mx-auto cursor-pointer mb-4"
            />

            {installBtnVisible && (
              <button
                onClick={handleInstallClick}
                className="bg-gradient-to-r from-green-600 to-red-500 hover:from-red-500 hover:to-green-600 transition-all text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-2xl mx-auto flex items-center justify-center gap-2 mb-4"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  alt="Install Icon"
                  className="w-6 h-6"
                />
                Install App
              </button>
            )}

            <div>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all text-sm font-medium"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
