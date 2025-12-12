"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Check, Shield, DollarSign, ArrowRight, Info } from 'lucide-react';

export default function RoofingCalculator() {
  const [homeSize, setHomeSize] = useState(2500);
  const [material, setMaterial] = useState('asphalt');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [finance, setFinance] = useState(0);

  const PRICES = {
    asphalt: { base: 4.50, name: "Asphalt Shingle" },
    metal: { base: 9.00, name: "Metal Seam" },
    tile: { base: 12.00, name: "Clay Tile" }
  };

  useEffect(() => {
    // Type assertion to fix TypeScript error
    const key = material as keyof typeof PRICES;
    const basePrice = PRICES[key].base;
    
    const estimatedTotal = homeSize * basePrice;
    const minPrice = Math.floor(estimatedTotal * 0.9);
    const maxPrice = Math.floor(estimatedTotal * 1.1);
    
    const monthly = Math.floor(estimatedTotal / 60 * 1.3);

    setPriceRange({ min: minPrice, max: maxPrice });
    setFinance(monthly);
  }, [homeSize, material]);

  const handleLeadCapture = () => {
    alert("✅ Estimate Sent! (This is a demo)");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE */}
        <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold uppercase tracking-wider text-xs">
            <Calculator size={16} />
            Instant Quote Engine
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Customize Your Roof</h2>
          
          <div className="mb-10 mt-8">
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Home Size</label>
              <div className="text-3xl font-bold text-blue-600">{homeSize.toLocaleString()} <span className="text-base text-gray-400 font-medium">sq ft</span></div>
            </div>
            <input 
              type="range" min="1000" max="5000" step="50" value={homeSize}
              onChange={(e) => setHomeSize(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="mb-8">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 block">Roof Material</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(PRICES).map(([key, value]) => (
                <button
                  key={key} onClick={() => setMaterial(key)}
                  className={`border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 ${
                    material === key ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-105' : 'border-gray-100 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {key === 'asphalt' && <Shield size={24} className="mb-2" />}
                  {key === 'metal' && <Check size={24} className="mb-2" />}
                  {key === 'tile' && <DollarSign size={24} className="mb-2" />}
                  <span className="text-xs font-bold text-center leading-tight">{value.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#0f172a] w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-8">
              <span className="text-blue-200 text-sm font-medium tracking-widest uppercase mb-2 block">Estimated Price Range</span>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">${priceRange.min.toLocaleString()}</h3>
                <span className="text-2xl text-gray-400 font-light">-</span>
                <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">${priceRange.max.toLocaleString()}</h3>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8 flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-1">Finance This Roof</p>
                <p className="text-3xl font-bold text-white">${finance}<span className="text-lg text-gray-400 font-normal">/mo</span></p>
              </div>
              <div className="bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center">
                <Info size={20} className="text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <input type="email" placeholder="Enter email to lock this price..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-400" />
              <button onClick={handleLeadCapture} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                Lock in Estimate <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}