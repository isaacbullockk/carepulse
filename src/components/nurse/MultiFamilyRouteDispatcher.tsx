import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bike,
  Navigation,
  MapPin,
  Clock,
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Leaf,
  Coins,
  Share2,
} from 'lucide-react';
import { NeighborhoodCareStop } from '../../types';

export const MultiFamilyRouteDispatcher: React.FC = () => {
  const {
    language,
    multiFamilyRoutePlan,
    updateCareStopStatus,
    optimizeRouteWithAi,
  } = useApp();

  const isNl = language === 'nl';

  return (
    <div className="space-y-6" id="multi-family-route-dispatcher">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                Pediatric Micro-Transit Network
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                Speed-Pedelec / E-Bike Optimized
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'Multi-Gezin Buurt Route Optimizer & Dispatcher' : 'Multi-Family Neighborhood Route Optimizer'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? 'Verbindt opeenvolgende intensieve kindzorgdiensten in dezelfde wijk. Vermindert onbetaalde reistijd, verlaagt CO2-uitstoot met 85% via snelle e-bike corridors en creëert een gedeelde 8-minuten stand-by ring voor acute alarmeringen.'
                : 'Chains high-complexity pediatric cases in the same neighborhood. Reduces transit dead-time, cuts emissions via rapid e-bike corridors, and pools emergency standby coverage.'}
            </p>
          </div>

          <button
            id="btn-ai-optimize-route"
            onClick={optimizeRouteWithAi}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-black text-xs flex items-center space-x-2 shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isNl ? '⚡ AI Route Optimalisatie' : '⚡ AI Optimize Route'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: Transit Time, CO2 Saved, Standby Pool Benefit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-black uppercase text-slate-400 flex items-center justify-between">
            <span>Totale Reistijd</span>
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{multiFamilyRoutePlan.totalTransitTimeMinutes} min</div>
          <p className="text-[11px] text-emerald-400 font-bold flex items-center space-x-1">
            <TrendingDown className="w-3 h-3" />
            <span>-21% minder reistijd</span>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-black uppercase text-slate-400 flex items-center justify-between">
            <span>Totale Afstand</span>
            <Bike className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{multiFamilyRoutePlan.totalDistanceKm} km</div>
          <p className="text-[11px] text-slate-400">Amsterdam West / De Pijp</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-black uppercase text-slate-400 flex items-center justify-between">
            <span>CO2 Besparing</span>
            <Leaf className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-400">+{multiFamilyRoutePlan.co2SavedKg} kg</div>
          <p className="text-[11px] text-slate-400">t.o.v. fossiele auto</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] font-black uppercase text-slate-400 flex items-center justify-between">
            <span>Gedeeld Standby Voordeel</span>
            <Coins className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">€{multiFamilyRoutePlan.standbyOverlapBenefitEuro}</div>
          <p className="text-[11px] text-slate-400">PGB efficiëntie bonus</p>
        </div>
      </div>

      {/* Interactive Neighborhood Route Map & Stop Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stylized SVG Map */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-black text-white">
                {isNl ? 'Live Corridor Kaart (Amsterdam Zorgcluster)' : 'Live Corridor Map (Amsterdam)'}
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-950 text-emerald-400 border border-slate-800">
              E-BIKE SPEED 25-45 KM/H
            </span>
          </div>

          <div className="relative w-full h-80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Background Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpace">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#10b981" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Connecting Route Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                points="120,95 260,165 350,85"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="6,6"
                className="animate-pulse"
              />
            </svg>

            {/* Placed Care Stops */}
            {multiFamilyRoutePlan.stops.map((stop, idx) => (
              <div
                key={stop.id}
                style={{ left: `${stop.coordinates.x}%`, top: `${stop.coordinates.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white shadow-lg transition-transform group-hover:scale-125 ${
                    stop.status === 'COMPLETED'
                      ? 'bg-emerald-600 ring-2 ring-emerald-400'
                      : stop.status === 'EN_ROUTE'
                      ? 'bg-amber-600 ring-4 ring-amber-400/50 animate-bounce'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="mt-1 px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-slate-200 whitespace-nowrap shadow-md">
                  {stop.childName} ({stop.neighborhood})
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Dienstdoend: <strong>{multiFamilyRoutePlan.nurseName}</strong></span>
            <span className="text-emerald-400 font-bold">10.5 uur aaneengesloten PGB zorg</span>
          </div>
        </div>

        {/* Stops Sequence Checklist */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white">
              {isNl ? 'Zorglocaties & Tijdvensters' : 'Care Stops & Time Windows'}
            </h3>
            <span className="text-xs text-slate-400">{multiFamilyRoutePlan.stops.length} Gezinnen</span>
          </div>

          <div className="space-y-3">
            {multiFamilyRoutePlan.stops.map((stop, idx) => (
              <div
                key={stop.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  stop.status === 'EN_ROUTE'
                    ? 'bg-amber-950/30 border-amber-500/50 ring-1 ring-amber-500/30'
                    : stop.status === 'COMPLETED'
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-white">{stop.childName} ({stop.age} jr)</h4>
                      <p className="text-[11px] text-slate-400">{stop.address}, {stop.neighborhood}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[9px] font-black rounded-md uppercase tracking-wider ${
                      stop.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : stop.status === 'EN_ROUTE'
                        ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {stop.status}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{stop.timeWindow}</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {stop.status !== 'COMPLETED' && (
                      <button
                        onClick={() => updateCareStopStatus(stop.id, 'COMPLETED')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[10px] font-bold transition-all"
                      >
                        ✓ Rond Af
                      </button>
                    )}
                    {stop.status === 'PENDING' && (
                      <button
                        onClick={() => updateCareStopStatus(stop.id, 'EN_ROUTE')}
                        className="px-2.5 py-1 rounded-lg bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white text-[10px] font-bold transition-all"
                      >
                        🚲 Onderweg
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
