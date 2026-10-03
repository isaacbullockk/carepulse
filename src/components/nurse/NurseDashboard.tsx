import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Shift, Credential, BankAccount, PaymentPayout } from '../../types';
import {
  Zap,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Building2,
  CreditCard,
  ShieldCheck,
  Award,
  Upload,
  Plus,
  Trash2,
  DollarSign,
  TrendingUp,
  FileText,
  Navigation,
  Check,
  ChevronRight,
  Sparkles,
  Sliders,
  Send,
  Eye
} from 'lucide-react';
import { InvoiceModal } from '../common/InvoiceModal';
import { SbarVoiceHandoverView } from './SbarVoiceHandoverView';
import { MultiFamilyRouteDispatcher } from './MultiFamilyRouteDispatcher';
import { Mic, Bike } from 'lucide-react';

export const NurseDashboard: React.FC = () => {
  const {
    t,
    nurseProfile,
    shifts,
    applications,
    timesheets,
    payouts,
    toggleOnCallAvailability,
    updateDayAvailability,
    applyForShift,
    clockInShift,
    clockOutShift,
    updateBankAccounts,
    addNewCredential,
    activeShift,
    activeTimesheet,
    exportGdprComplianceData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'radar' | 'availability' | 'active' | 'sbar' | 'routes' | 'credentials' | 'payroll'>('radar');
  const [selectedShiftForApply, setSelectedShiftForApply] = useState<Shift | null>(null);
  const [applyNotes, setApplyNotes] = useState('');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('ALL');
  const [selectedUrgencyFilter, setSelectedUrgencyFilter] = useState<string>('ALL');
  const [activeTimesheetNotes, setActiveTimesheetNotes] = useState('');
  const [selectedInvoicePayout, setSelectedInvoicePayout] = useState<PaymentPayout | null>(null);

  // New credential form state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newCredName, setNewCredName] = useState('');
  const [newCredType, setNewCredType] = useState<Credential['type']>('SPECIALTY_CERT');
  const [newCredLicense, setNewCredLicense] = useState('');
  const [newCredIssuer, setNewCredIssuer] = useState('');

  // Bank Split Form State
  const [bankAccountsState, setBankAccountsState] = useState<BankAccount[]>(nurseProfile.bankAccounts);
  const [showAddBank, setShowAddBank] = useState(false);
  const [newBankName, setNewBankName] = useState('');
  const [newIban, setNewIban] = useState('');
  const [newAccountType, setNewAccountType] = useState<BankAccount['accountType']>('PRIMARY_CHECKING');

  useEffect(() => {
    setBankAccountsState(nurseProfile.bankAccounts);
  }, [nurseProfile.bankAccounts]);

  // Elapsed timer for active shift
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  useEffect(() => {
    let interval: any = null;
    if (activeTimesheet) {
      // Simulate 3 hours 24 mins elapsed + real timer
      setElapsedSeconds(12240);
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeTimesheet]);

  const formatSeconds = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleBankSplitChange = (index: number, newPercent: number) => {
    const updated = [...bankAccountsState];
    updated[index].splitPercentage = newPercent;
    setBankAccountsState(updated);
  };

  const saveBankAccounts = () => {
    const total = bankAccountsState.reduce((acc, curr) => acc + curr.splitPercentage, 0);
    if (total !== 100) {
      alert(`Split percentages must equal exactly 100%. Current sum: ${total}%`);
      return;
    }
    updateBankAccounts(bankAccountsState);
  };

  const handleAddBankAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBankName || !newIban) return;
    const newAcc: BankAccount = {
      id: `bank_${Date.now()}`,
      bankName: newBankName,
      iban: newIban,
      accountHolder: nurseProfile.name,
      splitPercentage: 0,
      accountType: newAccountType,
      isDefault: bankAccountsState.length === 0,
    };
    const updated = [...bankAccountsState, newAcc];
    setBankAccountsState(updated);
    updateBankAccounts(updated);
    setShowAddBank(false);
    setNewBankName('');
    setNewIban('');
  };

  const handleUploadCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCredName || !newCredLicense) return;
    addNewCredential({
      name: newCredName,
      type: newCredType,
      licenseNumber: newCredLicense,
      issuer: newCredIssuer || 'Dutch Healthcare Inspectorate',
      issuedDate: new Date().toISOString().split('T')[0],
      expiryDate: '2028-12-31',
    });
    setShowUploadModal(false);
    setNewCredName('');
    setNewCredLicense('');
    setNewCredIssuer('');
  };

  const filteredShifts = shifts.filter((shift) => {
    if (selectedDepartmentFilter !== 'ALL' && shift.facilityType !== selectedDepartmentFilter) {
      if (selectedDepartmentFilter === 'Emergency' && !shift.department.toLowerCase().includes('emergency') && !shift.department.toLowerCase().includes('icu')) {
        return false;
      } else if (selectedDepartmentFilter !== 'Emergency') {
        return false;
      }
    }
    if (selectedUrgencyFilter === 'URGENT' && shift.urgency !== 'CRITICAL_URGENT') {
      return false;
    }
    return true;
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Top Hero Banner & Availability Controller */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-700/80 shadow-xl relative overflow-hidden">
        {/* Background ambient medical grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Nurse Profile Info */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={nurseProfile.avatar}
                alt={nurseProfile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-slate-950 p-1 rounded-full border border-slate-700">
                {nurseProfile.onCallAvailableNow ? (
                  <span className="flex h-3.5 w-3.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                  </span>
                ) : (
                  <span className="inline-flex rounded-full h-3.5 w-3.5 bg-slate-500"></span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{nurseProfile.name}</h1>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.nurse.bigVerifiedBadge}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{nurseProfile.title}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-white">{nurseProfile.rating}</span> ({nurseProfile.completedShiftsCount} {t.nurse.shiftsCountLabel})
                </span>
                <span>•</span>
                <span>{t.nurse.rateLabel}: <strong className="text-emerald-400 font-bold">€{nurseProfile.hourlyRate.toFixed(2)}/hr</strong></span>
                <span>•</span>
                <span className="text-teal-300">{t.nurse.amsterdamRadius}</span>
              </div>
            </div>
          </div>

          {/* Real-Time On-Call Switch Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              id="btn-toggle-oncall"
              onClick={toggleOnCallAvailability}
              className={`px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2.5 transition-all shadow-lg ${
                nurseProfile.onCallAvailableNow
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600'
              }`}
            >
              <Zap className={`w-5 h-5 ${nurseProfile.onCallAvailableNow ? 'fill-current animate-pulse' : ''}`} />
              <span>
                {nurseProfile.onCallAvailableNow
                  ? t.nurse.onCallActive
                  : t.nurse.onCallInactive}
              </span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.nurse.augustEarnings}</span>
            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">€3,488.50</span>
            <span className="text-[10px] text-slate-400">{t.nurse.sepaAutomated}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.nurse.liveVacancyRadar}</span>
            <span className="text-lg font-bold text-amber-400 mt-0.5 block">{shifts.filter(s => s.status === 'OPEN').length} {t.nurse.shiftsOpen}</span>
            <span className="text-[10px] text-slate-400">{t.nurse.flashEmergencyBonuses}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.nurse.complianceSeal}</span>
            <span className="text-lg font-bold text-teal-400 mt-0.5 block">{t.nurse.compliant100}</span>
            <span className="text-[10px] text-slate-400">{t.nurse.credentialsActive}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.nurse.payrollRouting}</span>
            <span className="text-lg font-bold text-indigo-300 mt-0.5 block">2 {t.nurse.bankAccountsCount}</span>
            <span className="text-[10px] text-slate-400">{t.nurse.splitSummary}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto space-x-1">
        <button
          id="tab-radar"
          onClick={() => setActiveTab('radar')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'radar'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{t.nurse.urgentShiftRadarTab}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-800 font-bold ml-1">
            {shifts.filter((s) => s.status === 'OPEN').length}
          </span>
        </button>

        <button
          id="tab-availability"
          onClick={() => setActiveTab('availability')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'availability'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-500" />
          <span>{t.nurse.availabilityMatrixTab}</span>
        </button>

        <button
          id="tab-active"
          onClick={() => setActiveTab('active')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'active'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4 text-teal-500" />
          <span>{t.nurse.activeShiftTrackerTab}</span>
          {activeTimesheet && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
          )}
        </button>

        <button
          id="tab-sbar"
          onClick={() => setActiveTab('sbar')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'sbar'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Mic className="w-4 h-4 text-indigo-400" />
          <span>SBAR Spraakoverdracht</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-500/20 text-indigo-800 font-bold ml-1">
            AI Voice
          </span>
        </button>

        <button
          id="tab-routes"
          onClick={() => setActiveTab('routes')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'routes'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bike className="w-4 h-4 text-emerald-500" />
          <span>Buurt E-Bike Route</span>
        </button>

        <button
          id="tab-credentials"
          onClick={() => setActiveTab('credentials')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'credentials'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span>{t.nurse.credentialVaultTab}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold ml-1">
            {t.nurse.verifiedStatus}
          </span>
        </button>

        <button
          id="tab-payroll"
          onClick={() => setActiveTab('payroll')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'payroll'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4 text-emerald-600" />
          <span>{t.nurse.multiBankPayrollTab}</span>
        </button>
      </div>

      {/* TAB CONTENT 1: URGENT SHIFT RADAR */}
      {activeTab === 'radar' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 flex-wrap gap-y-2">
              <span className="font-bold text-slate-700">{t.nurse.filterDepartment}:</span>
              {['ALL', 'HOSPITAL', 'CARE_HOME', 'HOME_CARE_AGENCY', 'Emergency'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartmentFilter(dept)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedDepartmentFilter === dept
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept === 'ALL'
                    ? t.nurse.allFacilities
                    : dept === 'HOSPITAL'
                    ? t.nurse.hospitalsFilter
                    : dept === 'CARE_HOME'
                    ? t.nurse.careHomesFilter
                    : dept === 'HOME_CARE_AGENCY'
                    ? t.nurse.homeCareFilter
                    : dept}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedUrgencyFilter(selectedUrgencyFilter === 'URGENT' ? 'ALL' : 'URGENT')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all ${
                  selectedUrgencyFilter === 'URGENT'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{t.nurse.flashUrgentOnly}</span>
              </button>
            </div>
          </div>

          {/* Shifts Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredShifts.map((shift) => {
              const myApp = applications.find(
                (a) => a.shiftId === shift.id && a.nurseId === nurseProfile.id
              );
              const isAssignedToMe = shift.assignedNurseId === nurseProfile.id;

              return (
                <div
                  key={shift.id}
                  id={`shift-card-${shift.id}`}
                  className={`bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                    shift.urgency === 'CRITICAL_URGENT'
                      ? 'border-rose-300 ring-1 ring-rose-200 bg-gradient-to-b from-rose-50/20 to-white'
                      : 'border-slate-200'
                  }`}
                >
                  <div>
                    {/* Card Header & Urgency Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        {shift.facilityType === 'HOSPITAL' ? (
                          <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                            <Building2 className="w-4 h-4" />
                          </span>
                        ) : shift.facilityType === 'CARE_HOME' ? (
                          <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Building2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                            <Navigation className="w-4 h-4" />
                          </span>
                        )}
                        <div>
                          <p className="text-xs font-bold text-slate-800">{shift.facilityName}</p>
                          <p className="text-[11px] text-slate-500">{shift.department}</p>
                        </div>
                      </div>

                      {shift.urgency === 'CRITICAL_URGENT' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                          <Zap className="w-3 h-3 fill-rose-600" />
                          <span>{t.nurse.flashUrgentBadge}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {shift.urgency}
                        </span>
                      )}
                    </div>

                    {/* Shift Title */}
                    <h3 className="text-sm font-bold text-slate-900 mt-3.5 leading-snug">
                      {shift.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">{shift.description}</p>

                    {/* Meta Specs */}
                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{shift.date}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{shift.startTime} - {shift.endTime} ({shift.durationHours}h)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{shift.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate font-medium text-emerald-800">{t.nurse.bigAclsRequired}</span>
                      </div>
                    </div>

                    {/* Patient Acuity info */}
                    {shift.patientRatio && (
                      <div className="mt-2.5 flex items-center space-x-1.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{t.nurse.staffingRatio}:</span>
                        <span>{shift.patientRatio}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Rate & Action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.nurse.totalShiftPayout}</span>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-lg font-black text-slate-900">€{shift.totalPayout.toFixed(2)}</span>
                        <span className="text-xs text-slate-500 font-medium">(€{shift.hourlyRate}/h</span>
                        {shift.urgentBonus > 0 && (
                          <span className="text-xs text-rose-600 font-bold">+ €{shift.urgentBonus} {t.nurse.bonusLabel})</span>
                        )}
                      </div>
                    </div>

                    <div>
                      {isAssignedToMe ? (
                        <button
                          onClick={() => setActiveTab('active')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.nurse.bookedRoster}</span>
                        </button>
                      ) : myApp ? (
                        <span className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200 inline-flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{t.nurse.requestedStatus} ({myApp.status})</span>
                        </span>
                      ) : (
                        <button
                          id={`btn-apply-${shift.id}`}
                          onClick={() => setSelectedShiftForApply(shift)}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
                        >
                          <span>{t.nurse.claimShift}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: AVAILABILITY MATRIX */}
      {activeTab === 'availability' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.nurse.weeklyAvailabilityTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.nurse.weeklyAvailabilityDesc}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                {t.nurse.autoMatchActive}
              </span>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px]">
                  <th className="p-3 text-left">{t.nurse.shiftWindow}</th>
                  {daysOfWeek.map((day) => (
                    <th key={day} className="p-3">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Morning */}
                <tr>
                  <td className="p-3 text-left font-bold text-slate-800 bg-slate-50/50">
                    <div>{t.nurse.morningShift}</div>
                    <span className="text-[10px] text-slate-400 font-normal">07:00 - 15:30</span>
                  </td>
                  {daysOfWeek.map((day) => {
                    const isAvailable = nurseProfile.weeklyAvailability[day]?.morning;
                    return (
                      <td key={day} className="p-3">
                        <button
                          onClick={() => updateDayAvailability(day, 'morning', !isAvailable)}
                          className={`w-full py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                            isAvailable
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {isAvailable ? `✓ ${t.nurse.openSlot}` : '—'}
                        </button>
                      </td>
                    );
                  })}
                </tr>

                {/* Afternoon */}
                <tr>
                  <td className="p-3 text-left font-bold text-slate-800 bg-slate-50/50">
                    <div>{t.nurse.afternoonShift}</div>
                    <span className="text-[10px] text-slate-400 font-normal">15:00 - 23:00</span>
                  </td>
                  {daysOfWeek.map((day) => {
                    const isAvailable = nurseProfile.weeklyAvailability[day]?.afternoon;
                    return (
                      <td key={day} className="p-3">
                        <button
                          onClick={() => updateDayAvailability(day, 'afternoon', !isAvailable)}
                          className={`w-full py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                            isAvailable
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {isAvailable ? `✓ ${t.nurse.openSlot}` : '—'}
                        </button>
                      </td>
                    );
                  })}
                </tr>

                {/* Night */}
                <tr>
                  <td className="p-3 text-left font-bold text-slate-800 bg-slate-50/50">
                    <div>{t.nurse.criticalNightShift}</div>
                    <span className="text-[10px] text-slate-400 font-normal">22:30 - 07:30 (+ {t.nurse.bonusLabel})</span>
                  </td>
                  {daysOfWeek.map((day) => {
                    const isAvailable = nurseProfile.weeklyAvailability[day]?.night;
                    return (
                      <td key={day} className="p-3">
                        <button
                          onClick={() => updateDayAvailability(day, 'night', !isAvailable)}
                          className={`w-full py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                            isAvailable
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {isAvailable ? `✓ ${t.nurse.openSlot}` : '—'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-600">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                {t.nurse.nightShiftTip}
              </span>
            </div>
            <button
              onClick={() => {
                daysOfWeek.forEach((d) => {
                  updateDayAvailability(d, 'morning', true);
                  updateDayAvailability(d, 'afternoon', true);
                  updateDayAvailability(d, 'night', true);
                });
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
            >
              {t.nurse.selectAllOpen}
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: ACTIVE SHIFT & GEOFENCE CLOCK-IN */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {/* Active Live Session Tracker */}
          {activeTimesheet && activeShift ? (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-400 animate-spin" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">
                      {t.nurse.liveActiveShift}
                    </span>
                    <h2 className="text-xl font-black text-white">{activeShift.facilityName}</h2>
                    <p className="text-xs text-slate-400">{activeShift.department} • {activeShift.title}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">{t.nurse.elapsedShiftTime}</span>
                  <div className="text-3xl font-mono font-black text-emerald-400 tracking-wider">
                    {formatSeconds(elapsedSeconds)}
                  </div>
                </div>
              </div>

              {/* Geofence GPS Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-xs">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                    <Navigation className="w-4 h-4" />
                    <span>{t.nurse.gpsGeofencePerimeter}</span>
                  </div>
                  <p className="text-slate-300 mt-1">{t.nurse.verifiedOnSite}</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block">{t.nurse.accuracyVerified}</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <div className="flex items-center space-x-1.5 text-teal-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.nurse.clockInTime}</span>
                  </div>
                  <p className="text-slate-300 mt-1">{activeTimesheet.clockInTime} ({t.nurse.todayLabel})</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{t.nurse.scheduledEnd}: {activeShift.endTime}</span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                    <DollarSign className="w-4 h-4" />
                    <span>{t.nurse.accruingShiftValue}</span>
                  </div>
                  <p className="text-emerald-400 text-base font-bold mt-0.5">€{activeShift.totalPayout.toFixed(2)}</p>
                  <span className="text-[10px] text-slate-400">{t.nurse.automatedPayoutCheckout}</span>
                </div>
              </div>

              {/* Clock Out Action */}
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/60 space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  {t.nurse.handoverNotes}:
                </label>
                <textarea
                  rows={2}
                  value={activeTimesheetNotes}
                  onChange={(e) => setActiveTimesheetNotes(e.target.value)}
                  placeholder={t.nurse.handoverPlaceholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div className="flex justify-end">
                  <button
                    id="btn-clock-out"
                    onClick={() => clockOutShift(activeTimesheet.id, activeTimesheetNotes)}
                    className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.nurse.endShiftSubmit}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Upcoming assigned shifts waiting to clock in */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t.nurse.upcomingShifts}</h2>
              {shifts.filter((s) => s.assignedNurseId === nurseProfile.id && s.status !== 'COMPLETED').length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
                  <p className="font-semibold text-slate-700">{t.nurse.noActiveShifts}</p>
                  <p className="text-slate-400 mt-1">{t.nurse.claimUrgentTip}</p>
                </div>
              ) : (
                shifts
                  .filter((s) => s.assignedNurseId === nurseProfile.id && s.status !== 'COMPLETED')
                  .map((shift) => (
                    <div
                      key={shift.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {t.nurse.confirmedRosterBadge}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{shift.facilityName}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{shift.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {shift.date} | {shift.startTime} - {shift.endTime} • {shift.location}
                        </p>
                      </div>

                      <button
                        id={`btn-clock-in-${shift.id}`}
                        onClick={() => clockInShift(shift.id)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>{t.nurse.gpsClockIn}</span>
                      </button>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* Historical Submitted Timesheets */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">{t.nurse.completedTimesheets}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                    <th className="p-3">{t.nurse.tableDate}</th>
                    <th className="p-3">{t.nurse.tableFacility}</th>
                    <th className="p-3">{t.nurse.tableHours}</th>
                    <th className="p-3">{t.nurse.tableGrossPay}</th>
                    <th className="p-3">{t.nurse.tableSignoff}</th>
                    <th className="p-3 text-right">{t.nurse.tableStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {timesheets.map((ts) => (
                    <tr key={ts.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-800">{ts.date}</td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">{ts.facilityName}</span>
                        <p className="text-[10px] text-slate-400">Ref: {ts.id}</p>
                      </td>
                      <td className="p-3">{ts.actualHours} hrs</td>
                      <td className="p-3 font-bold text-slate-900">€{ts.grossPay.toFixed(2)}</td>
                      <td className="p-3">
                        {ts.supervisorSignature ? (
                          <div className="flex items-center space-x-1 text-emerald-700 font-medium text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{ts.supervisorSignature}</span>
                          </div>
                        ) : (
                          <span className="text-amber-600 font-medium">{t.nurse.pendingSignature}</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            ts.status === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ts.status === 'APPROVED'
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ts.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: AI SBAR VOICE HANDOVER */}
      {activeTab === 'sbar' && <SbarVoiceHandoverView />}

      {/* TAB CONTENT: MULTI-FAMILY NEIGHBORHOOD ROUTE DISPATCHER */}
      {activeTab === 'routes' && <MultiFamilyRouteDispatcher />}

      {/* TAB CONTENT 4: CREDENTIAL VAULT */}
      {activeTab === 'credentials' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-base font-bold text-slate-900">{t.nurse.credentialVaultTitle}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.nurse.credentialVaultDesc}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={exportGdprComplianceData}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.nurse.exportGdpr}</span>
                </button>

                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.nurse.uploadCert}</span>
                </button>
              </div>
            </div>

            {/* Credentials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {nurseProfile.credentials.map((cred) => (
                <div
                  key={cred.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                        <Award className="w-4 h-4" />
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          cred.status === 'VERIFIED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {cred.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-3">{cred.name}</h4>
                    <p className="text-xs font-mono text-slate-600 mt-1 font-semibold">{cred.licenseNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.nurse.issuerLabel}: {cred.issuer}</p>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                      <div>
                        <span>{t.nurse.issuedLabel}: </span>
                        <strong className="text-slate-700">{cred.issuedDate}</strong>
                      </div>
                      <div>
                        <span>{t.nurse.expiresLabel}: </span>
                        <strong className="text-slate-700">{cred.expiryDate}</strong>
                      </div>
                    </div>
                  </div>

                  {cred.verificationHash && (
                    <div className="mt-3 pt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <span className="truncate">{t.nurse.hashLabel}: {cred.verificationHash}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: MULTI-BANK PAYROLL & EARNINGS */}
      {activeTab === 'payroll' && (
        <div className="space-y-6">
          {/* Bank Split Distribution Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-base font-bold text-slate-900">{t.nurse.multiBankTitle}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.nurse.multiBankDesc}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAddBank(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.nurse.addBankAccount}</span>
                </button>
                <button
                  onClick={saveBankAccounts}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.nurse.saveSplitSettings}</span>
                </button>
              </div>
            </div>

            {/* Bank Accounts List & Percent Sliders */}
            <div className="space-y-4">
              {bankAccountsState.map((acc, index) => (
                <div
                  key={acc.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{acc.bankName}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-semibold">
                          {acc.accountType}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">{acc.iban}</p>
                      <p className="text-[11px] text-slate-400">{t.nurse.beneficiaryLabel}: {acc.accountHolder}</p>
                    </div>
                  </div>

                  {/* Percentage Controls */}
                  <div className="w-full sm:w-64 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{t.nurse.payoutAllocation}:</span>
                      <span className="text-emerald-700 font-black">{acc.splitPercentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={acc.splitPercentage}
                      onChange={(e) => handleBankSplitChange(index, parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Payouts & Invoices */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">{t.nurse.disbursedPayrollTitle}</h3>
            <div className="space-y-3">
              {payouts.map((payout) => (
                <div
                  key={payout.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {t.nurse.sepaClearedBadge}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{payout.facilityName}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{payout.shiftTitle}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Batch: {payout.sepaBatchId} • Invoice: {payout.invoiceNumber} • Date: {payout.payoutDate}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900">€{payout.totalAmount.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block">{t.nurse.instantDisbursed}</span>
                    </div>

                    <button
                      onClick={() => setSelectedInvoicePayout(payout)}
                      className="p-2 rounded-xl bg-slate-900 text-white hover:bg-emerald-600 transition-colors"
                      title={t.nurse.viewRemittance}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: APPLY FOR SHIFT */}
      {selectedShiftForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">{t.nurse.claimShiftTitle}</h3>
            <p className="text-xs text-slate-600">
              {t.nurse.applyingFor} <strong>{selectedShiftForApply.title}</strong> {t.nurse.atFacility} <strong>{selectedShiftForApply.facilityName}</strong>.
            </p>

            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.nurse.compliancePreCheckPassed}</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                {t.nurse.compliancePreCheckDesc}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.nurse.optionalNoteLabel}:
              </label>
              <textarea
                rows={3}
                value={applyNotes}
                onChange={(e) => setApplyNotes(e.target.value)}
                placeholder={t.nurse.optionalNotePlaceholder}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setSelectedShiftForApply(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                {t.common.cancel}
              </button>
              <button
                id="btn-confirm-apply"
                onClick={() => {
                  applyForShift(selectedShiftForApply.id, applyNotes);
                  setSelectedShiftForApply(null);
                  setApplyNotes('');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-emerald-600 text-white shadow-sm transition-colors"
              >
                {t.nurse.submitInstantApp}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD CREDENTIAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <form
            onSubmit={handleUploadCredential}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">{t.nurse.uploadModalTitle}</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nurse.certNameLabel}</label>
              <input
                type="text"
                required
                value={newCredName}
                onChange={(e) => setNewCredName(e.target.value)}
                placeholder="e.g., Pediatric Advanced Life Support (PALS)"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nurse.certCategoryLabel}</label>
              <select
                value={newCredType}
                onChange={(e) => setNewCredType(e.target.value as Credential['type'])}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="SPECIALTY_CERT">Specialty Certification</option>
                <option value="BLS_ACLS">BLS / ACLS Life Support</option>
                <option value="BIG_REGISTER">BIG / State Healthcare License</option>
                <option value="VOG_CRIMINAL_CHECK">VOG Healthcare Background Check</option>
                <option value="LIABILITY_INSURANCE">Professional Liability Policy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nurse.licenseNumberLabel}</label>
              <input
                type="text"
                required
                value={newCredLicense}
                onChange={(e) => setNewCredLicense(e.target.value)}
                placeholder="e.g., CERT-2026-99120"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nurse.issuingBodyLabel}</label>
              <input
                type="text"
                value={newCredIssuer}
                onChange={(e) => setNewCredIssuer(e.target.value)}
                placeholder="e.g., Dutch Resuscitation Council"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              >
                {t.nurse.verifyAndAddToVault}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: ADD BANK ACCOUNT */}
      {showAddBank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <form
            onSubmit={handleAddBankAccount}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">{t.nurse.addBankModalTitle}</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nurse.bankNameLabel}</label>
              <input
                type="text"
                required
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                placeholder="e.g., ABN AMRO / bunq"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nurse.ibanLabel}</label>
              <input
                type="text"
                required
                value={newIban}
                onChange={(e) => setNewIban(e.target.value)}
                placeholder="e.g., NL21 ABNA 0411 9928 01"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nurse.accountPurposeLabel}</label>
              <select
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value as BankAccount['accountType'])}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="PRIMARY_CHECKING">{t.nurse.purposeChecking}</option>
                <option value="TAX_SAVINGS">{t.nurse.purposeTax}</option>
                <option value="BUSINESS">{t.nurse.purposeBusiness}</option>
                <option value="PERSONAL">{t.nurse.purposeSavings}</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddBank(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-emerald-600 text-white shadow-sm"
              >
                {t.nurse.addAccountBtn}
              </button>
            </div>
          </form>
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
