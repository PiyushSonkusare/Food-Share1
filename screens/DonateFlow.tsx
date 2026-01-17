import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodItem, FoodStatus } from '../types';
import { verifyFoodImage, VerificationResult } from '../services/geminiService';
import { uploadFoodDonation } from '../services/firebaseService';

interface DonateFlowProps {
  onComplete: (item: FoodItem) => void;
}

const DonateFlow: React.FC<DonateFlowProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadProgressStep, setUploadProgressStep] = useState(0); 
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [foodDetails, setFoodDetails] = useState({ 
    name: '', 
    category: 'Prepared Meals', 
    quantity: '5 Plates',
    expiry: new Date().toISOString().split('T')[0] 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setStep(2);
        startVerification(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const startVerification = async (img: string) => {
    setIsVerifying(true);
    const result = await verifyFoodImage(img);
    setVerificationResult(result);
    setIsVerifying(false);
  };

  const handleFinalUpload = async () => {
    if (!image) return;
    setStep(4); 
    
    try {
      const firebaseId = await uploadFoodDonation({
        name: foodDetails.name || 'New Donation',
        category: foodDetails.category,
        quantity: foodDetails.quantity,
        expiry: foodDetails.expiry,
        status: FoodStatus.AVAILABLE,
        donorName: 'The Green Cafe',
        image: image,
      }, (currentStep) => {
        setUploadProgressStep(currentStep);
      });

      const newItem: FoodItem = {
        id: firebaseId,
        name: foodDetails.name || 'New Donation',
        category: foodDetails.category,
        quantity: foodDetails.quantity,
        expiry: foodDetails.expiry,
        status: FoodStatus.AVAILABLE,
        donorName: 'The Green Cafe',
        image: image,
        timestamp: Date.now()
      };
      
      onComplete(newItem);
      navigate('/dashboard');
    } catch (err) {
      alert("Upload failed. Please try again.");
      setStep(3);
      setUploadProgressStep(0);
    }
  };

  const checklistItems = [
    "Compressing image for cloud",
    "Uploading to Firebase Storage",
    "Syncing with Firestore DB",
    "Notifying nearby NGOs"
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-100 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 text-gray-500">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="flex-1 text-center font-bold text-gray-800">Donate Food</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-2 border-emerald-100 border-dashed">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" className="text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Capture Food Photo</h3>
            <p className="text-gray-500 mb-8 text-sm">Our AI will verify the freshness and quality automatically.</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleCapture}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200"
            >
              Take Photo
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col h-full">
            <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-md">
              <img src={image!} className="w-full h-full object-cover" />
              {isVerifying && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-bold">AI Analysis...</p>
                </div>
              )}
            </div>

            {!isVerifying && verificationResult && (
              <div className={`p-5 rounded-2xl border-2 mb-6 ${verificationResult.isSafe ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${verificationResult.isSafe ? 'bg-emerald-600' : 'bg-amber-600'} text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${verificationResult.isSafe ? 'text-emerald-900' : 'text-amber-900'}`}>
                      {verificationResult.isSafe ? 'AI Verified' : 'Check Quality'}
                    </h4>
                    <p className="text-xs text-gray-600 opacity-80 mt-1">{verificationResult.description}</p>
                  </div>
                </div>
              </div>
            )}

            {!isVerifying && (
              <div className="mt-auto space-y-3">
                <button onClick={() => setStep(3)} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold">Continue</button>
                <button onClick={() => setStep(1)} className="w-full text-gray-500 font-medium py-3">Retake</button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-black mb-2">Food Name</label>
              <input 
                type="text" 
                placeholder="e.g. Mixed Veg Salad" 
                value={foodDetails.name}
                onChange={(e) => setFoodDetails({...foodDetails, name: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 ring-emerald-500/20 text-black"
              />
            </div>
            
            <button 
              onClick={handleFinalUpload}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold mt-8 shadow-lg shadow-emerald-200"
            >
              Confirm Donation
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="mb-10 text-center">
               <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900">Syncing with Cloud</h3>
            </div>

            <div className="w-full space-y-4 max-w-xs mx-auto">
              {checklistItems.map((item, index) => {
                const itemStep = index + 1;
                const isComplete = uploadProgressStep > itemStep;
                const isCurrent = uploadProgressStep === itemStep;
                return (
                  <div key={item} className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${isCurrent ? 'bg-blue-50 border border-blue-100' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isComplete ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {isComplete ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : <span className="text-[10px] font-bold">{itemStep}</span>}
                    </div>
                    <span className={`text-sm font-medium ${isComplete ? 'text-gray-400 line-through' : isCurrent ? 'text-blue-700' : 'text-gray-400'}`}>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateFlow;