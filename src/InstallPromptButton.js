import React, { useEffect, useState } from 'react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt  = (e) => {
      
      console.log("beforeinstallprompt fired"); 
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
      //buttonRef.current.style.display = 'block';
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt );
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt );
  }, []);

  const handleInstall = async () => {
   // if (!deferredPrompt) return;
   if (!deferredPrompt) {
    alert("Install option is not available yet. Please wait or refresh.");
    return;
  }
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log("User response:", result.outcome);
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted install');
      } else {
        console.log('User dismissed install');
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  };

  //if (!showPrompt) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      background: 'white',
      border: '1px solid #ccc',
      padding: '16px',
      zIndex: 1000
    }}>
      <p>Install this app on your device?</p>
      <button onClick={handleInstall}>Install</button>
    </div>
  );
}
