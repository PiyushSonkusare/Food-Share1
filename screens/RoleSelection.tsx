
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleSelection = (role: UserRole) => {
    onSelect(role);
    navigate('/auth');
  };

  return (
    <div className="h-full flex flex-col p-8 bg-white">
      <div className="mt-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EcoFeast</h2>
        <p className="text-gray-500">To get started, please select your role in the ecosystem.</p>
      </div>

      <div className="space-y-6 flex-1">
        <button 
          onClick={() => handleSelection(UserRole.DONOR)}
          className="w-full p-6 border-2 border-emerald-100 bg-emerald-50 rounded-2xl flex items-center space-x-4 hover:border-emerald-500 transition-all group"
        >
          <div className="bg-emerald-600 p-4 rounded-xl text-white group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-xl text-emerald-900">Food Donor</h3>
            <p className="text-emerald-700 text-sm">I have surplus food and want to donate it safely.</p>
          </div>
        </button>

        <button 
          onClick={() => handleSelection(UserRole.NGO)}
          className="w-full p-6 border-2 border-blue-100 bg-blue-50 rounded-2xl flex items-center space-x-4 hover:border-blue-500 transition-all group"
        >
          <div className="bg-blue-600 p-4 rounded-xl text-white group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-xl text-blue-900">NGO / Receiver</h3>
            <p className="text-blue-700 text-sm">We distribute food to communities in need.</p>
          </div>
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 pb-4">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default RoleSelection;
