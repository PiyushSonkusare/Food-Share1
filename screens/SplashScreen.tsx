
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-full w-full bg-emerald-600 flex flex-col items-center justify-center text-white px-8 text-center animate-pulse">
      <div className="bg-white p-6 rounded-full mb-6 shadow-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">EcoFeast</h1>
      <p className="text-emerald-100 text-lg opacity-80">Connecting surplus to those in need.</p>
      <div className="mt-12 w-12 h-12 border-4 border-emerald-300 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default SplashScreen;
