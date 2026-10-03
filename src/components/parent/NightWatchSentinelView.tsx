import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Heart,
  ShieldAlert,
  BatteryCharging,
  Zap,
  RefreshCw,
  Phone,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  Sparkles,
  Radio
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export const NightWatchSentinelView: React.FC = () => {
  const {
    t,
    childProfile,
    nightWatchTelemetry,
    triggerEpilepsyAlarmSim,
    resetNightWatchTelemetry,
    caregiverCircle
  } = useApp();

  const p = t.parent;
  const isAlarmActive = nightWatchTelemetry.status === 'EPILEPTIC_ALERT_TRIGGERED';

  // Simulated live telemetry trend data
  const telemetryData = isAlarmActive
    ? [
        { time: '02:40:00', heartRate: 72, spO2: 98, motion: 4 },
        { time: '02:40:30', heartRate: 74, spO2: 98, motion: 6 },
        { time: '02:41:00', heartRate: 85, spO2: 96, motion: 25 },
        { time: '02:41:30', heartRate: 118, spO2: 93, motion: 68 },
        { time: '02:42:00', heartRate: 135, spO2: 90, motion: 88 },
        { time: '02:42:30', heartRate: 142, spO2: 89, motion: 94 },
      ]
    : [
        { time: '02:37:30', heartRate: 70, spO2: 99, motion: 2 },
        { time: '02:38:00', heartRate: 72, spO2: 98, motion: 3 },
        { time: '02:38:30', heartRate: 71, spO2: 98, motion: 4 },
        { time: '02:39:00', heartRate: 73, spO2: 98, motion: 5 },
        { time: '02:39:30', heartRate: 74, spO2: 98, motion: 6 },
        { time: '02:40:00', heartRate: 72, spO2: 98, motion: 4 },
      ];

  const nightNurse = caregiverCircle.find((c) => c.specialties.includes('Pediatric Epilepsy')) || caregiverCircle[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header & Live Status */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{p.telemetryLiveBadge}</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">{p.nightWatchHeader}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            {p.nightWatchSub}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {!isAlarmActive ? (
            <button
              id="btn-trigger-nightwatch-alarm"
              onClick={triggerEpilepsyAlarmSim}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg animate-pulse"
            >
              <Zap className="w-4 h-4" />
              <span>{p.triggerEpilepsyAlarmSim}</span>
            </button>
          ) : (
            <button
              id="btn-reset-nightwatch"
              onClick={resetNightWatchTelemetry}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{p.resetTelemetrySim}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Critical Alarm Banner if triggered */}
      {isAlarmActive && (
        <div className="p-6 rounded-2xl bg-rose-950/90 border-2 border-rose-500 shadow-2xl animate-pulse space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-3 bg-rose-600 rounded-xl text-white shrink-0 shadow-lg">
                <Volume2 className="w-7 h-7 animate-bounce" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500 text-white uppercase tracking-wider">
                  Critical Telemetry Triggered
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{p.epilepsyAlarmActiveTitle}</h3>
                <p className="text-xs text-rose-200 mt-0.5">
                  Rhythmic clonic convulsions detected (&gt;90 movement index) with acute oxygen dip to 89%.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={`tel:${childProfile.parentPhone}`}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call Night Nurse Direct ({nightNurse.name})</span>
              </a>
            </div>
          </div>

          <div className="bg-rose-900/60 p-3.5 rounded-xl border border-rose-600/40 text-xs text-rose-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Protocol Action: Stesolid 5mg rectal tube located in Room Cabinet #2 if convulsion &gt; 3 min.</span>
            </div>
            <button
              onClick={resetNightWatchTelemetry}
              className="px-3 py-1 bg-rose-800 hover:bg-rose-700 text-white rounded text-[11px] font-bold"
            >
              Silence Alarm & Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* 3. Sensor Live Vital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isAlarmActive ? 'bg-rose-950/40 border-rose-500' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{p.heartRateLabel}</span>
            <Heart className={`w-5 h-5 ${isAlarmActive ? 'text-rose-500 animate-ping' : 'text-rose-400'}`} />
          </div>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-black text-white">{nightWatchTelemetry.heartRateBpm}</span>
            <span className="text-xs text-slate-400">BPM</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Normal Range: 65 - 90 BPM</p>
        </div>

        {/* SpO2 */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isAlarmActive ? 'bg-amber-950/40 border-amber-500' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{p.spO2Label}</span>
            <Activity className={`w-5 h-5 ${isAlarmActive ? 'text-amber-400 animate-pulse' : 'text-teal-400'}`} />
          </div>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className={`text-3xl font-black ${isAlarmActive ? 'text-amber-400' : 'text-emerald-400'}`}>
              {nightWatchTelemetry.oxygenSaturationSpO2}%
            </span>
            <span className="text-xs text-slate-400">SpO2</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Masimo Pulse Oximeter Pulse</p>
        </div>

        {/* Motion Index */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isAlarmActive ? 'bg-rose-950/40 border-rose-500' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{p.motionScoreLabel}</span>
            <Zap className={`w-5 h-5 ${isAlarmActive ? 'text-rose-400 animate-bounce' : 'text-indigo-400'}`} />
          </div>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-black text-white">{nightWatchTelemetry.motionIntensityScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Epileptic Rhythmic Threshold: &gt;75</p>
        </div>

        {/* Battery & Status */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{p.batteryLabel}</span>
            <BatteryCharging className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-black text-white">{nightWatchTelemetry.sensorBatteryLevel}%</span>
            <span className="text-xs text-emerald-400">Charging Cradle Docked</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">NightWatch Armband Model 2.4G</p>
        </div>
      </div>

      {/* 4. Live Waveform Telemetry Graph */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Continuous Nocturnal Telemetry Stream</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                0.2s Biometric Sampling
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live heart rate BPM, oxygenation, and 3-axis accelerometer tremor score.
            </p>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="motionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#hrGrad)" name="Heart Rate (BPM)" />
              <Area type="monotone" dataKey="motion" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#motionGrad)" name="Motion Jerk Index" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
