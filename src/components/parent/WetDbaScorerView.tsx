import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BadgeCheck,
  Building,
  TrendingUp,
} from 'lucide-react';

export const WetDbaScorerView: React.FC = () => {
  const {
    language,
    wetDbaScorerResults,
    zorgkantoorReport,
    generateZorgkantoorReport,
    exportZorgkantoorReport,
  } = useApp();

  const isNl = language === 'nl';

  return (
    <div className="space-y-6" id="wet-dba-scorer-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                Wet DBA & Handhaving Belastingdienst 2025/2026
              </span>
              <span className="flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                <BadgeCheck className="w-3 h-3 text-teal-400" />
                <span>Safe Harbor Keurmerk</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'Wet DBA Safe Harbor Scorer & Zorgkantoor Budget-Shield' : 'Wet DBA Safe Harbor Scorer & Zorgkantoor Budget-Shield'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? `Voorkom naheffingen loonheffing en boetes voor schijnzelfstandigheid. Onze AI toetst continu de gezagsverhouding, tarieven en vervangingsclausules van alle ZZP-kinderverpleegkundigen.`
                : `Protect against retroactive payroll taxes and sham self-employment fines. Our AI continuously audits hierarchy absence, hourly rates, and substitution clauses for all ZZP nurses.`}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-export-zorgkantoor-report"
              onClick={exportZorgkantoorReport}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-black flex items-center space-x-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{isNl ? 'Download Jaarverantwoording (JSON)' : 'Download Annual Report (JSON)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wet DBA Caregiver Compliance Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wetDbaScorerResults.map((item) => (
          <div
            key={item.caregiverId}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">{item.caregiverName}</h4>
                  <p className="text-xs text-slate-400">Certificaat: #{item.safeHarborCertificateId}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  RISICOSCORE: {item.overallRiskScore}%
                </span>
                <div className="text-[10px] text-emerald-400 font-bold mt-0.5">Laag Risico (Safe Harbor)</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {item.belastingdienstVerdict}
            </p>

            {/* Factors Checklist */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNl ? 'Meerdere opdrachtgevers aantoonbaar (geen economische afhankelijkheid)' : 'Multiple verifiable clients (no economic dependency)'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNl ? 'Vrije vervangingsclausule opgenomen in Zorgovereenkomst' : 'Free substitution clause present in care contract'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNl ? 'Uurtarief > €38/uur (ruim boven minimum zzp-bodemtarief)' : 'Hourly rate > €38/hr (above Dutch self-employed floor)'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNl ? 'Afwezigheid van klassieke gezagsverhouding (resultaatverplichting)' : 'Absence of traditional employer hierarchy'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zorgkantoor Jaarverantwoording Generator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-base font-black text-white">
                {isNl ? 'Zorgkantoor PGB Wlz-Jaarverantwoording (VV-07)' : 'Zorgkantoor PGB Wlz Annual Statement (VV-07)'}
              </h3>
              <p className="text-xs text-slate-400">
                {zorgkantoorReport.zorgkantoorName} • Cliënt: {zorgkantoorReport.clientName} ({zorgkantoorReport.clientSvbNumber})
              </p>
            </div>
          </div>

          <button
            id="btn-generate-zorgkantoor-report"
            onClick={generateZorgkantoorReport}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black flex items-center space-x-2 shadow-md transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>{isNl ? 'Herbereken Jaarverantwoording' : 'Recalculate Statement'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-500">{isNl ? 'Wlz Indicatie' : 'Wlz Profile'}</div>
            <div className="text-xs font-black text-white mt-1">VV-07 Intensief</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-500">{isNl ? 'Toegekend Budget' : 'Granted Budget'}</div>
            <div className="text-sm font-black text-white mt-1">€{zorgkantoorReport.totalBudgetAllocated.toLocaleString()}</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-500">{isNl ? 'Geleverde Uren' : 'Delivered Hours'}</div>
            <div className="text-sm font-black text-emerald-400 mt-1">{zorgkantoorReport.hoursDelivered} uur</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-500">{isNl ? 'Verantwoord Surplus' : 'Reported Surplus'}</div>
            <div className="text-sm font-black text-teal-300 mt-1">€{zorgkantoorReport.remainingSurplus.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
