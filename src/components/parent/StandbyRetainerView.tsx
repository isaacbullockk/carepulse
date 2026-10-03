import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  Phone,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Euro,
  Radio
} from 'lucide-react';

export const StandbyRetainerView: React.FC = () => {
  const { t, standbyPoolCaregivers, toggleStandbyRetainer } = useApp();
  const p = t.parent;

  const activeRetainersCount = standbyPoolCaregivers.filter(
    (c) => c.activeRetainerStatus === 'RETAINER_ACTIVE'
  ).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Micro-Retainer Emergency Guarantee</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">{p.standbyRetainerHeader}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            {p.standbyRetainerSub}
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-amber-950/40 px-4 py-3 rounded-2xl border border-amber-500/30">
          <Zap className="w-6 h-6 text-amber-400 shrink-0" />
          <div className="text-xs">
            <p className="text-slate-400">Guaranteed Response Radius</p>
            <p className="text-sm font-bold text-white">{activeRetainersCount} Nurses on Instant Standby (&lt;15 min)</p>
          </div>
        </div>
      </div>

      {/* 2. Standby Caregivers List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {standbyPoolCaregivers.map((caregiver) => {
          const isActive = caregiver.activeRetainerStatus === 'RETAINER_ACTIVE';

          return (
            <div
              key={caregiver.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-amber-500/60 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 opacity-80'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="relative">
                    <img
                      src={caregiver.avatar}
                      alt={caregiver.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700"
                    />
                    {isActive && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{caregiver.name}</h3>
                    <p className="text-xs text-slate-400">{caregiver.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{caregiver.distanceKm} km away ({caregiver.etaMinutes} min)</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5">
                  {caregiver.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Retainer economics */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{p.hourlyStandbyCost}:</span>
                    <span className="font-bold text-white">€{caregiver.standbyHourlyRetainer.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{p.guaranteedSlaArrival}:</span>
                    <span className="font-bold text-emerald-400">&le; {caregiver.guaranteedArrivalMinutes} Minutes</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-800">
                <button
                  id={`btn-toggle-retainer-${caregiver.id}`}
                  onClick={() => toggleStandbyRetainer(caregiver.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5 ${
                    isActive
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>{isActive ? p.deactivateRetainerBtn : p.activateRetainerBtn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
