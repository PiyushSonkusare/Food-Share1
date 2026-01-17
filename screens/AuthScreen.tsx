
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthScreenProps {
  role: UserRole;
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ role, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const primaryColor = role === UserRole.DONOR ? 'bg-emerald-600' : 'bg-blue-600';
  const textColor = role === UserRole.DONOR ? 'text-emerald-600' : 'text-blue-600';

  return (
    <div className="h-full p-8 flex flex-col justify-center bg-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-500">
          As a <span className={`font-bold ${textColor}`}>{role}</span>
        </p>
      </div>

      <div className="space-y-4">
        {isRegistering && (
          <input 
            type="text" 
            placeholder="Organization/Full Name" 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-opacity-50 ring-emerald-500 outline-none text-black"
          />
        )}
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-opacity-50 ring-emerald-500 outline-none text-black"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-opacity-50 ring-emerald-500 outline-none text-black"
        />
      </div>

      <button 
        onClick={onLogin}
        className={`w-full ${primaryColor} text-white py-4 rounded-xl font-bold text-lg mt-8 shadow-lg active:scale-95 transition-transform`}
      >
        {isRegistering ? 'Sign Up' : 'Login'}
      </button>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className={`font-medium ${textColor}`}
        >
          {isRegistering ? 'Already have an account? Login' : 'New here? Register now'}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
