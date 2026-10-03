import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import { DemoScenarioMode } from '../../types';

export const DemoTourPitchBanner: React.FC<{
  onSelectTab: (tab: any) => void;
}> = ({ onSelectTab }) => {
  const {
    language,
    activeDemoScenario,
    runDemoScenario,
    resetEarlyWarningPreIctalSim,
  } = useApp();

  const isNl = language === 'nl';

  const scenarios: {
    id: DemoScenarioMode;
    titleNl: string;
    titleEn: string;
    descNl: string;
    descEn: string;
    badge: string;
    badgeColor: string;
    targetTab: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'SEIZURE_EMERGENCY',
      titleNl: 'Scenario 1: 03:00 Nachtelijke Aanval & 8-Min Interceptor',
      titleEn: 'Scenario 1: 03:00 AM Seizure & 8-Min Interceptor',
      descNl: 'Triggert HRV drop (38.4%) en alarmeert direct actieve e-bike kinderverpleegkundige in de buurt.',
      descEn: 'Triggers acute HRV drop (38.4%) and dispatches nearby en-route pediatric nurse with 6-min ETA.',
      badge: 'Acute Noodzorg',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      targetTab: 'interceptor',
      icon: <Zap className="w-4 h-4 text-rose-400" />,
    },
    {
      id: 'AAC_LARS_VOICE',
      titleNl: 'Scenario 2: Lars Spreekt via Sclera AAC Stem-Bord',
      titleEn: 'Scenario 2: Lars Speaks via Sclera AAC Board',
      descNl: 'Simuleert Lars die via oogbesturing meldt dat zijn sonde doorspoeling nodig heeft.',
      descEn: 'Simulates non-verbal Lars triggering spoken voice order for G-tube flushing & sensory break.',
      badge: 'Inclusieve Stem',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      targetTab: 'aac',
      icon: <Volume2 className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'DBA_SVB_AUDIT',
      titleNl: 'Scenario 3: Wet DBA & Zorgkantoor PGB-Verantwoording',
      titleEn: 'Scenario 3: Wet DBA & Zorgkantoor Audit Shield',
      descNl: 'Berekent 100% compliant Safe Harbor keurmerk en VV-07 PGB Wlz-jaarverantwoording.',
      descEn: 'Generates Belastingdienst Safe Harbor audit score and automated Zorgkantoor VV-07 balance.',
      badge: 'Fiscal & Audit',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      targetTab: 'dba',
      icon: <FileSpreadsheet className="w-4 h-4 text-teal-400" />,
    },
    {
      id: 'HOSPITAL_FHIR_TRANSFER',
      titleNl: 'Scenario 4: HL7® FHIR® Spoedoverdracht naar Emma SEH',
      titleEn: 'Scenario 4: HL7® FHIR® Transfer to Emma ER',
      descNl: 'Verzendt compleet medisch paspoort, Stesolid-schema en live NightWatch telemetrie naar ziekenhuis.',
      descEn: 'Pushes complete clinical bundle, Stesolid rescue plan, and live telemetry to Emma Kinderziekenhuis.',
      badge: 'Nictiz / MedMij',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      targetTab: 'fhir',
      icon: <Building2 className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 'SEIZURE_EMERGENCY',
      titleNl: 'Scenario 5: Paramedic "In-Pocket" Noodkaart & QR Spoedpas',
      titleEn: 'Scenario 5: Paramedic In-Pocket Emergency Pass',
      descNl: 'Printklare fysieke pas met Mic-Key 14Fr specificaties, Stesolid noodschema en CIBG nood-token.',
      descEn: 'Print-ready pocket card with Mic-Key 14Fr specs, Stesolid dosage limits, and 112 emergency token.',
      badge: 'Paramedic Pass',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      targetTab: 'paramedic',
      icon: <ShieldCheck className="w-4 h-4 text-rose-400" />,
    },
  ];

  const handleLaunchScenario = (sc: (typeof scenarios)[0]) => {
    runDemoScenario(sc.id);
    onSelectTab(sc.targetTab);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border-2 border-indigo-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden" id="demo-tour-pitch-banner">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-indigo-500/30 pb-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Interactive Investor & Inspector Demo Mode</span>
            </span>
            <span className="text-xs text-slate-400">• 1-Click Guided Scenarios</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1">
            {isNl ? 'CarePulse Live Scenario Simulator' : 'CarePulse Live Scenario Simulator'}
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
            {isNl
              ? 'Klik op een van de onderstaande scenario’s om de klinische en wettelijke diepgang direct in actie te zien.'
              : 'Click any scenario below to test end-to-end clinical dispatch, regulatory defense, and inclusive voice output.'}
          </p>
        </div>

        {activeDemoScenario && (
          <button
            onClick={resetEarlyWarningPreIctalSim}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center space-x-1.5 self-start md:self-auto border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isNl ? 'Reset Demo Status' : 'Reset Demo'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((sc) => {
          const isActive = activeDemoScenario === sc.id;
          return (
            <div
              key={sc.id}
              onClick={() => handleLaunchScenario(sc)}
              className={`group p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-indigo-950/80 border-indigo-400 ring-2 ring-indigo-500/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                    {sc.icon}
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-black rounded-md uppercase tracking-wider border ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                </div>
                <h4 className="text-xs font-black text-white group-hover:text-indigo-300 transition-colors">
                  {isNl ? sc.titleNl : sc.titleEn}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {isNl ? sc.descNl : sc.descEn}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-black">
                <span className="text-indigo-400 group-hover:text-indigo-300 flex items-center space-x-1">
                  <Play className="w-3 h-3 fill-indigo-400 group-hover:fill-indigo-300" />
                  <span>{isNl ? 'Activeer Live' : 'Launch Demo'}</span>
                </span>
                {isActive && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
