
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import BottomNav from '../components/BottomNav';
import { DONOR_NAV_ITEMS } from './DonorDashboard';
import { FoodItem, FoodStatus } from '../types';

interface ImpactDashboardProps {
  items: FoodItem[];
}

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ items }) => {
  const navigate = useNavigate();

  // Calculate dynamic stats
  const deliveredItems = items.filter(i => i.status === FoodStatus.DELIVERED);
  const totalKg = deliveredItems.reduce((acc, curr) => acc + (parseFloat(curr.quantity) || 5), 0) + 128; // Added to baseline
  const totalPeople = deliveredItems.length * 15 + 450;
  const co2Saved = (totalKg * 0.42).toFixed(1);

  const chartData = [
    { name: 'Mon', kg: 12 },
    { name: 'Tue', kg: 19 },
    { name: 'Wed', kg: 15 },
    { name: 'Thu', kg: 22 },
    { name: 'Fri', kg: 30 },
    { name: 'Sat', kg: 25 },
    { name: 'Sun', kg: deliveredItems.length > 0 ? 35 + deliveredItems.length * 5 : 35 },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-8 bg-emerald-600 text-white rounded-b-[40px] shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full backdrop-blur-md">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 className="text-xl font-bold">Your Impact Journey</h1>
        </div>

        <div className="bg-white/10 p-7 rounded-[32px] backdrop-blur-xl border border-white/20 shadow-inner">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Total CO2 Reduction</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-6xl font-black">{co2Saved}</h2>
            <span className="text-xl font-bold mb-2 opacity-80">kg</span>
          </div>
          <div className="mt-6 flex items-center space-x-3 bg-white/10 p-3 rounded-2xl">
             <div className="bg-white/20 p-2 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0-10-10H2a10 10 0 0 0 10 10Z"/><path d="M12 2v4"/><circle cx="12" cy="12" r="3"/></svg>
             </div>
             <p className="text-[11px] font-medium leading-tight">You've saved the equivalent of <span className="text-emerald-300 font-bold">8 mature trees</span> this year!</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mb-10 animate-in">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Donation Trends</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">This Week</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 'bold'}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="kg" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#059669' : '#10b981'} opacity={index === 6 ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10 animate-in">
          <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-50">
             <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
             </div>
             <p className="text-3xl font-black text-blue-900 leading-none">{totalPeople}</p>
             <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider mt-2">People Fed</p>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-[32px] border border-emerald-50">
             <div className="bg-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
             </div>
             <p className="text-3xl font-black text-emerald-900 leading-none">{totalKg}kg</p>
             <p className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider mt-2">Food Saved</p>
          </div>
        </div>

        <button className="w-full bg-slate-900 text-white py-4.5 rounded-[20px] font-bold flex items-center justify-center space-x-3 shadow-xl active:scale-95 transition-all mb-12">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
           <span>Broadcast Results</span>
        </button>
      </div>

      <BottomNav items={DONOR_NAV_ITEMS} />
    </div>
  );
};

export default ImpactDashboard;
