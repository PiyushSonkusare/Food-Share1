
import React from 'react';

interface NotificationOverlayProps {
  title: string;
  body: string;
  onClose: () => void;
}

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ title, body, onClose }) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-[9999] animate-notification-slide">
      <div 
        onClick={onClose}
        className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-start space-x-3 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="bg-blue-600 p-2 rounded-lg text-white shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">EcoFeast • Now</span>
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          </div>
          <h4 className="text-white font-bold text-sm leading-tight">{title}</h4>
          <p className="text-gray-300 text-xs mt-1 leading-snug">{body}</p>
        </div>
      </div>
      
      <style>{`
        @keyframes notification-slide {
          0% { transform: translateY(-120%); opacity: 0; }
          15% { transform: translateY(0); opacity: 1; }
          85% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-120%); opacity: 0; }
        }
        .animate-notification-slide {
          animation: notification-slide 5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default NotificationOverlay;
