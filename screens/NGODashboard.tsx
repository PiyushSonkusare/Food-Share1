import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodItem, FoodStatus } from '../types';
import BottomNav from '../components/BottomNav';

interface NGODashboardProps {
  items: FoodItem[];
  onUpdateStatus: (id: string, status: FoodStatus) => void;
}

const NGODashboard: React.FC<NGODashboardProps> = ({ items }) => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const activePickups = items.filter(i => 
    i.status === FoodStatus.ACCEPTED || 
    i.status === FoodStatus.ON_THE_WAY || 
    i.status === FoodStatus.PICKED_UP
  );

  const availableItems = items.filter(i => 
    i.status === FoodStatus.AVAILABLE || 
    i.status === FoodStatus.NOTIFIED
  );

  const navItems = [
    { id: 'requests', label: 'Requests', path: '/dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg> },
    { id: 'history', label: 'History', path: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg> },
    { id: 'impact', label: 'Impact', path: '/impact', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg> },
    { id: 'profile', label: 'Profile', path: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-6 bg-blue-600 text-white flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-xl font-bold">NGO Connect</h1>
          <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Global Food Security</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">{isOnline ? 'Online' : 'Offline'}</span>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-10 h-5 rounded-full transition-colors relative flex items-center px-1 ${isOnline ? 'bg-emerald-400' : 'bg-slate-400'}`}
          >
            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${isOnline ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {activePickups.length > 0 && (
          <div className="animate-in">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Active Pickups</h3>
            {activePickups.map(item => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/pickup/${item.id}`)}
                className="bg-white border-2 border-blue-100 p-4 rounded-2xl flex items-center space-x-4 shadow-sm active:scale-95 transition-transform"
              >
                <div className="relative">
                  <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-[10px] text-blue-600 font-bold uppercase">{item.status}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Nearby Surplus</h3>
        {availableItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-8 text-center animate-in">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </div>
            <h4 className="font-bold text-gray-800">No new requests</h4>
            <p className="text-xs text-gray-500 mt-1">We'll notify you as soon as a donor lists surplus food.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-blue-600 shadow-sm"
            >
              Refresh Feed
            </button>
          </div>
        ) : (
          availableItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/request/${item.id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 active:scale-98 transition-transform animate-in"
            >
              <div className="relative h-40">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-bold text-gray-800 uppercase">AI Verified</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h4>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{item.quantity}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">GC</div>
                    <span className="text-xs font-bold text-gray-700">{item.donorName}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Listed Recently</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav items={navItems} />
    </div>
  );
};

export default NGODashboard;