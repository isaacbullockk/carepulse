import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  HeartHandshake,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  Euro,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const RespiteCoOpView: React.FC = () => {
  const { t, respiteCoOpFamilies, proposeRespiteCoOp } = useApp();
  const p = t.parent;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Neighborhood Respite Co-Ops</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">{p.respiteCoOpHeader}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            {p.respiteCoOpSub}
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-teal-950/40 px-4 py-3 rounded-2xl border border-teal-500/30">
          <HeartHandshake className="w-6 h-6 text-teal-400 shrink-0" />
          <div className="text-xs">
            <p className="text-slate-400">Co-Op Cost Efficiency</p>
            <p className="text-sm font-bold text-teal-300">50% PGB Savings per session</p>
          </div>
        </div>
      </div>

      {/* 2. Co-Op Matched Families Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {respiteCoOpFamilies.map((coop) => {
          const isConnected = coop.status === 'ACTIVE_SHARED_RESPITE';

          return (
            <div
              key={coop.id}
              className={`rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between ${
                isConnected
                  ? 'bg-slate-900 border-teal-500/60 shadow-xl'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={coop.avatar}
                      alt={coop.childName}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/40"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-white">{coop.childName}</h3>
                        <span className="text-xs text-slate-400">({coop.childAge} yo)</span>
                      </div>
                      <p className="text-xs text-teal-400 font-medium">{coop.diagnosis}</p>
                      <p className="text-[11px] text-slate-400">Parents: {coop.parentNames}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-teal-400" />
                    <span>{coop.neighborhood} ({coop.distanceKm} km)</span>
                  </span>
                </div>

                {/* Shared Activity & Time Slot */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      <span>{coop.sharedSlotProposal}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Activity Focus: <strong className="text-white">{coop.activityFocus}</strong>
                  </p>
                </div>

                {/* Compatibility tags */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Sensory & Equipment Compatibility:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {coop.compatibilityTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] bg-teal-950/60 border border-teal-500/30 text-teal-300 flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-teal-400" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400">Estimated Split Cost:</span>
                  <p className="text-sm font-bold text-emerald-400">€21.00/hr (vs €42.00 solo)</p>
                </div>

                <button
                  id={`btn-propose-coop-${coop.id}`}
                  onClick={() => proposeRespiteCoOp(coop.id)}
                  disabled={isConnected}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow ${
                    isConnected
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 cursor-default'
                      : 'bg-teal-600 hover:bg-teal-500 text-white'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{isConnected ? p.sharedSessionConfirmedBadge : p.proposeSharedCareBtn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
