import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Sparkles,
  FileCheck2,
  CheckCircle2,
  Clock,
  Pill,
  ShieldCheck,
  Activity,
  Volume2,
  Play,
  RotateCcw,
  FileText,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { SbarHandoverReport } from '../../types';

export const SbarVoiceHandoverView: React.FC = () => {
  const {
    language,
    nurseProfile,
    sbarReports,
    addSbarHandoverReport,
    childProfile,
  } = useApp();

  const isNl = language === 'nl';

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const [selectedShiftType, setSelectedShiftType] = useState<SbarHandoverReport['shiftType']>('NIGHT_WATCH');

  // Simulation Dictation Presets
  const [presetScript, setPresetScript] = useState<string>(
    'Nachtdienst afgerond bij Lars. Vitale functies de hele nacht stabiel gebleven rond 97-98% SpO2. Om 06:30 uur 5ml Keppra drank gegeven via de Mic-Key knop en nagespoeld met 15ml water. Geen epileptische insulten of Stesolid toediening nodig geweest. Lars werd rustig wakker.'
  );

  const startRecording = () => {
    setIsRecording(true);
    setRecordDuration(0);
    const interval = setInterval(() => {
      setRecordDuration((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopAndProcessRecording = () => {
    if (timerInterval) clearInterval(timerInterval);
    setIsRecording(false);

    // AI SBAR Parse Simulation
    addSbarHandoverReport({
      nurseName: nurseProfile.name,
      nurseBig: nurseProfile.bigNumber || 'BIG-8921094821',
      shiftType: selectedShiftType,
      rawAudioTranscript: presetScript,
      audioDurationSeconds: Math.max(recordDuration, 28),
      situation: `${selectedShiftType === 'NIGHT_WATCH' ? 'Nachtwake' : 'Dagdienst'} overdracht voor ${childProfile.name} (7 jr). Vitale functies stabiel.`,
      background: 'Refractaire epilepsie met Mic-Key 14Fr gastrostomie. Wlz indicatie VV-07.',
      assessment: 'SpO2 gemiddeld 97.4%, HRV baseline rustig. Geen aanvalsactiviteit waargenomen. Mic-Key stomaplaats schoon en droog.',
      recommendation: 'Voortzetten regulier ochtendschema. 08:30 sondevoeding NutriniDrink 200ml. Observeren op alertheid.',
      administeredMeds: [
        { name: 'Levetiracetam (Keppra) 500mg drank (5ml)', time: '06:30', route: 'Mic-Key G-tube', verified: true },
        { name: 'Steriel water flush (15ml)', time: '06:35', route: 'Mic-Key G-tube', verified: true },
      ],
      criticalFlags: ['Geen Stesolid noodtoediening nodig geweest', 'Mic-Key ballonspanning gecontroleerd'],
      svbBillableHours: selectedShiftType === 'NIGHT_WATCH' ? 8.0 : 4.5,
    });
    setRecordDuration(0);
  };

  return (
    <div className="space-y-6" id="sbar-voice-handover-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
                Nightingale AI Clinical Voice Engine
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                NEN 7513 & SBAR Protocol
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'Spraakgestuurde Klinische SBAR Overdracht' : 'AI Speech-to-SBAR Clinical Handover'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? 'Spreek na afloop van je dienst een korte gesproken overdracht in. CarePulse AI structureert de audio automatisch in Situation, Background, Assessment en Recommendation, verifieert medicatietoedieningen en koppelt gewerkte uren direct aan het SVB urenbriefje.'
                : 'Dictate a quick voice note at shift completion. CarePulse AI converts raw audio into structured SBAR format, verifies G-tube flushes, and registers billable PGB hours.'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-indigo-300 font-bold">
              {sbarReports.length} {isNl ? 'Overdrachten in Dossier' : 'Handover Reports'}
            </span>
          </div>
        </div>
      </div>

      {/* Voice Recording Studio / Dictation Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Mic className="w-5 h-5 text-indigo-400" />
              <span>{isNl ? 'Nieuwe Dienst Overdracht Inspraak' : 'Record Shift Handover'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {isNl ? 'Gekoppeld aan zorgdossier Lars van Dijk (7 jr)' : 'Linked to Lars van Dijk medical file'}
            </p>
          </div>

          {/* Shift Type Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['DAY_SHIFT', 'EVENING_SHIFT', 'NIGHT_WATCH'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedShiftType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  selectedShiftType === type
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type === 'DAY_SHIFT' ? (isNl ? 'Dagdienst' : 'Day') : type === 'EVENING_SHIFT' ? (isNl ? 'Avonddienst' : 'Evening') : (isNl ? 'Nachtwake' : 'Night')}
              </button>
            ))}
          </div>
        </div>

        {/* Live Audio Visualizer / Recorder Interface */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center justify-center text-center space-y-4">
          {/* Pulsing Mic Circle */}
          <div className="relative">
            {isRecording && (
              <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping" />
            )}
            <button
              id="btn-toggle-sbar-recording"
              onClick={isRecording ? stopAndProcessRecording : startRecording}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-500 text-white ring-4 ring-rose-500/40 animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white ring-4 ring-indigo-500/20 hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <div>
            <div className="text-sm font-black text-white">
              {isRecording
                ? `${isNl ? 'Aan het opnemen...' : 'Recording audio...'} 00:${recordDuration < 10 ? '0' : ''}${recordDuration}`
                : isNl
                ? 'Klik op de microfoon om overdracht in te spreken'
                : 'Click microphone to record shift handover'}
            </div>
            <p className="text-xs text-slate-400 max-w-md mt-1">
              {isNl
                ? 'Automatische herkenning van medicatie, sondevoeding, complicaties en bijzonderheden.'
                : 'Automatic detection of medical flushes, SpO2 dips, and night watch telemetry.'}
            </p>
          </div>

          {/* Editable Prompt Preset for Fast Testing */}
          <div className="w-full max-w-2xl bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-left">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1.5">
              <span>{isNl ? 'Gesproken Audio Tekst (Simulatie Transcriptie):' : 'Speech Transcript Preview:'}</span>
              <span className="text-indigo-400 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Ready</span>
              </span>
            </div>
            <textarea
              id="sbar-preset-textarea"
              value={presetScript}
              onChange={(e) => setPresetScript(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-hidden resize-none"
              rows={3}
            />
          </div>

          {isRecording && (
            <button
              onClick={stopAndProcessRecording}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-lg flex items-center space-x-2 hover:brightness-110 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isNl ? 'Stop & Genereer SBAR Overdracht' : 'Stop & Generate SBAR'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Historical SBAR Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>{isNl ? 'Geverifieerde SBAR Overdrachten' : 'Verified SBAR Handover Reports'}</span>
          </h3>
          <span className="text-xs text-slate-400">
            {isNl ? 'Wettelijk bewaartermijn: 20 jaar (WGBO)' : 'WGBO compliant 20-yr retention'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sbarReports.map((report) => (
            <div
              key={report.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-white">{report.nurseName}</span>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-slate-800 text-slate-300">
                        {report.nurseBig}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        {report.shiftType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{report.timestamp}</span>
                      <span>•</span>
                      <span>{report.svbBillableHours} uur SVB declarabel</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>NEN 7513 Gearchiveerd</span>
                  </span>
                </div>
              </div>

              {/* SBAR 4-Block Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Situation */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-indigo-400">
                    S • Situation (Situatie)
                  </div>
                  <p className="text-slate-200">{report.situation}</p>
                </div>

                {/* Background */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-purple-400">
                    B • Background (Achtergrond)
                  </div>
                  <p className="text-slate-200">{report.background}</p>
                </div>

                {/* Assessment */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                    A • Assessment (Beoordeling & Observaties)
                  </div>
                  <p className="text-slate-200">{report.assessment}</p>
                </div>

                {/* Recommendation */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    R • Recommendation (Aanbevelingen Volgende Dienst)
                  </div>
                  <p className="text-slate-200">{report.recommendation}</p>
                </div>
              </div>

              {/* Administered Medications & Critical Flags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 font-bold flex items-center space-x-1">
                    <Pill className="w-3.5 h-3.5 text-amber-400" />
                    <span>Toegediend:</span>
                  </span>
                  {report.administeredMeds.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px]"
                    >
                      {m.name} ({m.time})
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Audio bron: {report.audioDurationSeconds}s WAV</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
