/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { IndianRupee, Users, RotateCcw, Percent, Receipt } from "lucide-react";

export default function App() {
  const [bill, setBill] = useState<string>("500.00");
  const [tip, setTip] = useState<number>(15);
  const [people, setPeople] = useState<number>(2);

  const parsedBill = Math.max(0, parseFloat(bill) || 0);
  const parsedPeople = Math.max(1, people);

  const totalTip = parsedBill * (tip / 100);
  const totalBill = parsedBill + totalTip;
  const tipPerPerson = totalTip / parsedPeople;
  const totalPerPerson = totalBill / parsedPeople;

  const tipPresets = [10, 15, 18, 20, 25];

  const handleReset = () => {
    setBill("");
    setTip(15);
    setPeople(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div id="app-card" className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        
        {/* Left Interactive panel */}
        <div id="interactive-panel" className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h1 id="app-title" className="text-xl font-bold text-slate-800 tracking-tight">Split & Tip</h1>
                <p id="app-subtitle" className="text-xs text-slate-400">Calculate tips & split bills instantly</p>
              </div>
            </div>

            {/* Bill Input */}
            <div className="space-y-2 mb-6">
              <label htmlFor="bill-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Bill Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <input
                  id="bill-input"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-lg"
                />
              </div>
            </div>

            {/* Tip Selection */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Select Tip %
                </label>
                <span id="tip-indicator" className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {tip}%
                </span>
              </div>
              
              {/* Presets */}
              <div className="grid grid-cols-5 gap-2">
                {tipPresets.map((preset) => (
                  <button
                    key={preset}
                    id={`preset-${preset}`}
                    onClick={() => setTip(preset)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      tip === preset
                        ? "bg-slate-800 text-white shadow-md shadow-slate-800/10"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>

              {/* Slider for custom tip */}
              <div className="pt-2 flex items-center space-x-4">
                <Percent className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  id="tip-slider"
                  type="range"
                  min="0"
                  max="50"
                  value={tip}
                  onChange={(e) => setTip(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* People Input */}
            <div className="space-y-2">
              <label htmlFor="people-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Number of People
              </label>
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <input
                    id="people-input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    value={people}
                    onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold text-lg"
                  />
                </div>
                
                {/* Decrement / Increment controls */}
                <div className="flex space-x-1.5">
                  <button
                    id="btn-decrement"
                    onClick={() => setPeople((prev) => Math.max(1, prev - 1))}
                    className="w-12 h-12 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-600 transition-all cursor-pointer active:scale-95"
                  >
                    -
                  </button>
                  <button
                    id="btn-increment"
                    onClick={() => setPeople((prev) => prev + 1)}
                    className="w-12 h-12 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-600 transition-all cursor-pointer active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            id="btn-reset"
            onClick={handleReset}
            className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer border border-slate-200/50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Calculator</span>
          </button>
        </div>

        {/* Right Summary Panel */}
        <div id="summary-panel" className="bg-emerald-800 p-6 sm:p-8 md:w-1/2 flex flex-col justify-between text-white relative">
          <div className="space-y-6">
            <h2 id="summary-heading" className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Split Summary
            </h2>

            {/* Results Rows */}
            <div className="space-y-6 pt-2">
              
              {/* Tip Amount Row */}
              <div className="flex justify-between items-end border-b border-emerald-700/50 pb-4">
                <div>
                  <p id="tip-label-person" className="font-semibold text-sm">Tip Amount</p>
                  <p id="tip-sublabel-person" className="text-emerald-300 text-xs">per person</p>
                </div>
                <div id="val-tip-per-person" className="text-3xl font-extrabold text-emerald-100 tracking-tight">
                  ₹{tipPerPerson.toFixed(2)}
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-end border-b border-emerald-700/50 pb-4">
                <div>
                  <p id="total-label-person" className="font-semibold text-sm">Total Pay</p>
                  <p id="total-sublabel-person" className="text-emerald-300 text-xs">per person</p>
                </div>
                <div id="val-total-per-person" className="text-4xl font-black text-white tracking-tight">
                  ₹{totalPerPerson.toFixed(2)}
                </div>
              </div>

              {/* Total Bill Overview */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-700/20">
                  <span className="text-xs text-emerald-300 block">Total Tip</span>
                  <span id="val-total-tip" className="text-lg font-bold text-white">₹{totalTip.toFixed(2)}</span>
                </div>
                <div className="bg-emerald-900/40 p-3 rounded-xl border border-emerald-700/20">
                  <span className="text-xs text-emerald-300 block">Total Bill</span>
                  <span id="val-total-bill" className="text-lg font-bold text-white">₹{totalBill.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Prompt/Guide */}
          <div className="mt-8 bg-emerald-900/50 p-4 rounded-2xl border border-emerald-700/30 text-xs text-emerald-200 leading-relaxed">
            💡 <strong className="text-white">Splitting tip nicely:</strong> When dining out with friends, this split is proportional, making it simple to request or transfer precise individual amounts.
          </div>
        </div>

      </div>
    </div>
  );
}

