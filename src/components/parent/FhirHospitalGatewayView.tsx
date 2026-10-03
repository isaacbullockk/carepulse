import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  FileCode2,
  Send,
  Download,
  ShieldCheck,
  CheckCircle2,
  Activity,
  HeartPulse,
  Pill,
  Lock,
  Share2,
  RefreshCw,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { FhirBundleExport } from '../../types';

export const FhirHospitalGatewayView: React.FC = () => {
  const {
    language,
    fhirBundle,
    transmitToHospitalEr,
    exportFhirDocumentBundle,
    childProfile,
    nightWatchTelemetry,
  } = useApp();

  const [selectedHospital, setSelectedHospital] = useState<FhirBundleExport['targetHospital']>(
    fhirBundle.targetHospital
  );
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  const isNl = language === 'nl';

  const hospitalOptions = [
    {
      id: 'EMMA_KINDERZIEKENHUIS_AMSTERDAM' as const,
      name: 'Emma Kinderziekenhuis (Amsterdam UMC)',
      city: 'Amsterdam',
      epicOid: '2.16.840.1.113883.2.4.3.11.60.101',
      endpoint: 'https://fhir.amsterdamumc.nl/r4/pediatric-er',
    },
    {
      id: 'WILHELMINA_KINDERZIEKENHUIS_UTRECHT' as const,
      name: 'Wilhelmina Kinderziekenhuis (UMC Utrecht / WKZ)',
      city: 'Utrecht',
      epicOid: '2.16.840.1.113883.2.4.3.11.60.202',
      endpoint: 'https://fhir.umcutrecht.nl/r4/wkz-pediatrics',
    },
    {
      id: 'SOPHIA_KINDERZIEKENHUIS_ROTTERDAM' as const,
      name: 'Erasmus MC Sophia Kinderziekenhuis',
      city: 'Rotterdam',
      epicOid: '2.16.840.1.113883.2.4.3.11.60.303',
      endpoint: 'https://fhir.erasmusmc.nl/r4/sophia-er',
    },
  ];

  const handleTransmit = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      transmitToHospitalEr(selectedHospital);
      setIsTransmitting(false);
    }, 800);
  };

  return (
    <div className="space-y-6" id="fhir-hospital-gateway-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300">
                HL7® FHIR® R4 & MedMij Afsprakenstelsel
              </span>
              <span className="flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Nictiz Gecertificeerd</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'Pediatrische Spoedoverdracht & Ziekenhuis EPD/ZIS Bridge' : 'Pediatric Emergency Transfer & Hospital EHR/FHIR Gateway'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? `Verzend bij acute ambulanceritten direct de complete klinische status, medicatie-opdrachten, Stesolid-protocollen en live NightWatch vitals naar de SEH van het academisch kinderziekenhuis.`
                : `Instantly push Lars's complete clinical record, G-tube orders, Stesolid rescue protocols, and live NightWatch telemetry directly into Academic Pediatric ER EHRs via HL7 FHIR.`}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-export-fhir-json"
              onClick={exportFhirDocumentBundle}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-black flex items-center space-x-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>{isNl ? 'Download FHIR Bundle (JSON)' : 'Download FHIR Bundle (JSON)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Hospital Selector & Dispatcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-black text-white">
                {isNl ? 'Selecteer Doelziekenhuis (Pediatrische SEH)' : 'Target Pediatric Emergency Room'}
              </h3>
              <p className="text-xs text-slate-400">
                {isNl
                  ? 'Geverifieerde TLS 1.3 / OAuth2 MedMij koppelingen met academische kindercentra'
                  : 'Verified TLS 1.3 / OAuth2 MedMij endpoints with academic pediatric trauma centers'}
              </p>
            </div>
          </div>

          <button
            id="btn-transmit-fhir"
            onClick={handleTransmit}
            disabled={isTransmitting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black flex items-center space-x-2 shadow-lg transition-all disabled:opacity-50"
          >
            {isTransmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isNl ? '🚀 Push FHIR Overdracht naar SEH' : '🚀 Push FHIR Transfer to ER'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {hospitalOptions.map((hosp) => {
            const isSelected = selectedHospital === hosp.id;
            return (
              <div
                key={hosp.id}
                onClick={() => setSelectedHospital(hosp.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black text-white">{hosp.name}</span>
                    <span className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-blue-400 border-blue-300' : 'border-slate-600'}`} />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{hosp.city} • Epic OID: {hosp.epicOid}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>HL7 FHIR R4</span>
                  <span className="text-emerald-400 font-bold">Online Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FHIR Document Bundle Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Patient & Conditions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2.5">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isNl ? 'Patiënt & Kritieke Condities' : 'Patient & Active Conditions'}
            </h4>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-500">Patiënt Resource</div>
              <div className="text-xs font-black text-white mt-0.5">{childProfile.name} (7 jr)</div>
              <div className="text-[11px] text-slate-400 font-mono">BSN: {fhirBundle.patientFhirId} • Wlz: {childProfile.wlzIndicatie}</div>
            </div>

            {fhirBundle.criticalConditions.map((cond, idx) => (
              <div key={idx} className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
                <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SNOMED-CT {cond.code}</span>
                </div>
                <p className="text-slate-300 mt-1 text-[11px]">{cond.display}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medication & Rescue Protocols */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2.5">
            <Pill className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isNl ? 'MedicationStatements & Noodmedicatie' : 'Medication Statements & Rescue'}
            </h4>
          </div>

          <div className="space-y-2">
            {fhirBundle.medicationStatements.map((med, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs ${
                  med.emergencyStesolidProtocol
                    ? 'bg-rose-950/30 border-rose-500/40'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{med.display}</span>
                  {med.emergencyStesolidProtocol && (
                    <span className="px-1.5 py-0.5 text-[9px] font-black rounded-sm bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      NOODMEDICATIE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-1">{med.dosageInstruction}</p>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Route: {med.route} • {med.code}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NightWatch Live Vitals & SHA-256 Digest */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2.5">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isNl ? 'NightWatch Live Telemetrie' : 'NightWatch Telemetry Vitals'}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500">SpO2 (Pulse-Ox)</div>
              <div className="text-base font-black text-emerald-400">{nightWatchTelemetry.spo2Percent}%</div>
            </div>
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500">Hartslag (HRV)</div>
              <div className="text-base font-black text-indigo-300">{nightWatchTelemetry.heartRateBpm} BPM</div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1 text-xs">
            <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-between">
              <span>Cryptografische FHIR Digest</span>
              <Lock className="w-3 h-3 text-emerald-400" />
            </div>
            <p className="font-mono text-[10px] text-emerald-400 truncate">{fhirBundle.sha256FhirDigest}</p>
            <div className="text-[10px] text-slate-400">Status: <strong className="text-emerald-300">{fhirBundle.transmissionStatus}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};
