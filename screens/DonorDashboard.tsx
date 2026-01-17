import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodItem } from '../types';
import BottomNav from '../components/BottomNav';

interface DonorDashboardProps {
  items: FoodItem[];
}

export const DONOR_NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'donate', label: 'Donate', path: '/donate', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg> },
  { id: 'impact', label: 'Impact', path: '/impact', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6"/><path d="M6 20V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><rect width="6" height="8" x="16" y="12" rx="2"/></svg> },
  { id: 'profile', label: 'Profile', path: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

const DonorDashboard: React.FC<DonorDashboardProps> = ({ items }) => {
  const navigate = useNavigate();
  const [isStartingDonate, setIsStartingDonate] = useState(false);

  const handleStartDonate = () => {
    setIsStartingDonate(true);
    setTimeout(() => {
      navigate('/donate');
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 bg-emerald-600 text-white rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-sm font-medium opacity-80 uppercase tracking-widest">Welcome back,</h2>
            <p className="text-2xl font-bold">The Green Cafe 👋</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <p className="text-[10px] font-bold uppercase opacity-80">Food Donated</p>
            <p className="text-xl font-bold">128<span className="text-xs ml-0.5">kg</span></p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <p className="text-[10px] font-bold uppercase opacity-80">People Fed</p>
            <p className="text-xl font-bold">450</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <p className="text-[10px] font-bold uppercase opacity-80">CO2 Saved</p>
            <p className="text-xl font-bold">54<span className="text-xs ml-0.5">kg</span></p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <button 
          onClick={handleStartDonate}
          disabled={isStartingDonate}
          className={`w-full ${isStartingDonate ? 'bg-emerald-800' : 'bg-emerald-600 hover:bg-emerald-700'} text-white py-4 rounded-2xl font-bold text-lg mb-8 shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-80`}
        >
          {isStartingDonate ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              <span>Donate Food Now</span>
            </>
          )}
        </button>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Donations</h3>
          <button className="text-emerald-600 text-sm font-medium">View All</button>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">{item.status}</span>
                  <span className="mx-2">•</span>
                  <span>{item.quantity}</span>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>

      <BottomNav items={DONOR_NAV_ITEMS} />
    </div>
  );
};

export default DonorDashboard;