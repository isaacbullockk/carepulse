import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Lock,
  FileText,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Users,
  Building2,
  Download,
  Activity,
  Layers,
  Search,
  Check,
  X,
  Eye,
  Landmark,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { PaymentPayout } from '../../types';
import { InvoiceModal } from '../common/InvoiceModal';

export const AdminDashboard: React.FC = () => {
  const {
    t,
    shifts,
    timesheets,
    payouts,
    auditLogs,
    nurseProfile,
    verifyCredentialAdmin,
    exportGdprComplianceData,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'payroll' | 'compliance' | 'security'>('analytics');
  const [searchAuditTerm, setSearchAuditTerm] = useState('');
  const [selectedInvoicePayout, setSelectedInvoicePayout] = useState<PaymentPayout | null>(null);

  // Analytics datasets
  const departmentData = [
    { name: 'ICU & Trauma', shiftsFilled: 48, requested: 50, rate: 96 },
    { name: 'Geriatric & Dementia', shiftsFilled: 64, requested: 64, rate: 100 },
    { name: 'Emergency Triage', shiftsFilled: 38, requested: 40, rate: 95 },
    { name: 'Wound & Home Care', shiftsFilled: 52, requested: 52, rate: 100 },
    { name: 'Cardiology', shiftsFilled: 30, requested: 32, rate: 93.7 },
  ];

  const weeklyTrendData = [
    { week: 'W1 Aug', filled: 88, urgentCount: 22, avgRate: 67.5 },
    { week: 'W2 Aug', filled: 104, urgentCount: 31, avgRate: 69.0 },
    { week: 'W3 Aug', filled: 128, urgentCount: 42, avgRate: 71.5 },
    { week: 'W4 Aug', filled: 142, urgentCount: 46, avgRate: 72.8 },
  ];

  const responseTimeData = [
    { name: '< 10 Mins (Flash)', value: 68, color: '#10b981' },
    { name: '10-30 Mins', value: 24, color: '#0d9488' },
    { name: '30-60 Mins', value: 6, color: '#f59e0b' },
    { name: '> 1 Hour', value: 2, color: '#ef4444' },
  ];

  const filteredAuditLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchAuditTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchAuditTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchAuditTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {t.admin.adminBadge}
                </span>
                <span className="text-xs text-slate-400">{t.admin.regulatoryStandards}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">{t.admin.opsTitle}</h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.admin.opsDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-export-gdpr-admin"
              onClick={exportGdprComplianceData}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{t.admin.exportAuditBundle}</span>
            </button>
          </div>
        </div>

        {/* Global Operational KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.admin.overallFillRate}</span>
            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">98.4%</span>
            <span className="text-[10px] text-slate-400">{t.admin.fillRateSub}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.admin.urgentTimeToFill}</span>
            <span className="text-lg font-bold text-teal-400 mt-0.5 block">11.4 {t.facility.minutesLabel}</span>
            <span className="text-[10px] text-slate-400">{t.admin.timeToFillSub}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.admin.totalSettledPayroll}</span>
            <span className="text-lg font-bold text-amber-400 mt-0.5 block">€284,910</span>
            <span className="text-[10px] text-slate-400">{t.admin.settledPayrollSub}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.admin.agencyCostReduction}</span>
            <span className="text-lg font-bold text-indigo-300 mt-0.5 block">{t.admin.savedAmount}</span>
            <span className="text-[10px] text-slate-400">{t.admin.agencyCostSub}</span>
          </div>
        </div>
      </div>

      {/* Main Admin Tab Selector */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto space-x-1">
        <button
          id="admin-tab-analytics"
          onClick={() => setActiveAdminTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeAdminTab === 'analytics'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>{t.admin.analyticsTab}</span>
        </button>

        <button
          id="admin-tab-payroll"
          onClick={() => setActiveAdminTab('payroll')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeAdminTab === 'payroll'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4 text-teal-400" />
          <span>{t.admin.payrollTab}</span>
        </button>

        <button
          id="admin-tab-compliance"
          onClick={() => setActiveAdminTab('compliance')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeAdminTab === 'compliance'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>{t.admin.complianceTab}</span>
        </button>

        <button
          id="admin-tab-security"
          onClick={() => setActiveAdminTab('security')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeAdminTab === 'security'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4 text-amber-400" />
          <span>{t.admin.securityTab}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-800 font-mono ml-1">
            {auditLogs.length}
          </span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS HUB */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Staffing Fill Rate by Ward */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t.admin.fillRatesTitle}</h3>
                  <p className="text-xs text-slate-500">{t.admin.fillRatesDesc}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                  {t.admin.networkAvg}
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Bar dataKey="requested" fill="#cbd5e1" radius={[4, 4, 0, 0]} name={t.admin.requestedVacancies} />
                    <Bar dataKey="shiftsFilled" fill="#0d9488" radius={[4, 4, 0, 0]} name={t.admin.filledViaCarePulse} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Urgent Push Notification Response Latency */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t.admin.pushSpeedTitle}</h3>
                  <p className="text-xs text-slate-500">{t.admin.pushSpeedDesc}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold">
                  {t.admin.within30Mins}
                </span>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={responseTimeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {responseTimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Weekly Growth Trend */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{t.admin.weeklyGrowthTitle}</h3>
                <p className="text-xs text-slate-500">{t.admin.weeklyGrowthDesc}</p>
              </div>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFilled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="filled"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFilled)"
                    name={t.admin.completedShifts}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-BANK PAYROLL SETTLEMENT */}
      {activeAdminTab === 'payroll' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.admin.payrollEngineTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.admin.payrollEngineDesc}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1">
                <Landmark className="w-3.5 h-3.5" />
                <span>{t.admin.sepaConnected}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {payouts.map((payout) => (
              <div
                key={payout.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {t.admin.settledBadge}
                    </span>
                    <h4 className="font-bold text-slate-900">{payout.nurseName}</h4>
                    <span className="text-slate-400">({payout.facilityName})</span>
                  </div>

                  <p className="text-slate-600 font-mono text-[11px]">
                    {t.admin.batchId}: {payout.sepaBatchId} | {t.invoice.invoiceNum}: {payout.invoiceNumber}
                  </p>

                  {/* Multi-bank routing badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {payout.splitBreakdown.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium"
                      >
                        <strong>{s.bankName}</strong>: €{s.amount.toFixed(2)} ({s.percentage}%)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">{t.admin.grossPayout}</span>
                    <span className="text-base font-black text-slate-900">€{payout.totalAmount.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => setSelectedInvoicePayout(payout)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.admin.viewRemittance}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CREDENTIAL COMPLIANCE AUDIT */}
      {activeAdminTab === 'compliance' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.admin.complianceHeaderTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.admin.complianceHeaderDesc}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              {t.admin.compliance100}
            </span>
          </div>

          <div className="space-y-4">
            {nurseProfile.credentials.map((cred) => (
              <div
                key={cred.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        cred.status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {cred.status}
                    </span>
                    <h4 className="font-bold text-slate-900">{cred.name}</h4>
                  </div>

                  <p className="font-mono text-slate-600 font-semibold mt-1">
                    {t.nurse.licenseNo}: {cred.licenseNumber} | {t.nurse.issuer}: {cred.issuer}
                  </p>

                  <div className="flex items-center space-x-3 text-[11px] text-slate-500 mt-1">
                    <span>{t.nurse.validUntil}: <strong>{cred.expiryDate}</strong></span>
                    {cred.verificationHash && (
                      <span className="font-mono text-slate-400">{t.admin.seal}: {cred.verificationHash}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => verifyCredentialAdmin(cred.id, 'REJECTED')}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs"
                  >
                    {t.admin.flagRevoke}
                  </button>
                  <button
                    onClick={() => verifyCredentialAdmin(cred.id, 'VERIFIED')}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.admin.verifySeal}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: HIPAA & GDPR AUDIT TRAIL */}
      {activeAdminTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.admin.auditStreamTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.admin.auditStreamDesc}
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={t.admin.searchAuditPlaceholder}
                value={searchAuditTerm}
                onChange={(e) => setSearchAuditTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                  <th className="p-3">{t.admin.timestampCol}</th>
                  <th className="p-3">{t.admin.actorRoleCol}</th>
                  <th className="p-3">{t.admin.actionTypeCol}</th>
                  <th className="p-3">{t.admin.auditDetailsCol}</th>
                  <th className="p-3">{t.admin.cryptographicSealCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{log.userName}</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded ml-1.5">
                        {log.userRole}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-[11px] font-bold text-slate-700">{log.action}</span>
                    </td>
                    <td className="p-3 text-slate-600 leading-relaxed max-w-md">
                      {log.details}
                    </td>
                    <td className="p-3 font-mono text-[10px] text-slate-400">
                      {log.encryptedHash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: VIEW INVOICE */}
      {selectedInvoicePayout && (
        <InvoiceModal
          payout={selectedInvoicePayout}
          nurse={nurseProfile}
          onClose={() => setSelectedInvoicePayout(null)}
        />
      )}
    </div>
  );
};
