import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole, FoodItem, FoodStatus } from './types';
import SplashScreen from './screens/SplashScreen';
import RoleSelection from './screens/RoleSelection';
import AuthScreen from './screens/AuthScreen';
import DonorDashboard from './screens/DonorDashboard';
import NGODashboard from './screens/NGODashboard';
import DonateFlow from './screens/DonateFlow';
import RequestDetails from './screens/RequestDetails';
import PickupTracking from './screens/PickupTracking';
import ImpactDashboard from './screens/ImpactDashboard';
import NotificationOverlay from './components/NotificationOverlay';

const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Fresh Lunch Packets',
    category: 'Prepared Meals',
    quantity: '20 Plates',
    expiry: 'Today, 8 PM',
    status: FoodStatus.AVAILABLE,
    donorName: 'Main Street Cafe',
    image: 'https://picsum.photos/seed/food1/400/300',
    timestamp: Date.now() - 3600000
  },
  {
    id: '2',
    name: 'Bread & Pastries',
    category: 'Bakery',
    quantity: '5 Kg',
    expiry: 'Tomorrow',
    status: FoodStatus.NOTIFIED,
    donorName: 'Sunny Bakery',
    image: 'https://picsum.photos/seed/food2/400/300',
    timestamp: Date.now() - 7200000
  }
];

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [isAuth, setIsAuth] = useState(false);
  const [items, setItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isLoading) return <SplashScreen />;

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleLogin = () => setIsAuth(true);

  const triggerNotification = (title: string, body: string) => {
    setNotification({ title, body });
    setTimeout(() => setNotification(null), 5000);
  };

  const addFoodItem = (newItem: FoodItem) => {
    setItems([newItem, ...items]);
    triggerNotification(
      "NGO Alert: New Food Available!",
      `${newItem.quantity} of ${newItem.name} listed nearby.`
    );
  };

  const updateItemStatus = (id: string, status: FoodStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  return (
    <Router>
      <div className="h-full bg-white relative overflow-hidden flex flex-col shadow-2xl">
        {!isOnline && (
          <div className="bg-amber-500 text-white text-[10px] font-bold py-1 px-4 text-center z-[100] animate-pulse">
            OFFLINE MODE — Data will sync automatically when reconnected
          </div>
        )}
        
        {notification && (
          <NotificationOverlay 
            title={notification.title} 
            body={notification.body} 
            onClose={() => setNotification(null)} 
          />
        )}
        
        <Routes>
          {!isAuth ? (
            <>
              <Route path="/" element={<RoleSelection onSelect={handleRoleSelect} />} />
              <Route path="/auth" element={<AuthScreen role={role} onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {role === UserRole.DONOR ? (
                <>
                  <Route path="/dashboard" element={<DonorDashboard items={items} />} />
                  <Route path="/donate" element={<DonateFlow onComplete={addFoodItem} />} />
                  <Route path="/impact" element={<ImpactDashboard items={items} />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<NGODashboard items={items} onUpdateStatus={updateItemStatus} />} />
                  <Route path="/request/:id" element={<RequestDetails items={items} onAccept={(id) => updateItemStatus(id, FoodStatus.ACCEPTED)} />} />
                  <Route path="/pickup/:id" element={<PickupTracking items={items} onUpdateStatus={updateItemStatus} />} />
                  <Route path="/impact" element={<ImpactDashboard items={items} />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;