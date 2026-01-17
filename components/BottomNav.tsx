
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface BottomNavProps {
  items: NavItem[];
}

const BottomNav: React.FC<BottomNavProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] sticky bottom-0 z-50">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button 
            key={item.id}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center flex-1 py-1"
          >
            <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400'}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] font-medium mt-1 ${isActive ? 'text-emerald-700' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
