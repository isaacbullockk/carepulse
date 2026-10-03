import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Navigation,
  PhoneCall,
  Activity,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Bike,
  Car,
  MapPin,
  RefreshCw,
} from 'lucide-react';

export const EmergencyInterceptorView: React.FC = () => {
  const {
    language,
    emergencyInterceptors,
    earlyWarningSeizurePrediction,
    dispatchEmergencyInterceptor,
    triggerEarlyWarningPreIctalSim,
    resetEarlyWarningPreIctalSim,
  } = useApp();

  const isNl = language === 'nl';
  const isPreIctal = earlyWarningSeizurePrediction.riskStatus === 'PRE_ICTAL_WARNING';

  return (
    <div className="space-y-6" id="emergency-interceptor-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/40 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300">
                8-Minuten Spoed-Escalatie
              </span>
              <span className="flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Navigation className="w-3 h-3 text-amber-400" />
                <span>Geofenced Route Interceptor</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'AI Seizure Waveform Prediction & 8-Minuten Route Interceptor' : 'AI Seizure Waveform Prediction & 8-Minute Route Interceptor'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? `Voorspelt epileptische cluster-aanvallen 15–20 minuten voor het begin via HRV-daling en onderschept direct actieve routes van kinderverpleegkundigen in de buurt.`
                : `Predicts epileptic cluster seizures 15–20 minutes in advance via HRV drops and immediately intercepts active routes of nearby pediatric nurses.`}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {isPreIctal ? (
              <button
                id="btn-reset-preictal-sim"
                onClick={resetEarlyWarningPreIctalSim}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isNl ? 'Reset Voorspelling' : 'Reset AI'}</span>
              </button>
            ) : (
              <button
                id="btn-trigger-preictal-sim"
                onClick={triggerEarlyWarningPreIctalSim}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white text-xs font-black transition-all flex items-center space-x-1.5 shadow-lg"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isNl ? '⚡ Simuleer Pre-Ictale Waarschuwing (HRV Drop)' : '⚡ Simulate Pre-Ictal Waveform Warning'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Early Warning AI Waveform Prediction Card */}
      <div className={`rounded-2xl p-5 border transition-all duration-300 shadow-xl ${
        isPreIctal
          ? 'bg-rose-950/60 border-rose-500/60 ring-2 ring-rose-500/40 animate-pulse'
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isPreIctal ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/10 text-indigo-400'
            }`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-black text-white">
                  {isNl ? 'Early Warning Epilepsie Waveform Predictor' : 'Early Warning Epilepsy Waveform Predictor'}
                </h3>
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-md uppercase tracking-wider ${
                  isPreIctal ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {earlyWarningSeizurePrediction.riskStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isNl ? 'Continu lerend neuraal netwerk getraind op Lars zijn vitale nachtsignalen' : 'Continuous neural network trained on Lars’s nocturnal vitals'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500">Risico Score</div>
            <div className={`text-xl font-black ${isPreIctal ? 'text-rose-400' : 'text-emerald-400'}`}>
              {earlyWarningSeizurePrediction.riskScore} / 100
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-500">HRV Variantie Daling</div>
            <div className={`text-base font-black mt-0.5 ${isPreIctal ? 'text-rose-400' : 'text-slate-200'}`}>
              -{earlyWarningSeizurePrediction.hrvDropPercent}%
            </div>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-500">Nachtelijke Micro-Dippen</div>
            <div className="text-base font-black text-slate-200 mt-0.5">
              {earlyWarningSeizurePrediction.nocturnalDesaturationCount} {isNl ? 'dippen' : 'dips'}
            </div>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-500">Aanbevolen Actie</div>
            <div className="text-xs font-bold text-amber-300 mt-0.5">
              {isPreIctal ? 'Buccolam 5mg Klaarleggen' : 'Standaard Bewaking'}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950/90 p-3 rounded-xl border border-slate-800">
          <strong className="text-white">AI Conclusie: </strong>
          {earlyWarningSeizurePrediction.aiReasoning}
        </p>
      </div>

      {/* Geofenced Route Interceptors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-rose-400" />
              <span>{isNl ? 'Actieve Zorgverleners op Route (Amsterdam)' : 'Active En-Route Caregivers (Amsterdam)'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {isNl ? 'Direct oproepbaar bij nachtelijke uitval of acute epilepsie-escalatie.' : 'Immediately dispatchable during late call-offs or seizure surges.'}
            </p>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30">
            {emergencyInterceptors.length} {isNl ? 'in Straal van 2 km' : 'Within 2 km Radius'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyInterceptors.map((nurse) => (
            <div
              key={nurse.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={nurse.nurseAvatar}
                      alt={nurse.nurseName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-black text-white">{nurse.nurseName}</h4>
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-sm bg-slate-800 text-emerald-300">
                          {nurse.bigNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{nurse.currentStreet} ({nurse.neighborhood})</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      ETA: {nurse.etaMinutes} min
                    </span>
                    <div className="text-[10px] text-slate-500 font-bold mt-1 flex items-center justify-end space-x-1">
                      {nurse.travelMode === 'E_BIKE_RAPID' ? (
                        <Bike className="w-3.5 h-3.5 text-teal-400" />
                      ) : (
                        <Car className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                      <span>{nurse.distanceKm} km</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {nurse.specialties.map((spec, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
                <a
                  href={`tel:${nurse.contactPhone}`}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{nurse.contactPhone}</span>
                </a>
                <button
                  id={`btn-dispatch-${nurse.id}`}
                  onClick={() => dispatchEmergencyInterceptor(nurse.id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white text-xs font-black shadow-md flex items-center justify-center space-x-2 transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isNl ? 'Onderschep & Spoed Dispatch' : 'Intercept & Emergency Dispatch'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
