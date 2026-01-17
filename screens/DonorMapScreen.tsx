
import React, { useState } from 'react';
import { FoodItem } from '../types';
import BottomNav from '../components/BottomNav';
import { DONOR_NAV_ITEMS } from './DonorDashboard';

interface DonorMapScreenProps {
  items: FoodItem[];
}

const DonorMapScreen: React.FC<DonorMapScreenProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-emerald-600 text-white flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold">Community Food Map</h1>
        <div className="bg-white/20 p-2 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-gray-200">
        {/* Mock Map Background */}
        <img 
          src="https://picsum.photos/seed/donormap/800/1200" 
          className="w-full h-full object-cover opacity-60 grayscale-[0.2]" 
          alt="Map"
        />
        
        {/* Pulsing User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>

        {/* Food Item Markers */}
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="absolute p-1 bg-white rounded-full shadow-xl border-2 border-emerald-500 transition-transform active:scale-90"
            style={{ 
              top: `${20 + idx * 25}%`, 
              left: `${30 + idx * 30}%` 
            }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
               <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
          </button>
        ))}

        {/* Selection Info Card */}
        {selectedItem && (
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-3xl p-5 shadow-2xl animate-slide-up border border-emerald-50">
             <button 
               onClick={() => setSelectedItem(null)}
               className="absolute top-4 right-4 text-gray-400"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
             </button>
             <div className="flex items-center space-x-4">
                <img src={selectedItem.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                <div className="flex-1">
                   <h4 className="font-bold text-gray-900">{selectedItem.name}</h4>
                   <p className="text-xs text-gray-500 mt-0.5">{selectedItem.quantity} • {selectedItem.donorName}</p>
                   <div className="flex items-center mt-2 text-emerald-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span className="text-[10px] font-bold">0.8 km away</span>
                   </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-3 mt-5">
                <button className="py-3 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-100">Details</button>
                <button className="py-3 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-100">Directions</button>
             </div>
          </div>
        )}
      </div>

      <BottomNav items={DONOR_NAV_ITEMS} />
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default DonorMapScreen;
