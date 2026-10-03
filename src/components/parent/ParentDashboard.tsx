import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CareSlot } from '../../types';
import { DigitalShadowingView } from './DigitalShadowingView';
import { PgbForecasterView } from './PgbForecasterView';
import { NightWatchSentinelView } from './NightWatchSentinelView';
import { StandbyRetainerView } from './StandbyRetainerView';
import { RespiteCoOpView } from './RespiteCoOpView';
import { AacCommunicatorView } from './AacCommunicatorView';
import { CibgBigVaultView } from './CibgBigVaultView';
import { WetDbaScorerView } from './WetDbaScorerView';
import { EmergencyInterceptorView } from './EmergencyInterceptorView';
import { FhirHospitalGatewayView } from './FhirHospitalGatewayView';
import { ParamedicPocketCardView } from './ParamedicPocketCardView';
import { DemoTourPitchBanner } from './DemoTourPitchBanner';
import { PitchDeckModal } from '../common/PitchDeckModal';
import {
  Heart,
  Calendar,
  Building2,
  ShieldAlert,
  Users,
  FileText,
  CreditCard,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Plus,
  FileSpreadsheet,
  Download,
  Activity,
  HeartHandshake,
  UserCheck,
  Stethoscope,
  ChevronRight,
  Zap,
  Info,
  Car,
  Check,
  X,
  Sliders,
  Send,
  HelpCircle,
  Award,
  FileCheck,
  Video,
  Radio,
  TrendingUp,
  QrCode,
  Printer,
  Presentation
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const {
    t,
    language,
    childProfile,
    careSchedule,
    caregiverCircle,
    lateCallOffIncident,
    digitalShadowVideos,
    nightWatchTelemetry,
    standbyPoolCaregivers,
    respiteCoOpFamilies,
    triggerLateCallOffSimulation,
    resetLateCallOffSimulation,
    acknowledgeReplacementHandover,
    requestDirectStandbyShift,
    autoPlanWeeklyRoster,
    addCareSlot,
    approveSvbTimesheetSlot,
    exportSvbOverview,
    exportMedicalPassport,
    nurseProfile,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'planner' | 'emergency' | 'paramedic' | 'aac' | 'cibg' | 'dba' | 'interceptor' | 'fhir' | 'shadowing' | 'nightwatch' | 'forecaster' | 'standby' | 'coop' | 'circle' | 'medical' | 'svb'
  >('planner');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [showAddSlotModal, setShowAddSlotModal] = useState<boolean>(false);
  const [showProtocolModal, setShowProtocolModal] = useState<boolean>(false);
  const [showPitchDeckModal, setShowPitchDeckModal] = useState<boolean>(false);

  // New slot form state
  const [newSlotTitle, setNewSlotTitle] = useState('Afternoon Respite & Mobility');
  const [newSlotDate, setNewSlotDate] = useState('2026-03-02');
  const [newSlotTime, setNewSlotTime] = useState('14:30 - 18:30 (4h)');
  const [newSlotHours, setNewSlotHours] = useState(4);
  const [newSlotRate, setNewSlotRate] = useState(38);
  const [newSlotCaregiver, setNewSlotCaregiver] = useState(caregiverCircle[0]?.id || '');
  const [newSlotSpecialty, setNewSlotSpecialty] = useState('Pediatric Respite Care');

  const p = t.parent;
  const isNl = language === 'nl';

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const assigned = caregiverCircle.find((c) => c.id === newSlotCaregiver) || caregiverCircle[0];
    addCareSlot({
      title: newSlotTitle,
      date: newSlotDate,
      timeSlot: newSlotTime,
      durationHours: Number(newSlotHours),
      hourlyRate: Number(newSlotRate),
      totalCost: Number(newSlotHours) * Number(newSlotRate),
      assignedCaregiverId: assigned.id,
      assignedCaregiverName: assigned.name,
      assignedCaregiverAvatar: assigned.avatar,
      assignedCaregiverRole: assigned.title,
      specialtyRequired: newSlotSpecialty,
      status: 'SCHEDULED',
      svbApproved: false,
      notes: 'Scheduled via CarePulse Smart Planner for Lars.',
      handoverProtocolAcknowledged: false,
    });
    setShowAddSlotModal(false);
  };

  const filteredSchedule = selectedDay === 'All'
    ? careSchedule
    : careSchedule.filter((s) => s.date.includes(selectedDay) || s.timeSlot.toLowerCase().includes(selectedDay.toLowerCase()));

  const budgetPercent = Math.round((childProfile.pgbBudget.usedBudgetYear / childProfile.pgbBudget.totalBudgetYear) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fadeIn" id="parent-dashboard">
      {/* Interactive Investor & Inspector Demo Tour Banner */}
      <DemoTourPitchBanner onSelectTab={(tabKey) => setActiveTab(tabKey)} />

      {/* 1. Header Banner with Child Profile & PGB Quick Glance */}
      <div className="rounded-3xl bg-linear-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border border-amber-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="relative">
              <img
                src={childProfile.avatar}
                alt={childProfile.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/60 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-full text-slate-950">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {childProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {childProfile.age} {p.yearsOld}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  {p.pgbBudgetTitle}: #{childProfile.pgbBudget.svbClientNumber}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
                <span className="text-amber-300 font-semibold">{childProfile.diagnosis}</span> • {childProfile.city}, {p.primaryGuardian}: {childProfile.primaryCaregiverParent}
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {childProfile.emergencyMedicalProtocol.keyAlerts.map((alert, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{alert}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Tools: Medical Passport & SVB Export & Pitch Deck */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 lg:self-center">
            <button
              id="btn-open-pitch-deck"
              onClick={() => setShowPitchDeckModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black transition-all shadow-md"
            >
              <Presentation className="w-4 h-4 text-purple-200" />
              <span>{isNl ? '📊 Pitch Deck & Speech' : '📊 Pitch Deck & Speech'}</span>
            </button>

            <button
              id="btn-export-medical-passport"
              onClick={exportMedicalPassport}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all shadow-sm"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>{p.exportPassport}</span>
            </button>

            <button
              id="btn-export-svb-declaration"
              onClick={exportSvbOverview}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{p.exportSvb}</span>
            </button>
          </div>
        </div>

        {/* Live PGB Budget Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
              <span>{p.annualBudget}</span>
              <span className="font-semibold text-slate-200">€{childProfile.pgbBudget.totalBudgetYear.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-linear-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${budgetPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] mt-1.5 text-slate-400">
              <span>{p.usedBudget}: €{childProfile.pgbBudget.usedBudgetYear.toLocaleString()} ({budgetPercent}%)</span>
              <span className="text-emerald-400 font-medium">{p.remainingBudget}: €{childProfile.pgbBudget.remainingBudgetYear.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400">{p.activeCircleMembers}</p>
              <p className="text-lg font-bold text-white">{caregiverCircle.length} {p.certifiedCaregivers}</p>
            </div>
            <div className="flex -space-x-2">
              {caregiverCircle.slice(0, 3).map((cg) => (
                <img
                  key={cg.id}
                  src={cg.avatar}
                  alt={cg.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400">{p.upcomingHours}</p>
              <p className="text-lg font-bold text-emerald-400">
                {careSchedule.filter((s) => s.status === 'SCHEDULED' || s.status === 'REPLACEMENT_CONFIRMED').length} {p.shiftsScheduled}
              </p>
            </div>
            <Calendar className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* 2. Emergency Late Call-Off Active Banner / Fallback Trigger */}
      {lateCallOffIncident && (
        <div className="rounded-2xl bg-rose-950/90 border-2 border-rose-500 p-5 shadow-2xl animate-pulse">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-3 bg-rose-500 rounded-xl text-white shrink-0 shadow-md">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-500 text-white uppercase tracking-wider">
                    {p.emergencyFallbackActive}
                  </span>
                  <span className="text-xs text-rose-200">
                    {p.callOffReportedAt}: {lateCallOffIncident.callOffTimestamp}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {lateCallOffIncident.originalCaregiverName} {p.lateCallOffAlertTitle} — {lateCallOffIncident.slotTitle}
                </h3>
                <p className="text-xs text-rose-200 mt-0.5">
                  {p.autoReplacementEngagedSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="btn-view-fallback-hub"
                onClick={() => setActiveTab('emergency')}
                className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-lg flex items-center space-x-2"
              >
                <span>{p.trackLiveReplacement}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-reset-fallback"
                onClick={resetLateCallOffSimulation}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                title={p.resetSimulation}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {/* Planner */}
        <button
          id="tab-btn-planner"
          onClick={() => setActiveTab('planner')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'planner'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{p.tabSmartPlanner}</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-900/60 text-amber-200">
            {careSchedule.length}
          </span>
        </button>

        {/* Emergency Fallback */}
        <button
          id="tab-btn-emergency"
          onClick={() => setActiveTab('emergency')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative ${
            activeTab === 'emergency'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{p.tabEmergencyFallback}</span>
          {lateCallOffIncident && (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
          )}
        </button>

        {/* Paramedic In-Pocket Card */}
        <button
          id="tab-btn-paramedic"
          onClick={() => setActiveTab('paramedic')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'paramedic'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <QrCode className="w-4 h-4 text-rose-400" />
          <span>Paramedic Noodkaart</span>
          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Print & QR
          </span>
        </button>

        {/* Moat 1: Digital Shadowing */}
        <button
          id="tab-btn-shadowing"
          onClick={() => setActiveTab('shadowing')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'shadowing'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Video className="w-4 h-4 text-indigo-400" />
          <span>{p.tabDigitalShadowing}</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-900/60 text-indigo-200">
            {digitalShadowVideos.length}
          </span>
        </button>

        {/* Unfair Advantage Moat 1: AAC Pictogram Communicator */}
        <button
          id="tab-btn-aac"
          onClick={() => setActiveTab('aac')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'aac'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AAC Pictogrammen</span>
          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Lars Spreekt
          </span>
        </button>

        {/* Unfair Advantage Moat 2: CIBG BIG & NEN 7513 Vault */}
        <button
          id="tab-btn-cibg"
          onClick={() => setActiveTab('cibg')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'cibg'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>CIBG & NEN 7513</span>
          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            IGJ Vault
          </span>
        </button>

        {/* Unfair Advantage Moat 3: Wet DBA Safe Harbor Scorer */}
        <button
          id="tab-btn-dba"
          onClick={() => setActiveTab('dba')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'dba'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4 text-teal-400" />
          <span>Wet DBA Scorer</span>
          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Safe Harbor
          </span>
        </button>

        {/* Unfair Advantage Moat 4: 8-Min Emergency Route Interceptor */}
        <button
          id="tab-btn-interceptor"
          onClick={() => setActiveTab('interceptor')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'interceptor'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>8-Min Interceptor</span>
          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            AI Pre-Ictal
          </span>
        </button>

        {/* Unfair Advantage Moat 5: HL7 FHIR & MedMij Hospital Gateway */}
        <button
          id="tab-btn-fhir"
          onClick={() => setActiveTab('fhir')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'fhir'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-400" />
          <span>HL7® FHIR® SEH</span>
          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            MedMij / Emma
          </span>
        </button>

        {/* Moat 2: NightWatch IoT Sentinel */}
        <button
          id="tab-btn-nightwatch"
          onClick={() => setActiveTab('nightwatch')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'nightwatch'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>{p.tabNightWatch}</span>
          {nightWatchTelemetry.status === 'EPILEPTIC_ALERT_TRIGGERED' && (
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          )}
        </button>

        {/* Moat 3: PGB AI Burn-Rate & Wet DBA Forecaster */}
        <button
          id="tab-btn-forecaster"
          onClick={() => setActiveTab('forecaster')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'forecaster'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>{p.tabPgbForecaster}</span>
        </button>

        {/* Moat 4: Standby Retainers */}
        <button
          id="tab-btn-standby"
          onClick={() => setActiveTab('standby')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'standby'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{p.tabStandbyRetainer}</span>
        </button>

        {/* Moat 5: Respite Co-Ops */}
        <button
          id="tab-btn-coop"
          onClick={() => setActiveTab('coop')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'coop'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-teal-400" />
          <span>{p.tabRespiteCoOp}</span>
        </button>

        {/* Trusted Circle */}
        <button
          id="tab-btn-circle"
          onClick={() => setActiveTab('circle')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'circle'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{p.tabTrustedCircle}</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-900/60 text-indigo-200">
            {caregiverCircle.length}
          </span>
        </button>

        {/* Medical Passport */}
        <button
          id="tab-btn-medical"
          onClick={() => setActiveTab('medical')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'medical'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>{p.tabMedicalPassport}</span>
        </button>

        {/* SVB Finance */}
        <button
          id="tab-btn-svb"
          onClick={() => setActiveTab('svb')}
          className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'svb'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{p.tabSvbFinance}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SMART PLANNER & AUTO-ROSTER */}
      {/* ========================================================================= */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          {/* Smart Planner Control Bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>{p.weeklyCareRosterTitle}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300">
                  {p.pgbBudgetAligned}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {p.smartPlannerSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Auto Plan Button */}
              <button
                id="btn-auto-plan-roster"
                onClick={autoPlanWeeklyRoster}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{p.autoOptimizeRoster}</span>
              </button>

              {/* Add Care Slot */}
              <button
                id="btn-add-care-slot"
                onClick={() => setShowAddSlotModal(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>{p.addCareSlot}</span>
              </button>

              {/* Trigger Simulation SOS Button */}
              <button
                id="btn-simulate-call-off"
                onClick={() => triggerLateCallOffSimulation()}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-500/40 transition-colors"
                title={p.simulateCallOffTip}
              >
                <Zap className="w-4 h-4 text-rose-400 animate-bounce" />
                <span>{p.testLateCallOff}</span>
              </button>
            </div>
          </div>

          {/* Schedule List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Slots Main Column */}
            <div className="lg:col-span-2 space-y-4">
              {filteredSchedule.map((slot) => {
                const isLateCallOff = slot.status === 'LATE_CALL_OFF';
                const isConfirmedReplacement = slot.status === 'REPLACEMENT_CONFIRMED';
                const isCompleted = slot.status === 'COMPLETED';

                return (
                  <div
                    key={slot.id}
                    className={`rounded-2xl p-5 border transition-all relative overflow-hidden ${
                      isLateCallOff
                        ? 'bg-rose-950/40 border-rose-500/60 shadow-xl'
                        : isConfirmedReplacement
                        ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md'
                        : isCompleted
                        ? 'bg-slate-900/50 border-slate-800/80 opacity-90'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Urgency Badge Strip */}
                    {isLateCallOff && (
                      <div className="bg-rose-600 text-white text-[11px] font-bold px-3 py-1 -mt-5 -mx-5 mb-4 flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{p.lateCallOffIncidentBadge}</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-wider bg-rose-800 px-2 py-0.5 rounded">
                          {p.autoMatchingStandby}
                        </span>
                      </div>
                    )}

                    {isConfirmedReplacement && (
                      <div className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 -mt-5 -mx-5 mb-4 flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{p.fallbackConfirmedBadge} (Lisa Jansen, BSN)</span>
                        </span>
                        <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded">
                          {p.handoverReady}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left Slot Details */}
                      <div className="flex items-start space-x-3.5">
                        <img
                          src={slot.assignedCaregiverAvatar}
                          alt={slot.assignedCaregiverName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-white">
                              {slot.title}
                            </h3>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300">
                              {slot.specialtyRequired}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
                            <span className="text-slate-200 font-semibold">{slot.assignedCaregiverName}</span>
                            <span>•</span>
                            <span>{slot.assignedCaregiverRole}</span>
                          </p>
                          <div className="flex items-center space-x-3 mt-2 text-xs text-slate-300">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                              <span>{slot.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>{slot.timeSlot}</span>
                            </span>
                            <span className="font-semibold text-emerald-400">
                              €{slot.totalCost.toFixed(2)} ({slot.durationHours}h @ €{slot.hourlyRate}/h)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action buttons */}
                      <div className="flex flex-col sm:items-end gap-2 shrink-0">
                        {isLateCallOff ? (
                          <button
                            id={`btn-manage-calloff-${slot.id}`}
                            onClick={() => setActiveTab('emergency')}
                            className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>{p.resolveFallbackBtn}</span>
                          </button>
                        ) : isConfirmedReplacement ? (
                          <button
                            id={`btn-ack-handover-${slot.id}`}
                            onClick={acknowledgeReplacementHandover}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{p.confirmCaregiverArrival}</span>
                          </button>
                        ) : isCompleted ? (
                          <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{p.completedAndDeclared}</span>
                          </span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <button
                              id={`btn-approve-svb-${slot.id}`}
                              onClick={() => approveSvbTimesheetSlot(slot.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold border border-slate-700 transition-colors flex items-center space-x-1"
                              title={p.preApproveSvbTip}
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                              <span>{p.approveTimesheet}</span>
                            </button>
                            <button
                              id={`btn-test-slot-calloff-${slot.id}`}
                              onClick={() => triggerLateCallOffSimulation(slot.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors"
                              title={p.simulateCallOffForThisSlot}
                            >
                              <Zap className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Side Info Column: Daily Care Protocols & Standby Circle */}
            <div className="space-y-5">
              {/* Daily Care Checklist */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span>{p.todayDailyRoutine}</span>
                  </h3>
                  <span className="text-xs font-semibold text-emerald-400">
                    {childProfile.dailyRoutines.filter((r) => r.completed).length}/{childProfile.dailyRoutines.length} {p.done}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {childProfile.dailyRoutines.map((routine, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs transition-colors flex items-start space-x-2.5 ${
                        routine.completed
                          ? 'bg-slate-800/40 border-slate-800 text-slate-400'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                        routine.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {routine.completed ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{routine.time}</span>
                          <span className="text-[10px] text-slate-400">{routine.assignedCaregiver}</span>
                        </div>
                        <p className="mt-0.5 text-slate-300">{routine.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Standby Respite Dispatch */}
              <div className="bg-linear-to-b from-indigo-950/50 to-slate-900 border border-indigo-500/30 p-5 rounded-2xl">
                <div className="flex items-center space-x-2 mb-2 text-indigo-300">
                  <Users className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-white">{p.instantStandbyCaregivers}</h3>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  {p.standbyHelpText}
                </p>
                <div className="space-y-2">
                  {caregiverCircle.slice(0, 2).map((cg) => (
                    <div
                      key={cg.id}
                      className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={cg.avatar}
                          alt={cg.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-white">{cg.name}</p>
                          <p className="text-[10px] text-emerald-400">{cg.distanceKm} km • {cg.etaMinutes}m ETA</p>
                        </div>
                      </div>
                      <button
                        id={`btn-request-standby-${cg.id}`}
                        onClick={() => requestDirectStandbyShift(cg.id)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors"
                      >
                        {p.bookShift}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EMERGENCY FALLBACK HUB & LATE CALL-OFF ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'emergency' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Engine Header Info */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {p.emergencyFallbackEngine}
                  </span>
                  <span className="text-xs text-slate-400">
                    {p.engineSubtitle}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  {p.automatedReplacementSystem}
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                  {p.automatedReplacementDescription}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  id="btn-trigger-late-calloff-tab"
                  onClick={() => triggerLateCallOffSimulation()}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>{p.simulateLateCallOff}</span>
                </button>

                <button
                  id="btn-reset-fallback-tab"
                  onClick={resetLateCallOffSimulation}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* If Incident is Active -> Show Full 5-Step Resolution Pipeline */}
          {lateCallOffIncident ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Cols: Live Timeline & Replacement Caregiver */}
              <div className="lg:col-span-7 space-y-6">
                {/* Matched Caregiver Live Card */}
                {lateCallOffIncident.matchedCaregiver && (
                  <div className="rounded-3xl bg-linear-to-br from-emerald-950/80 via-slate-900 to-indigo-950/80 border-2 border-emerald-500 p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                          {p.liveReplacementDispatched}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-slate-950 flex items-center space-x-1">
                        <Car className="w-3.5 h-3.5" />
                        <span>{p.etaLabel}: {lateCallOffIncident.matchedCaregiver.etaMinutes} min ({lateCallOffIncident.matchedCaregiver.distanceKm} km)</span>
                      </span>
                    </div>

                    <div className="flex items-start space-x-4">
                      <img
                        src={lateCallOffIncident.matchedCaregiver.avatar}
                        alt={lateCallOffIncident.matchedCaregiver.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {lateCallOffIncident.matchedCaregiver.name}
                          </h3>
                          <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                            <Award className="w-4 h-4 fill-amber-400" />
                            <span>{lateCallOffIncident.matchedCaregiver.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-emerald-300 font-medium mt-0.5">
                          {lateCallOffIncident.matchedCaregiver.title}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {lateCallOffIncident.matchedCaregiver.specialties.map((spec, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contact & Handover Action */}
                    <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 text-xs text-slate-300">
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{lateCallOffIncident.matchedCaregiver.phone}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-teal-300">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{p.passportSynced}</span>
                        </span>
                      </div>

                      <button
                        id="btn-confirm-on-site"
                        onClick={acknowledgeReplacementHandover}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{p.confirmArrivalAndHandover}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 5-Step Resolution Timeline */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{p.incidentResolutionTimeline}</span>
                  </h3>

                  <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {lateCallOffIncident.timeline.map((step) => (
                      <div key={step.step} className="flex items-start space-x-4 relative">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                          step.completed
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {step.completed ? <Check className="w-4 h-4" /> : step.step}
                        </div>
                        <div className="flex-1 bg-slate-800/60 p-3.5 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{step.title}</span>
                            <span className="text-[11px] text-slate-400">{step.time}</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Emergency Protocol & Skill Verification */}
              <div className="lg:col-span-5 space-y-6">
                {/* Emergency Protocol Synopsis */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4 text-rose-400" />
                    <span>{p.protocolSyncedToCaregiver}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mb-4">
                    {p.protocolSyncDescription}
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200">
                      <p className="font-bold text-rose-300">{p.seizureEmergency}</p>
                      <p className="mt-1">{childProfile.emergencyMedicalProtocol.seizureActionPlan}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                      <p className="font-bold text-amber-300">{p.gTubeFeedingProtocol}</p>
                      <p className="mt-1">{childProfile.emergencyMedicalProtocol.tubeFeedingInstructions}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
                      <p className="font-bold text-white">{p.emergencyNeurologist}:</p>
                      <p className="text-slate-200 mt-0.5">{childProfile.emergencyMedicalProtocol.emergencyDoctorContact}</p>
                      <p className="text-slate-400 mt-1">{childProfile.emergencyMedicalProtocol.hospitalPreference}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Standby State when no incident is currently active */
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 text-center max-w-2xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {p.allRostersCoveredTitle}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                {p.allRostersCoveredDesc}
              </p>
              <div className="pt-2">
                <button
                  id="btn-test-simulation-hero"
                  onClick={() => triggerLateCallOffSimulation()}
                  className="px-5 py-3 rounded-xl bg-linear-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-xl inline-flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>{p.simulateLateCallOffScenario}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: PARAMEDIC IN-POCKET CARD & SPOEDPAS */}
      {/* ========================================================================= */}
      {activeTab === 'paramedic' && (
        <div className="space-y-6 animate-fadeIn">
          <ParamedicPocketCardView />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TRUSTED CAREGIVER CIRCLE */}
      {/* ========================================================================= */}
      {activeTab === 'circle' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>{p.trustedCircleTitle}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300">
                  {caregiverCircle.length} {p.verifiedNurses}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {p.trustedCircleSubtitle}
              </p>
            </div>

            <button
              id="btn-add-trusted-caregiver"
              onClick={() => autoPlanWeeklyRoster()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5"
            >
              <Users className="w-4 h-4" />
              <span>{p.inviteCaregiverToCircle}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {caregiverCircle.map((cg) => (
              <div
                key={cg.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={cg.avatar}
                        alt={cg.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white">{cg.name}</h3>
                        <p className="text-[11px] text-slate-400">{cg.title}</p>
                        <div className="flex items-center space-x-1 mt-1 text-xs text-amber-400">
                          <Award className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold">{cg.rating}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({cg.shiftsCompletedWithChild} {p.shiftsWithLars})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Familiarity score & BIG badge */}
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{p.childFamiliarity}</span>
                      <span className="font-bold text-emerald-400">{cg.familiarityScore}% ({cg.familiarityLevel})</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${cg.familiarityScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Certifications badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cg.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
                    <span>{p.pgbRate}: <strong className="text-white">€{cg.hourlyRate}/h</strong></span>
                    <span>{p.availability}: <strong className="text-emerald-400">{cg.availability}</strong></span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center space-x-2">
                  <button
                    id={`btn-request-shift-${cg.id}`}
                    onClick={() => requestDirectStandbyShift(cg.id)}
                    className="flex-1 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                  >
                    {p.requestShift}
                  </button>
                  <a
                    href={`tel:${cg.phone}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    title={p.callCaregiver}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: MEDICAL CARE PASSPORT */}
      {/* ========================================================================= */}
      {activeTab === 'medical' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-emerald-400" />
                <span>{p.medicalCarePassportTitle}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {p.medicalCarePassportSubtitle}
              </p>
            </div>

            <button
              id="btn-export-passport-tab"
              onClick={exportMedicalPassport}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{p.exportDigitalPassport}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seizure & Emergency Protocol */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{p.epilepsyEmergencyProtocol}</span>
              </h3>
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 space-y-2">
                <p className="font-bold text-white">{p.actionThreshold}:</p>
                <p>{childProfile.emergencyMedicalProtocol.seizureActionPlan}</p>
              </div>

              <div className="text-xs space-y-2 text-slate-300">
                <p><strong className="text-white">{p.prescribedRescueMed}:</strong> {childProfile.emergencyMedicalProtocol.rescueMedicationDose}</p>
                <p><strong className="text-white">{p.treatingNeurologist}:</strong> {childProfile.emergencyMedicalProtocol.emergencyDoctorContact}</p>
                <p><strong className="text-white">{p.preferredHospital}:</strong> {childProfile.emergencyMedicalProtocol.hospitalPreference}</p>
              </div>
            </div>

            {/* G-Tube & Nutrition Protocol */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>{p.gtubeNutritionProtocol}</span>
              </h3>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                <p className="font-bold text-white">{p.pumpSettingsAndFlush}:</p>
                <p>{childProfile.emergencyMedicalProtocol.tubeFeedingInstructions}</p>
              </div>

              <div className="text-xs space-y-2 text-slate-300">
                <p><strong className="text-white">{p.mobilityTransfer}:</strong> {childProfile.emergencyMedicalProtocol.mobilityTransferNotes}</p>
                <p><strong className="text-white">{p.calmingRoutines}:</strong> {childProfile.emergencyMedicalProtocol.comfortCalmingTechniques}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SVB & PGB FINANCE HUB */}
      {/* ========================================================================= */}
      {activeTab === 'svb' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <span>{p.svbPgbTrekkingsrechtTitle}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {p.svbPgbTrekkingsrechtSubtitle}
              </p>
            </div>

            <button
              id="btn-export-svb-tab"
              onClick={exportSvbOverview}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{p.exportSvbDeclarationPackage}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400">{p.annualPgbBudget}</p>
              <p className="text-2xl font-bold text-white mt-1">€{childProfile.pgbBudget.totalBudgetYear.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 mt-1">{p.svbAccountNumber}: {childProfile.pgbBudget.svbClientNumber}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400">{p.spentToDate}</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">€{childProfile.pgbBudget.usedBudgetYear.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 mt-1">{budgetPercent}% {p.ofAnnualAllowance}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400">{p.availableBudget}</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">€{childProfile.pgbBudget.remainingBudgetYear.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-300 mt-1">{p.sufficientForUpcomingMonths}</p>
            </div>
          </div>

          {/* Timesheets List */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-white mb-4">
              {p.timesheetsAndDeclarationsTitle}
            </h3>
            <div className="divide-y divide-slate-800">
              {careSchedule.map((slot) => (
                <div key={slot.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{slot.title}</span>
                      <span className="text-slate-400">({slot.date})</span>
                    </div>
                    <p className="text-slate-400 mt-0.5">
                      {slot.assignedCaregiverName} • {slot.durationHours}h @ €{slot.hourlyRate}/h
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-white text-sm">€{slot.totalCost.toFixed(2)}</span>
                    {slot.status === 'COMPLETED' ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{p.svbTransmitted}</span>
                      </span>
                    ) : (
                      <button
                        id={`btn-svb-tab-approve-${slot.id}`}
                        onClick={() => approveSvbTimesheetSlot(slot.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
                      >
                        {p.approveAndDeclare}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: DIGITAL SHADOWING & AI TWIN */}
      {/* ========================================================================= */}
      {activeTab === 'shadowing' && <DigitalShadowingView />}

      {/* ========================================================================= */}
      {/* TAB 7: NIGHTWATCH & MEDICAL IOT SENTINEL */}
      {/* ========================================================================= */}
      {activeTab === 'nightwatch' && <NightWatchSentinelView />}

      {/* ========================================================================= */}
      {/* TAB 8: PGB AI BURN-RATE FORECASTER & WET DBA CONTRACTS */}
      {/* ========================================================================= */}
      {activeTab === 'forecaster' && <PgbForecasterView />}

      {/* ========================================================================= */}
      {/* TAB 9: STANDBY RETAINER MICRO-ECONOMY */}
      {/* ========================================================================= */}
      {activeTab === 'standby' && <StandbyRetainerView />}

      {/* ========================================================================= */}
      {/* TAB 10: NEIGHBORHOOD RESPITE CO-OPS */}
      {/* ========================================================================= */}
      {activeTab === 'coop' && <RespiteCoOpView />}

      {/* ========================================================================= */}
      {/* UNFAIR ADVANTAGE 1: AAC PICTO COMMUNICATOR */}
      {/* ========================================================================= */}
      {activeTab === 'aac' && <AacCommunicatorView />}

      {/* ========================================================================= */}
      {/* UNFAIR ADVANTAGE 2: CIBG BIG & NEN 7513 VAULT */}
      {/* ========================================================================= */}
      {activeTab === 'cibg' && <CibgBigVaultView />}

      {/* ========================================================================= */}
      {/* UNFAIR ADVANTAGE 3: WET DBA SAFE HARBOR SCORER */}
      {/* ========================================================================= */}
      {activeTab === 'dba' && <WetDbaScorerView />}

      {/* ========================================================================= */}
      {/* UNFAIR ADVANTAGE 4: 8-MIN EMERGENCY ROUTE INTERCEPTOR */}
      {/* ========================================================================= */}
      {activeTab === 'interceptor' && <EmergencyInterceptorView />}

      {/* ========================================================================= */}
      {/* UNFAIR ADVANTAGE 5: HL7 FHIR & MEDMIJ HOSPITAL GATEWAY */}
      {/* ========================================================================= */}
      {activeTab === 'fhir' && <FhirHospitalGatewayView />}

      {/* MODAL: Add Care Slot */}
      {showAddSlotModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>{p.scheduleNewCareSlotTitle}</span>
              </h3>
              <button
                onClick={() => setShowAddSlotModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSlot} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">{p.slotTitleLabel}</label>
                <input
                  type="text"
                  value={newSlotTitle}
                  onChange={(e) => setNewSlotTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{p.dateLabel}</label>
                  <input
                    type="date"
                    value={newSlotDate}
                    onChange={(e) => setNewSlotDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{p.timeSlotLabel}</label>
                  <input
                    type="text"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{p.durationHoursLabel}</label>
                  <input
                    type="number"
                    value={newSlotHours}
                    onChange={(e) => setNewSlotHours(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">{p.hourlyPgbRateLabel} (€)</label>
                  <input
                    type="number"
                    value={newSlotRate}
                    onChange={(e) => setNewSlotRate(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">{p.assignCaregiverLabel}</label>
                <select
                  value={newSlotCaregiver}
                  onChange={(e) => setNewSlotCaregiver(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {caregiverCircle.map((cg) => (
                    <option key={cg.id} value={cg.id}>
                      {cg.name} — {cg.title} (€{cg.hourlyRate}/h)
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddSlotModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  {p.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                >
                  {p.confirmCareSlot}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Pitch Deck & Speech Teleprompter Modal */}
      <PitchDeckModal
        isOpen={showPitchDeckModal}
        onClose={() => setShowPitchDeckModal(false)}
      />
    </div>
  );
};
