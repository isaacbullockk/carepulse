import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ShieldCheck,
  FileText,
  Download,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Euro,
  Scale,
  Sparkles,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

export const PgbForecasterView: React.FC = () => {
  const {
    t,
    childProfile,
    pgbForecasts,
    wetDbaContracts,
    caregiverCircle,
    generateWetDbaContract,
    exportWetDbaContract
  } = useApp();

  const p = t.parent;

  const totalProjected = pgbForecasts.reduce((acc, curr) => acc + curr.projectedSpend, 0);
  const totalBudget = childProfile.pgbBudget.totalBudgetYear;
  const projectedSurplus = totalBudget - totalProjected;

  const chartData = pgbForecasts.map((f) => ({
    name: f.monthName,
    Actual: f.actualSpend > 0 ? f.actualSpend : undefined,
    Projected: f.projectedSpend,
    Cap: f.budgetCap,
    isHoliday: f.isHolidaySeason,
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI PGB Predictive Engine & SVB Shield</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">{p.burnRateHeader}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            {p.burnRateSub}
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-emerald-950/40 px-4 py-3 rounded-2xl border border-emerald-500/30">
          <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="text-slate-400">{p.projectedYearEndBalance}</p>
            <p className="text-lg font-bold text-emerald-400">€{projectedSurplus.toLocaleString('nl-NL')}</p>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400">{p.annualBudget}</p>
          <p className="text-xl font-bold text-white mt-1">€{totalBudget.toLocaleString('nl-NL')}</p>
          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded mt-2 inline-block">
            SVB Approved
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400">Total Projected Spend (2026)</p>
          <p className="text-xl font-bold text-indigo-300 mt-1">€{totalProjected.toLocaleString('nl-NL')}</p>
          <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded mt-2 inline-block">
            {p.burnRateOnTrackBadge}
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400">Summer Respite Surge (Jul/Aug)</p>
          <p className="text-xl font-bold text-amber-400 mt-1">€9,850</p>
          <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded mt-2 inline-block">
            {p.burnRateSurgeWarning}
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400">Standard PGB Tariff Rate</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">€{childProfile.pgbBudget.hourlyRatePgb.toFixed(2)}/hr</p>
          <span className="text-[10px] text-slate-400 font-semibold bg-slate-800 px-2 py-0.5 rounded mt-2 inline-block">
            Client ID: {childProfile.pgbBudget.svbClientNumber}
          </span>
        </div>
      </div>

      {/* 3. Monthly Burn-Rate Forecast Graph */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Month-by-Month Expenditure Trajectory</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                Seasonal Term Model
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Light amber bars indicate summer & spring holiday surges where after-school care is replaced with full-day respite.
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [`€${Number(value).toLocaleString('nl-NL')}`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <ReferenceLine y={4200} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Target Avg Cap (€4,200)', fill: '#ef4444', fontSize: 10 }} />
              <Bar dataKey="Actual" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual Spend (€)" />
              <Bar dataKey="Projected" fill="#6366f1" radius={[4, 4, 0, 0]} name="Projected Spend (€)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Wet DBA & Belastingdienst Compliant Care Contracts */}
      <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">{p.contractGenHeader}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              {p.contractGenSub}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-generate-dba-contract"
              onClick={() => {
                if (caregiverCircle[0]) generateWetDbaContract(caregiverCircle[0].id);
              }}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{p.generateWetDbaContractBtn}</span>
            </button>
          </div>
        </div>

        {/* Contracts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wetDbaContracts.map((contract) => (
            <div
              key={contract.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{contract.caregiverName}</h4>
                  <p className="text-xs text-slate-400">{contract.caregiverBigNumber} • {contract.caregiverIban}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{p.wetDbaCompliantBadge}</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 bg-slate-900/60 rounded-lg p-2.5 text-[11px]">
                <div>
                  <span className="text-slate-400">Tariff:</span>
                  <p className="font-bold text-white">€{contract.hourlyRate.toFixed(2)}/hr</p>
                </div>
                <div>
                  <span className="text-slate-400">Max Weekly:</span>
                  <p className="font-bold text-white">{contract.maxHoursWeekly} hrs/wk</p>
                </div>
                <div>
                  <span className="text-slate-400">Agreement:</span>
                  <p className="font-bold text-indigo-300">Opdracht</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Validity: {contract.startDate} to {contract.endDate}
                </span>

                <button
                  id={`btn-export-contract-${contract.id}`}
                  onClick={() => exportWetDbaContract(contract.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Download Legal JSON</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
