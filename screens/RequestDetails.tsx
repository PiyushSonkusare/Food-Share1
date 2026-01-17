import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FoodItem } from '../types';

interface RequestDetailsProps {
  items: FoodItem[];
  onAccept: (id: string) => void;
}

const RequestDetails: React.FC<RequestDetailsProps> = ({ items, onAccept }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = items.find(i => i.id === id);

  if (!item) return <div className="p-8">Item not found</div>;

  const handleAccept = () => {
    onAccept(item.id);
    navigate(`/pickup/${item.id}`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="relative h-72">
        <img src={item.image} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="absolute bottom-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          AI Verified Freshness
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 -mt-6 bg-white rounded-t-3xl relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.category} • {item.quantity}</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl space-y-4 mb-6">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
             </div>
             <div>
               <p className="text-xs text-black font-bold">Donor</p>
               <p className="text-sm font-medium text-gray-800">{item.donorName}</p>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-black">Donor Notes</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Prepared fresh today. Kept in refrigerator since noon. Best if consumed within 6 hours. Packaged in biodegradable containers.
          </p>
        </div>

        <button 
          onClick={handleAccept}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mt-12 shadow-lg shadow-blue-100 active:scale-95 transition-all"
        >
          Accept Pickup Request
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;