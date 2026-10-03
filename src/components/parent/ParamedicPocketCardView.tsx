import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Printer,
  QrCode,
  ShieldAlert,
  HeartPulse,
  Pill,
  PhoneCall,
  UserCheck,
  AlertTriangle,
  FileCheck2,
  Lock,
  Download,
  Share2,
} from 'lucide-react';

export const ParamedicPocketCardView: React.FC = () => {
  const {
    language,
    paramedicPocketCard,
    printParamedicCard,
    verifyEmergencyQr,
    childProfile,
  } = useApp();

  const isNl = language === 'nl';

  return (
    <div className="space-y-6" id="paramedic-pocket-card-view">
      {/* Action Header */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/60 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden print:hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center space-x-1">
                <ShieldAlert className="w-3 h-3 text-rose-400" />
                <span>Paramedic & 112 First Responder Standard</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                WGBO & CIBG Noodpas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'Paramedic "In-Pocket" Noodkaart & QR Spoedpas' : 'Paramedic In-Pocket Emergency Card & QR Pass'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? 'Printklare fysieke pas voor in Lars zijn rolstoeltas, schooltas of jaszak. Geeft ambulanceverpleegkundigen en artsen binnen 5 seconden inzicht in de exacte reanimatierichtlijnen, Mic-Key maatvoering, Stesolid doseringen en neuroloog seinnummer.'
                : 'Print-ready high-contrast card for Lars’s wheelchair bag or jacket pocket. Gives first responders instant access to resuscitation limits, G-tube specifications, and rescue medication.'}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-simulate-paramedic-qr"
              onClick={verifyEmergencyQr}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-black flex items-center space-x-2 shadow-md transition-all"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>{isNl ? 'Scan Nood QR (Simulatie)' : 'Scan Emergency QR'}</span>
            </button>

            <button
              id="btn-print-paramedic-card"
              onClick={printParamedicCard}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white text-xs font-black flex items-center space-x-2 shadow-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{isNl ? '🖨️ Print Noodkaart (PDF)' : '🖨️ Print Emergency Card'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Printable Emergency Card (Stylized for screen and clean for print) */}
      <div className="max-w-4xl mx-auto bg-slate-900 border-2 border-rose-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 print:bg-white print:text-black print:border-black print:shadow-none">
        {/* Top Identification Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-rose-500/40 pb-4 print:border-black">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-lg print:border print:border-black">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-rose-400 print:text-red-700">
                PEDIATRISCH SPOEDMEDISCH PASPOORT • AMBULANCE PROTOCOL
              </div>
              <h3 className="text-2xl font-black text-white print:text-black mt-0.5">
                {paramedicPocketCard.patientName}
              </h3>
              <p className="text-xs text-slate-300 print:text-gray-700 font-mono">
                Geboren: {paramedicPocketCard.dateOfBirth} • Gewicht: <strong>{paramedicPocketCard.weightKg} kg</strong> • Bloedgroep: <strong>{paramedicPocketCard.bloodGroup}</strong>
              </p>
            </div>
          </div>

          {/* QR Code Visual Box */}
          <div className="p-3 bg-white rounded-2xl border-2 border-slate-700 shadow-md flex items-center space-x-3 shrink-0 print:border-black">
            <div className="w-16 h-16 bg-slate-950 flex flex-col items-center justify-center text-white rounded-lg p-1 text-center font-mono">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-black uppercase text-slate-800 font-sans">
                112 / SEH TOKEN
              </div>
              <div className="text-[10px] font-mono text-slate-600 font-bold">
                {paramedicPocketCard.cardId}
              </div>
              <div className="text-[9px] text-emerald-700 font-bold flex items-center space-x-0.5">
                <span>✓ CIBG Valide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Diagnosis & Critical Airway */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2 print:bg-gray-50 print:border-gray-300">
            <div className="text-xs font-black uppercase tracking-wider text-rose-400 print:text-red-700 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Hoofddiagnose & Risicoprofiel</span>
            </div>
            <div className="text-sm font-black text-white print:text-black">
              {paramedicPocketCard.primaryDiagnosis}
            </div>
            <ul className="text-xs space-y-1 text-slate-300 print:text-gray-800 list-disc list-inside">
              {paramedicPocketCard.secondaryConditions.map((cond, idx) => (
                <li key={idx}>{cond}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2 print:bg-gray-50 print:border-gray-300">
            <div className="text-xs font-black uppercase tracking-wider text-amber-400 print:text-amber-700 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Luchtweg & Sonde Specificatie</span>
            </div>
            <div className="text-xs space-y-1.5 text-slate-300 print:text-gray-800">
              <div><strong>G-Tube:</strong> {paramedicPocketCard.criticalAirwayProfile.gTubeSpec}</div>
              <div><strong>Uitzuigen:</strong> {paramedicPocketCard.criticalAirwayProfile.emergencySuctionVacuum}</div>
              <div><strong>Trachea:</strong> {paramedicPocketCard.criticalAirwayProfile.tracheaNote}</div>
            </div>
          </div>
        </div>

        {/* Rescue Medication Flow Chart (High Priority) */}
        <div className="p-4 bg-rose-950/40 rounded-2xl border-2 border-rose-500/40 space-y-3 print:bg-red-50 print:border-red-600">
          <div className="text-xs font-black uppercase tracking-wider text-rose-300 print:text-red-800 flex items-center space-x-1.5">
            <Pill className="w-4 h-4" />
            <span>Aanvalsmedicatie Stappenplan (Status Epilepticus Protocol)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/90 rounded-xl border border-rose-500/30 print:bg-white print:border-gray-300">
              <div className="font-black text-white print:text-black">1e Keus: {paramedicPocketCard.rescueMedicationProtocol.firstLine}</div>
              <p className="text-slate-300 print:text-gray-700 mt-1">{paramedicPocketCard.rescueMedicationProtocol.firstLineDose}</p>
            </div>

            <div className="p-3 bg-slate-950/90 rounded-xl border border-rose-500/30 print:bg-white print:border-gray-300">
              <div className="font-black text-white print:text-black">2e Keus: {paramedicPocketCard.rescueMedicationProtocol.secondLine}</div>
              <p className="text-slate-300 print:text-gray-700 mt-1">{paramedicPocketCard.rescueMedicationProtocol.secondLineDose}</p>
            </div>
          </div>
          <p className="text-[11px] text-rose-200 print:text-red-700 font-bold">
            ⚠️ Maximaal 1 dosis Stesolid toedienen alvorens direct 112 (Ambulance met spoed) te alarmeren.
          </p>
        </div>

        {/* Emergency Contacts & Treating Specialist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Contacts */}
          <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2 print:bg-gray-50 print:border-gray-300">
            <div className="text-xs font-black uppercase tracking-wider text-indigo-400 print:text-indigo-800 flex items-center space-x-1.5">
              <PhoneCall className="w-4 h-4" />
              <span>Noodcontacten (Direct Bereikbaar)</span>
            </div>
            <div className="space-y-1.5">
              {paramedicPocketCard.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white print:text-black">{contact.name}</strong>
                    <span className="text-slate-400 print:text-gray-600 block text-[10px]">{contact.role}</span>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-mono font-bold text-indigo-400 print:text-black underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Treating Hospital Neurologist */}
          <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2 print:bg-gray-50 print:border-gray-300">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-400 print:text-emerald-800 flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4" />
              <span>Behandelend Kinderneuroloog</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-black text-white print:text-black">{paramedicPocketCard.treatingPediatrician.name}</div>
              <div className="text-slate-300 print:text-gray-700">{paramedicPocketCard.treatingPediatrician.hospital}</div>
              <div className="text-emerald-400 print:text-emerald-700 font-mono font-bold mt-1">
                SEH / Sein: {paramedicPocketCard.treatingPediatrician.pagerNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Footnote */}
        <div className="pt-3 border-t border-slate-800 print:border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-slate-500 print:text-gray-500">
          <span>Laatste BIG-verificatie: {paramedicPocketCard.lastVerifiedDate}</span>
          <span className="font-mono">Hash: {paramedicPocketCard.qrCodeSignatureHash}</span>
        </div>
      </div>
    </div>
  );
};
