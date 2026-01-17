import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FoodItem, FoodStatus } from '../types';
import { updateFoodStatusInCloud } from '../services/firebaseService';

interface PickupTrackingProps {
  items: FoodItem[];
  onUpdateStatus: (id: string, status: FoodStatus) => void;
}

const PickupTracking: React.FC<PickupTrackingProps> = ({ items, onUpdateStatus }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = items.find(i => i.id === id);
  const [currentStatus, setCurrentStatus] = useState<FoodStatus>(item?.status || FoodStatus.ACCEPTED);
  const [isSyncing, setIsSyncing] = useState(false);

  const statuses = [
    FoodStatus.ACCEPTED,
    FoodStatus.ON_THE_WAY,
    FoodStatus.PICKED_UP,
    FoodStatus.DELIVERED
  ];

  const advanceStatus = async () => {
    const currentIndex = statuses.indexOf(currentStatus);
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      
      setIsSyncing(true);
      onUpdateStatus(id!, nextStatus);
      await updateFoodStatusInCloud(id!, nextStatus);
      
      setCurrentStatus(nextStatus);
      setIsSyncing(false);
    } else {
      navigate('/impact');
    }
  };

  if (!item) return <div>Not found</div>;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="font-bold text-gray-800">Pickup Progress</h2>
        </div>
        <div className="flex items-center space-x-2">
          {isSyncing && <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>}
          <span className="bg-blue-50 text-blue-600 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-tighter">Sync Active</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-sm space-y-6">
           <div className="bg-white p-6 rounded-[32px] shadow-xl border border-gray-100">
             <div className="flex items-center space-x-4 mb-6">
                <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                <div className="flex-1">
                   <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                   <p className="text-[11px] text-gray-500 font-medium">Recipient: <span className="text-blue-600">{item.donorName}</span></p>
                </div>
                <div className="flex items-center space-x-2">
                   <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                   </button>
                </div>
             </div>

             <div className="flex justify-between items-center mb-8 px-2 relative">
                <div className="absolute top-1.5 left-6 right-6 h-[2px] bg-gray-100 z-0"></div>
                {statuses.map((s, i) => {
                  const statusIdx = statuses.indexOf(currentStatus);
                  const isCompleted = statusIdx > i;
                  const isCurrent = statusIdx === i;
                  return (
                    <div key={s} className="flex flex-col items-center z-10">
                       <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${isCompleted ? 'bg-emerald-500 border-emerald-500 scale-110' : isCurrent ? 'bg-blue-600 border-blue-600 scale-125' : 'bg-white border-gray-200'}`}></div>
                       <span className={`text-[8px] font-bold mt-2 uppercase tracking-tighter ${isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>{s.split(' ')[0]}</span>
                    </div>
                  );
                })}
             </div>

             <button 
                onClick={advanceStatus}
                disabled={isSyncing}
                className={`w-full py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 ${isSyncing ? 'bg-slate-800 text-slate-400' : 'bg-blue-600 text-white shadow-blue-100'}`}
              >
                <span>{currentStatus === FoodStatus.DELIVERED ? 'View Impact' : `Mark as ${statuses[statuses.indexOf(currentStatus) + 1]}`}</span>
                {!isSyncing && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PickupTracking;