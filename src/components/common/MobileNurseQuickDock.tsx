import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  Volume2,
  Lock,
  Zap,
  Radio,
  Sparkles,
} from 'lucide-react';

export const MobileNurseQuickDock: React.FC = () => {
  const {
    language,
    currentRole,
    nightWatchTelemetry,
    earlyWarningSeizurePrediction,
    triggerEpilepsyAlarmSim,
    resetNightWatchTelemetry,
    playPictoVoice,
    aacPictoSymbols,
  } = useApp();

  const [expanded, setExpanded] = useState<boolean>(false);
  const isNl = language === 'nl';
  const isPreIctal = earlyWarningSeizurePrediction.riskStatus === 'PRE_ICTAL_WARNING';

  // Only show on nurse or parent mode for quick response
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t-2 border-indigo-500/40 p-2 sm:p-3 shadow-2xl transition-all" id="mobile-nurse-quick-dock">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Telemetry Status Glance */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className={`p-2 rounded-xl border flex items-center justify-center ${
            isPreIctal
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-emerald-400'
          }`}>
            <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[11px] sm:text-xs font-black text-white">
                Lars (7 jr)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {nightWatchTelemetry.spo2Percent}% SpO2 • {nightWatchTelemetry.heartRateBpm} BPM
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              {isPreIctal ? '⚠️ PRE-ICTAAL EARLY WARNING ACTIEF' : 'NightWatch Continuous IoT Sentinel Online'}
            </p>
          </div>
        </div>

        {/* Tactical Glove-Friendly Fast Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            id="btn-quick-voice-order"
            onClick={() => playPictoVoice(aacPictoSymbols[0])}
            className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-black flex items-center space-x-1.5 transition-all active:scale-95 shrink-0"
            title="Spreek AAC stemopdracht uit"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{isNl ? 'AAC Stem' : 'AAC Voice'}</span>
          </button>

          <button
            id="btn-quick-emergency-alarm"
            onClick={triggerEpilepsyAlarmSim}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white text-xs font-black flex items-center space-x-1.5 shadow-lg active:scale-95 shrink-0"
          >
            <Zap className="w-4 h-4" />
            <span>{isNl ? '🚨 8-Min Alarm' : '🚨 8-Min Alarm'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
