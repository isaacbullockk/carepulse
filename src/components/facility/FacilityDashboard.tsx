import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shift, ShiftApplication } from '../../types';
import {
  Building2,
  Plus,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Award,
  ShieldCheck,
  CreditCard,
  Send,
  AlertCircle,
  FileCheck,
  DollarSign,
  UserCheck,
  Search,
  Filter,
  Navigation
} from 'lucide-react';

export const FacilityDashboard: React.FC = () => {
  const {
    t,
    shifts,
    applications,
    timesheets,
    postUrgentShift,
    approveApplication,
    denyApplication,
    approveTimesheetAndExecutePayroll,
    facilities,
  } = useApp();

  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('fac_01');
  const [activeTab, setActiveTab] = useState<'applications' | 'post_shift' | 'roster' | 'timesheets'>('applications');

  // New Shift Form State
  const [newTitle, setNewTitle] = useState('🚨 Urgent: Critical Care ICU Nurse (Night)');
  const [newDept, setNewDept] = useState('Intensive Care Unit (Level 3)');
  const [newLocation, setNewLocation] = useState('De Boelelaan 1117, Amsterdam');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStartTime, setNewStartTime] = useState('22:30');
  const [newEndTime, setNewEndTime] = useState('07:00');
  const [newDuration, setNewDuration] = useState(8.5);
  const [newHourlyRate, setNewHourlyRate] = useState(78.0);
  const [newUrgentBonus, setNewUrgentBonus] = useState(90.0);
  const [newSpecialty, setNewSpecialty] = useState('Intensive Care (ICU)');
  const [newPatientRatio, setNewPatientRatio] = useState('1:2 High Acuity');
  const [newDescription, setNewDescription] = useState(
    'Immediate coverage required for trauma surge in Intensive Care. Full ventilator and hemodynamics competence required.'
  );

  const currentFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const pendingApplications = applications.filter((a) => a.status === 'PENDING');
  const pendingTimesheets = timesheets.filter((t) => t.status === 'SUBMITTED');

  const handleCreateShift = (e: React.FormEvent) => {
    e.preventDefault();
    postUrgentShift({
      title: newTitle,
      facilityId: currentFacility.id,
      facilityName: currentFacility.name,
      facilityType: currentFacility.type,
      department: newDept,
      location: newLocation,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      durationHours: Number(newDuration),
      hourlyRate: Number(newHourlyRate),
      urgentBonus: Number(newUrgentBonus),
      totalPayout: Number(newHourlyRate) * Number(newDuration) + Number(newUrgentBonus),
      urgency: 'CRITICAL_URGENT',
      requiredSpecialty: newSpecialty,
      patientRatio: newPatientRatio,
      description: newDescription,
    });
    setActiveTab('applications');
  };

  return (
    <div className="space-y-6">
      {/* Top Facility Switcher & Broadcaster Ribbon */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {t.facility.portalBadge}
                </span>
                <span className="text-xs text-slate-400">{t.facility.idLabel}: {currentFacility.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">{currentFacility.name}</h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentFacility.location}, {currentFacility.city} • {t.facility.coordinatorLabel}: {currentFacility.contactPerson}
              </p>
            </div>
          </div>

          {/* Quick Facility Selector & Broadcast Action */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.type === 'HOSPITAL' ? '🏥' : f.type === 'CARE_HOME' ? '🏡' : '🚗'} {f.name}
                </option>
              ))}
            </select>

            <button
              id="btn-open-post-shift"
              onClick={() => setActiveTab('post_shift')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{t.facility.broadcastUrgentBtn}</span>
            </button>
          </div>
        </div>

        {/* Facility quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.facility.pendingRequests}</span>
            <span className="text-lg font-bold text-amber-400 mt-0.5 block">{pendingApplications.length} {t.facility.applicantsLabel}</span>
            <span className="text-[10px] text-slate-400">{t.facility.instantApprovalReady}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.facility.timesheetsSignoff}</span>
            <span className="text-lg font-bold text-teal-400 mt-0.5 block">{pendingTimesheets.length} {t.facility.pendingLabel}</span>
            <span className="text-[10px] text-slate-400">{t.facility.multiBankReady}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.facility.avgTimeToFill}</span>
            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">11.4 {t.facility.minutesLabel}</span>
            <span className="text-[10px] text-slate-400">{t.facility.vsTraditional}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 text-[11px] block">{t.facility.complianceRate}</span>
            <span className="text-lg font-bold text-indigo-300 mt-0.5 block">{t.facility.verified100}</span>
            <span className="text-[10px] text-slate-400">{t.facility.auditCleared}</span>
          </div>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto space-x-1">
        <button
          id="facility-tab-applications"
          onClick={() => setActiveTab('applications')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'applications'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4 text-teal-400" />
          <span>{t.facility.applicantsQueueTab}</span>
          {pendingApplications.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-teal-500/20 text-teal-800 font-bold ml-1">
              {pendingApplications.length}
            </span>
          )}
        </button>

        <button
          id="facility-tab-post"
          onClick={() => setActiveTab('post_shift')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'post_shift'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{t.facility.postBroadcastTab}</span>
        </button>

        <button
          id="facility-tab-roster"
          onClick={() => setActiveTab('roster')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'roster'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>{t.facility.liveRosterTab}</span>
        </button>

        <button
          id="facility-tab-timesheets"
          onClick={() => setActiveTab('timesheets')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === 'timesheets'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4 text-emerald-500" />
          <span>{t.facility.timesheetsTab}</span>
          {pendingTimesheets.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold ml-1">
              {pendingTimesheets.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: APPLICANTS QUEUE (INSTANT APPROVE / DENY) */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between text-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.facility.shiftClaimsTitle}</h2>
              <p className="text-slate-500 text-[11px]">
                {t.facility.shiftClaimsDesc}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
              {pendingApplications.length} {t.facility.pendingActions}
            </span>
          </div>

          {pendingApplications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-75" />
              <h3 className="text-sm font-bold text-slate-800">{t.facility.allHandledTitle}</h3>
              <p className="text-slate-400 mt-1">
                {t.facility.allHandledDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApplications.map((app) => (
                <div
                  key={app.id}
                  id={`app-card-${app.id}`}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-teal-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={app.nurseAvatar}
                      alt={app.nurseName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 shrink-0"
                    />

                    <div>
                      <div className="flex items-center space-x-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900">{app.nurseName}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {app.matchScore}% {t.facility.matchScore}
                        </span>
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[10px]">
                          <Award className="w-3 h-3 text-amber-500" />
                          <span>{app.nurseRating} ★</span>
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-teal-800 mt-0.5">{app.shiftTitle}</p>
                      <p className="text-xs text-slate-600 mt-1 italic">"{app.notes}"</p>

                      <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>BIG-89943210982 ({t.nurse.verifiedStatus})</span>
                        </span>
                        <span>•</span>
                        <span>{t.facility.appliedAt}: {app.appliedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Approve / Deny Buttons */}
                  <div className="flex items-center space-x-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      id={`btn-deny-${app.id}`}
                      onClick={() => denyApplication(app.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                    >
                      {t.facility.declineBtn}
                    </button>
                    <button
                      id={`btn-approve-${app.id}`}
                      onClick={() => approveApplication(app.id)}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm flex items-center space-x-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.facility.instantApproveBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: POST & BROADCAST URGENT SHIFT */}
      {activeTab === 'post_shift' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="pb-4 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">
                {t.facility.broadcastTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.facility.broadcastDesc}
            </p>
          </div>

          <form onSubmit={handleCreateShift} className="mt-6 space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.shiftTitleLabel}</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.departmentLabel}</label>
                <input
                  type="text"
                  required
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.shiftDateLabel}</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.startTimeLabel}</label>
                <input
                  type="time"
                  required
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.endTimeLabel}</label>
                <input
                  type="time"
                  required
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.hourlyBaseRateLabel} (€)</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={newHourlyRate}
                  onChange={(e) => setNewHourlyRate(parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.urgentBonusLabel} (€)</label>
                <input
                  type="number"
                  step="5"
                  required
                  value={newUrgentBonus}
                  onChange={(e) => setNewUrgentBonus(parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.facility.patientRatioLabel}</label>
                <input
                  type="text"
                  value={newPatientRatio}
                  onChange={(e) => setNewPatientRatio(e.target.value)}
                  placeholder="e.g. 1:2 High Acuity or 1:6 Caretaker"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{t.facility.protocolDescLabel}</label>
              <textarea
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-xs"
              />
            </div>

            {/* Calculated Total Payout Preview */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[11px] block">{t.facility.calculatedPayout}</span>
                <span className="text-xl font-bold text-emerald-400 mt-0.5 block">
                  €{(Number(newHourlyRate) * Number(newDuration) + Number(newUrgentBonus)).toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                id="btn-broadcast-shift-submit"
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t.facility.broadcastAlertSubmit}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: LIVE ON-DUTY ROSTER */}
      {activeTab === 'roster' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.facility.rosterTitle}</h2>
              <p className="text-slate-500 text-[11px]">{t.facility.rosterDesc}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold">
              {t.facility.liveRosterActive}
            </span>
          </div>

          <div className="space-y-3">
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        shift.status === 'IN_PROGRESS'
                          ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                          : shift.status === 'ASSIGNED'
                          ? 'bg-teal-100 text-teal-800'
                          : shift.status === 'COMPLETED'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {shift.status}
                    </span>
                    <span className="font-bold text-slate-800">{shift.title}</span>
                  </div>

                  <p className="text-slate-500 mt-1">
                    {shift.date} ({shift.startTime} - {shift.endTime}) • {shift.department}
                  </p>

                  <p className="text-slate-700 mt-1 font-medium">
                    {t.facility.assignedAssistant}:{' '}
                    <strong>{shift.assignedNurseName || t.facility.awaitingMatch}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 text-[11px] block">{t.facility.shiftValue}</span>
                  <span className="font-bold text-slate-900 text-sm">€{shift.totalPayout.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TIMESHEET SIGN-OFF & PAYROLL TRIGGER */}
      {activeTab === 'timesheets' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.facility.timesheetSignoffTitle}</h2>
              <p className="text-slate-500 text-[11px]">
                {t.facility.timesheetSignoffDesc}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold">
              {pendingTimesheets.length} {t.facility.waitingSignoff}
            </span>
          </div>

          {pendingTimesheets.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">{t.facility.noPendingTimesheets}</p>
              <p className="text-slate-400 mt-1">{t.facility.clockOutsAppear}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTimesheets.map((ts) => (
                <div
                  key={ts.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                        {t.facility.awaitingSignature}
                      </span>
                      <h4 className="font-bold text-slate-900">{ts.nurseName}</h4>
                    </div>

                    <p className="text-slate-600 mt-1">
                      {t.nurse.tableDate}: <strong>{ts.date}</strong> | {t.nurse.tableHours}: <strong>{ts.clockInTime} → {ts.clockOutTime}</strong> ({ts.actualHours} hrs)
                    </p>

                    <p className="text-slate-500 mt-1 italic">{t.nurse.handoverNotes}: "{ts.nurseNotes}"</p>
                  </div>

                  <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <span className="text-slate-400 text-[11px] block">{t.facility.grossRemittance}</span>
                      <span className="text-base font-black text-slate-900">€{ts.grossPay.toFixed(2)}</span>
                    </div>

                    <button
                      id={`btn-sign-timesheet-${ts.id}`}
                      onClick={() => approveTimesheetAndExecutePayroll(ts.id)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{t.facility.signExecutePayrollBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
