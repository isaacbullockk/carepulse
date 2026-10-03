import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Search,
  Lock,
  Download,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building2,
  KeyRound,
  Fingerprint,
  RefreshCw,
} from 'lucide-react';
import { CibgBigValidation } from '../../types';

export const CibgBigVaultView: React.FC = () => {
  const {
    language,
    cibgValidations,
    nen7513AuditLogs,
    validateBigNumberLive,
    exportNen7513AuditVault,
    logNen7513Access,
  } = useApp();

  const [searchBigInput, setSearchBigInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedValidation, setSelectedValidation] = useState<CibgBigValidation | null>(
    cibgValidations[0] || null
  );

  const isNl = language === 'nl';

  const handleSearchBig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchBigInput.trim()) return;

    setIsSearching(true);
    try {
      const result = await validateBigNumberLive(searchBigInput.trim());
      setSelectedValidation(result);
      logNen7513Access(`Live CIBG Query voor BIG #${searchBigInput}`, 'DIENSTOVERDRACHT');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6" id="cibg-big-vault-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                NEN 7510 / NEN 7513 & CIBG Gateway
              </span>
              <span className="flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                <Lock className="w-3 h-3 text-indigo-400" />
                <span>IGJ Inspectie-Klaar</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {isNl ? 'Live BIG-Register & NEN 7513 Cryptografische Audit Vault' : 'Live BIG Registry & NEN 7513 Cryptographic Audit Vault'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {isNl
                ? `Directe koppeling met het officiële CIBG BIG-register (Min. VWS) en Vektis AGB-database. Elke dossierinzage wordt onveranderbaar vastgelegd met SHA-256 hash conform NEN 7513.`
                : `Direct gateway to the official Dutch CIBG BIG registry (Min. VWS) and Vektis AGB database. Every health data access is immutably logged with SHA-256 hashes per NEN 7513.`}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-export-nen7513-vault"
              onClick={exportNen7513AuditVault}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-black flex items-center space-x-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{isNl ? 'Export NEN 7513 Log (JSON)' : 'Export NEN 7513 Log (JSON)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live CIBG Lookup Tool */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Search className="w-4 h-4 text-emerald-400" />
              <span>{isNl ? 'Real-Time CIBG BIG Validatie Gateway' : 'Real-Time CIBG BIG Validation Gateway'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {isNl
                ? 'Toets direct de actieve bevoegdheid en voorbehouden handelingen van een kinderverpleegkundige.'
                : 'Directly check active authority and reserved medical competencies of any pediatric nurse.'}
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchBig} className="flex items-center space-x-2">
            <input
              type="text"
              id="input-big-search"
              value={searchBigInput}
              onChange={(e) => setSearchBigInput(e.target.value)}
              placeholder="Bijv. 8921094821 of 4901928410"
              className="px-3.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 w-48 sm:w-56"
            />
            <button
              type="submit"
              id="btn-submit-big-lookup"
              disabled={isSearching}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-all flex items-center space-x-1.5 disabled:opacity-50"
            >
              {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>{isNl ? 'Valideer' : 'Validate'}</span>
            </button>
          </form>
        </div>

        {/* Selected Validation Details */}
        {selectedValidation && (
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-black text-white">{selectedValidation.nurseName}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {selectedValidation.registrationStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedValidation.profession} • BIG #{selectedValidation.bigNumber} • AGB #{selectedValidation.agbCode}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-500">{isNl ? 'CIBG Cryptografisch Zegel' : 'CIBG API Seal'}</div>
                <div className="text-[11px] font-mono font-bold text-emerald-400 truncate max-w-[200px]">
                  {selectedValidation.cibgApiSignature}
                </div>
              </div>
            </div>

            {/* Competence & Reserved Actions Checklist */}
            <div>
              <h5 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-2">
                {isNl ? 'Bevoegd & Bekwaam Verklaring (Voorbehouden Handelingen)' : 'Certified Competencies (Reserved Medical Actions)'}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedValidation.voorbehoudenHandelingen.map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 font-medium">{act.actionName}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-sm shrink-0">
                      {act.lastCertifiedDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NEN 7513 Cryptographic Audit Vault */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Fingerprint className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-black text-white">
                {isNl ? 'NEN 7513 Cryptografische Audit Logkluis' : 'NEN 7513 Cryptographic Audit Vault'}
              </h3>
              <p className="text-xs text-slate-400">
                {isNl
                  ? 'Onveranderbare logging van alle medische dossierinzages, conform art. 9 AVG en WGBO.'
                  : 'Immutable logging of all health record views, compliant with Art. 9 GDPR and Dutch WGBO.'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            {nen7513AuditLogs.length} {isNl ? 'Vergrendelde Logs' : 'Locked Logs'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                <th className="py-2.5 px-3">Tijdstempel</th>
                <th className="py-2.5 px-3">Gebruiker & BIG</th>
                <th className="py-2.5 px-3">Doel van Inzage</th>
                <th className="py-2.5 px-3">Medisch Onderdeel</th>
                <th className="py-2.5 px-3">SHA-256 Zegel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {nen7513AuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                    {log.accessorName}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                      {log.purposeOfUse}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {log.resourceAccessed}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-emerald-400/90 truncate max-w-[140px]">
                    {log.cryptographicSha256}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
