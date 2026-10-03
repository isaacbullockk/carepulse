import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  NurseProfile,
  Facility,
  Shift,
  ShiftApplication,
  Timesheet,
  PaymentPayout,
  AuditLog,
  PushNotification,
  BankAccount,
  Credential,
  ChildCareProfile,
  CaregiverCircleMember,
  CareSlot,
  LateCallOffIncident,
  DigitalShadowVideo,
  PgbForecastMonth,
  WetDbaContract,
  NightWatchTelemetry,
  StandbyPoolCaregiver,
  RespiteCoOpFamily,
  CibgBigValidation,
  Nen7513AuditEntry,
  AacPictoSymbol,
  ChildDayTimelineEntry,
  WetDbaScorerResult,
  ZorgkantoorReport,
  EmergencyRouteInterceptor,
  EarlyWarningSeizurePrediction,
  FhirBundleExport,
  DemoScenarioMode,
  SbarHandoverReport,
  MultiFamilyRoutePlan,
  NeighborhoodCareStop,
  ParamedicPocketCard,
} from '../types';
import {
  initialNurseProfile,
  initialFacilities,
  initialShifts,
  initialApplications,
  initialTimesheets,
  initialPayouts,
  initialAuditLogs,
  initialNotifications,
  initialChildProfile,
  initialCaregiverCircle,
  initialCareSchedule,
  initialLateCallOffIncident,
  initialDigitalShadowVideos,
  initialPgbForecasts,
  initialWetDbaContracts,
  initialNightWatchTelemetry,
  initialStandbyPoolCaregivers,
  initialRespiteCoOpFamilies,
  initialCibgValidations,
  initialNen7513AuditLogs,
  initialAacPictoSymbols,
  initialChildDayTimeline,
  initialWetDbaScorerResults,
  initialZorgkantoorReport,
  initialEmergencyInterceptors,
  initialEarlyWarningSeizurePrediction,
  initialFhirBundleExport,
  initialSbarHandoverReports,
  initialMultiFamilyRoutePlan,
  initialParamedicPocketCard,
} from '../data/mockData';
import { Language, Translations, translations } from '../i18n/translations';
import confetti from 'canvas-confetti';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  nurseProfile: NurseProfile;
  facilities: Facility[];
  shifts: Shift[];
  applications: ShiftApplication[];
  timesheets: Timesheet[];
  payouts: PaymentPayout[];
  auditLogs: AuditLog[];
  notifications: PushNotification[];
  activeShift: Shift | null;
  activeTimesheet: Timesheet | null;
  isSimulatingDevice: boolean;
  toastAlert: PushNotification | null;
  childProfile: ChildCareProfile;
  careSchedule: CareSlot[];
  caregiverCircle: CaregiverCircleMember[];
  lateCallOffIncident: LateCallOffIncident | null;
  digitalShadowVideos: DigitalShadowVideo[];
  pgbForecasts: PgbForecastMonth[];
  wetDbaContracts: WetDbaContract[];
  nightWatchTelemetry: NightWatchTelemetry;
  standbyPoolCaregivers: StandbyPoolCaregiver[];
  respiteCoOpFamilies: RespiteCoOpFamily[];
  cibgValidations: CibgBigValidation[];
  nen7513AuditLogs: Nen7513AuditEntry[];
  aacPictoSymbols: AacPictoSymbol[];
  childDayTimeline: ChildDayTimelineEntry[];
  wetDbaScorerResults: WetDbaScorerResult[];
  zorgkantoorReport: ZorgkantoorReport;
  emergencyInterceptors: EmergencyRouteInterceptor[];
  earlyWarningSeizurePrediction: EarlyWarningSeizurePrediction;
  fhirBundle: FhirBundleExport;
  activeDemoScenario: DemoScenarioMode | null;
  sbarReports: SbarHandoverReport[];
  multiFamilyRoutePlan: MultiFamilyRoutePlan;
  paramedicPocketCard: ParamedicPocketCard;
  runDemoScenario: (mode: DemoScenarioMode) => void;
  exportFhirDocumentBundle: () => void;
  transmitToHospitalEr: (hospital: FhirBundleExport['targetHospital']) => void;
  addSbarHandoverReport: (report: Omit<SbarHandoverReport, 'id' | 'timestamp'>) => void;
  updateCareStopStatus: (stopId: string, status: NeighborhoodCareStop['status']) => void;
  optimizeRouteWithAi: () => void;
  printParamedicCard: () => void;
  verifyEmergencyQr: () => void;
  dismissToast: () => void;
  toggleSimulatingDevice: () => void;
  toggleOnCallAvailability: () => void;
  updateDayAvailability: (day: string, slot: 'morning' | 'afternoon' | 'night', value: boolean) => void;
  applyForShift: (shiftId: string, customNotes?: string) => void;
  postUrgentShift: (shiftData: Partial<Shift>) => void;
  approveApplication: (applicationId: string) => void;
  denyApplication: (applicationId: string) => void;
  clockInShift: (shiftId: string) => void;
  clockOutShift: (timesheetId: string, notes: string) => void;
  approveTimesheetAndExecutePayroll: (timesheetId: string) => void;
  updateBankAccounts: (accounts: BankAccount[]) => void;
  verifyCredentialAdmin: (credentialId: string, status: 'VERIFIED' | 'REJECTED') => void;
  addNewCredential: (cred: Omit<Credential, 'id' | 'verificationHash' | 'status'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  exportGdprComplianceData: () => void;
  logAuditEvent: (action: string, category: AuditLog['category'], details: string) => void;
  triggerEmergencyAlertSimulation: () => void;
  triggerLateCallOffSimulation: (slotId?: string) => void;
  resetLateCallOffSimulation: () => void;
  acknowledgeReplacementHandover: () => void;
  requestDirectStandbyShift: (caregiverId: string) => void;
  autoPlanWeeklyRoster: () => void;
  addCareSlot: (slot: Omit<CareSlot, 'id'>) => void;
  approveSvbTimesheetSlot: (slotId: string) => void;
  exportSvbOverview: () => void;
  exportMedicalPassport: () => void;
  verifyDigitalShadowVideoQuiz: (videoId: string) => void;
  generateWetDbaContract: (caregiverId: string) => void;
  exportWetDbaContract: (contractId: string) => void;
  triggerEpilepsyAlarmSim: () => void;
  resetNightWatchTelemetry: () => void;
  toggleStandbyRetainer: (caregiverId: string) => void;
  proposeRespiteCoOp: (familyId: string) => void;
  validateBigNumberLive: (bigNum: string) => Promise<CibgBigValidation>;
  logNen7513Access: (resource: string, purpose: Nen7513AuditEntry['purposeOfUse']) => void;
  exportNen7513AuditVault: () => void;
  toggleTimelineItem: (id: string) => void;
  playPictoVoice: (picto: AacPictoSymbol) => void;
  generateZorgkantoorReport: () => void;
  exportZorgkantoorReport: () => void;
  dispatchEmergencyInterceptor: (id: string) => void;
  triggerEarlyWarningPreIctalSim: () => void;
  resetEarlyWarningPreIctalSim: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('carepulse_language');
    return (saved === 'nl' || saved === 'en') ? saved : 'en';
  });
  const [currentRole, setCurrentRole] = useState<Role>('nurse');
  const [isSimulatingDevice, setIsSimulatingDevice] = useState<boolean>(false);
  const [nurseProfile, setNurseProfile] = useState<NurseProfile>(() => {
    const saved = localStorage.getItem('carepulse_nurse_profile');
    return saved ? JSON.parse(saved) : initialNurseProfile;
  });
  const [facilities] = useState<Facility[]>(initialFacilities);
  const [shifts, setShifts] = useState<Shift[]>(() => {
    const saved = localStorage.getItem('carepulse_shifts');
    return saved ? JSON.parse(saved) : initialShifts;
  });
  const [applications, setApplications] = useState<ShiftApplication[]>(() => {
    const saved = localStorage.getItem('carepulse_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });
  const [timesheets, setTimesheets] = useState<Timesheet[]>(() => {
    const saved = localStorage.getItem('carepulse_timesheets');
    return saved ? JSON.parse(saved) : initialTimesheets;
  });
  const [payouts, setPayouts] = useState<PaymentPayout[]>(() => {
    const saved = localStorage.getItem('carepulse_payouts');
    return saved ? JSON.parse(saved) : initialPayouts;
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('carepulse_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });
  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    const saved = localStorage.getItem('carepulse_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Parent & Family Care States
  const [childProfile, setChildProfile] = useState<ChildCareProfile>(() => {
    const saved = localStorage.getItem('carepulse_child_profile');
    return saved ? JSON.parse(saved) : initialChildProfile;
  });
  const [careSchedule, setCareSchedule] = useState<CareSlot[]>(() => {
    const saved = localStorage.getItem('carepulse_care_schedule');
    return saved ? JSON.parse(saved) : initialCareSchedule;
  });
  const [caregiverCircle, setCaregiverCircle] = useState<CaregiverCircleMember[]>(() => {
    const saved = localStorage.getItem('carepulse_caregiver_circle');
    return saved ? JSON.parse(saved) : initialCaregiverCircle;
  });
  const [lateCallOffIncident, setLateCallOffIncident] = useState<LateCallOffIncident | null>(() => {
    const saved = localStorage.getItem('carepulse_calloff_incident');
    return saved ? JSON.parse(saved) : initialLateCallOffIncident;
  });

  // Unique Moat States
  const [digitalShadowVideos, setDigitalShadowVideos] = useState<DigitalShadowVideo[]>(() => {
    const saved = localStorage.getItem('carepulse_shadow_videos');
    return saved ? JSON.parse(saved) : initialDigitalShadowVideos;
  });
  const [pgbForecasts] = useState<PgbForecastMonth[]>(initialPgbForecasts);
  const [wetDbaContracts, setWetDbaContracts] = useState<WetDbaContract[]>(() => {
    const saved = localStorage.getItem('carepulse_wet_dba_contracts');
    return saved ? JSON.parse(saved) : initialWetDbaContracts;
  });
  const [nightWatchTelemetry, setNightWatchTelemetry] = useState<NightWatchTelemetry>(() => {
    const saved = localStorage.getItem('carepulse_nightwatch_telemetry');
    return saved ? JSON.parse(saved) : initialNightWatchTelemetry;
  });
  const [standbyPoolCaregivers, setStandbyPoolCaregivers] = useState<StandbyPoolCaregiver[]>(() => {
    const saved = localStorage.getItem('carepulse_standby_pool');
    return saved ? JSON.parse(saved) : initialStandbyPoolCaregivers;
  });
  const [respiteCoOpFamilies, setRespiteCoOpFamilies] = useState<RespiteCoOpFamily[]>(() => {
    const saved = localStorage.getItem('carepulse_respite_coops');
    return saved ? JSON.parse(saved) : initialRespiteCoOpFamilies;
  });
  const [cibgValidations, setCibgValidations] = useState<CibgBigValidation[]>(() => {
    const saved = localStorage.getItem('carepulse_cibg_validations');
    return saved ? JSON.parse(saved) : initialCibgValidations;
  });
  const [nen7513AuditLogs, setNen7513AuditLogs] = useState<Nen7513AuditEntry[]>(() => {
    const saved = localStorage.getItem('carepulse_nen7513_logs');
    return saved ? JSON.parse(saved) : initialNen7513AuditLogs;
  });
  const [aacPictoSymbols] = useState<AacPictoSymbol[]>(initialAacPictoSymbols);
  const [childDayTimeline, setChildDayTimeline] = useState<ChildDayTimelineEntry[]>(() => {
    const saved = localStorage.getItem('carepulse_child_timeline');
    return saved ? JSON.parse(saved) : initialChildDayTimeline;
  });
  const [wetDbaScorerResults, setWetDbaScorerResults] = useState<WetDbaScorerResult[]>(() => {
    const saved = localStorage.getItem('carepulse_dba_scorer_results');
    return saved ? JSON.parse(saved) : initialWetDbaScorerResults;
  });
  const [zorgkantoorReport, setZorgkantoorReport] = useState<ZorgkantoorReport>(initialZorgkantoorReport);
  const [emergencyInterceptors, setEmergencyInterceptors] = useState<EmergencyRouteInterceptor[]>(() => {
    const saved = localStorage.getItem('carepulse_emergency_interceptors');
    return saved ? JSON.parse(saved) : initialEmergencyInterceptors;
  });
  const [earlyWarningSeizurePrediction, setEarlyWarningSeizurePrediction] = useState<EarlyWarningSeizurePrediction>(initialEarlyWarningSeizurePrediction);
  const [fhirBundle, setFhirBundle] = useState<FhirBundleExport>(initialFhirBundleExport);
  const [activeDemoScenario, setActiveDemoScenario] = useState<DemoScenarioMode | null>(null);
  const [sbarReports, setSbarReports] = useState<SbarHandoverReport[]>(() => {
    const saved = localStorage.getItem('carepulse_sbar_reports');
    return saved ? JSON.parse(saved) : initialSbarHandoverReports;
  });
  const [multiFamilyRoutePlan, setMultiFamilyRoutePlan] = useState<MultiFamilyRoutePlan>(() => {
    const saved = localStorage.getItem('carepulse_route_plan');
    return saved ? JSON.parse(saved) : initialMultiFamilyRoutePlan;
  });
  const [paramedicPocketCard, setParamedicPocketCard] = useState<ParamedicPocketCard>(initialParamedicPocketCard);

  const [toastAlert, setToastAlert] = useState<PushNotification | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('carepulse_language', language);
  }, [language]);
  useEffect(() => {
    localStorage.setItem('carepulse_nurse_profile', JSON.stringify(nurseProfile));
  }, [nurseProfile]);
  useEffect(() => {
    localStorage.setItem('carepulse_shifts', JSON.stringify(shifts));
  }, [shifts]);
  useEffect(() => {
    localStorage.setItem('carepulse_applications', JSON.stringify(applications));
  }, [applications]);
  useEffect(() => {
    localStorage.setItem('carepulse_timesheets', JSON.stringify(timesheets));
  }, [timesheets]);
  useEffect(() => {
    localStorage.setItem('carepulse_payouts', JSON.stringify(payouts));
  }, [payouts]);
  useEffect(() => {
    localStorage.setItem('carepulse_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);
  useEffect(() => {
    localStorage.setItem('carepulse_notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('carepulse_child_profile', JSON.stringify(childProfile));
  }, [childProfile]);
  useEffect(() => {
    localStorage.setItem('carepulse_care_schedule', JSON.stringify(careSchedule));
  }, [careSchedule]);
  useEffect(() => {
    localStorage.setItem('carepulse_caregiver_circle', JSON.stringify(caregiverCircle));
  }, [caregiverCircle]);
  useEffect(() => {
    if (lateCallOffIncident) {
      localStorage.setItem('carepulse_calloff_incident', JSON.stringify(lateCallOffIncident));
    } else {
      localStorage.removeItem('carepulse_calloff_incident');
    }
  }, [lateCallOffIncident]);
  useEffect(() => {
    localStorage.setItem('carepulse_shadow_videos', JSON.stringify(digitalShadowVideos));
  }, [digitalShadowVideos]);
  useEffect(() => {
    localStorage.setItem('carepulse_wet_dba_contracts', JSON.stringify(wetDbaContracts));
  }, [wetDbaContracts]);
  useEffect(() => {
    localStorage.setItem('carepulse_nightwatch_telemetry', JSON.stringify(nightWatchTelemetry));
  }, [nightWatchTelemetry]);
  useEffect(() => {
    localStorage.setItem('carepulse_standby_pool', JSON.stringify(standbyPoolCaregivers));
  }, [standbyPoolCaregivers]);
  useEffect(() => {
    localStorage.setItem('carepulse_respite_coops', JSON.stringify(respiteCoOpFamilies));
  }, [respiteCoOpFamilies]);

  const activeTimesheet = timesheets.find((t) => t.status === 'CLOCKED_IN') || null;
  const activeShift = activeTimesheet
    ? shifts.find((s) => s.id === activeTimesheet.shiftId) || null
    : null;

  const logAuditEvent = (action: string, category: AuditLog['category'], details: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      userId: currentRole === 'nurse' ? nurseProfile.id : currentRole === 'facility' ? 'facility_coord' : 'admin_sec',
      userName: currentRole === 'nurse' ? nurseProfile.name : currentRole === 'facility' ? 'Facility Shift Coordinator' : 'Chief Compliance Admin',
      userRole: currentRole,
      action,
      category,
      details,
      ipAddress: '145.109.81.201 (Encrypted Proxy)',
      encryptedHash: `sha256:${Math.random().toString(36).substring(2, 10)}${Date.now().toString(16)}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const showPushNotification = (notif: Omit<PushNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: PushNotification = {
      ...notif,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setToastAlert(newNotif);

    // Play subtle chime if possible
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const dismissToast = () => {
    setToastAlert(null);
  };

  const toggleSimulatingDevice = () => {
    setIsSimulatingDevice((prev) => !prev);
  };

  const toggleOnCallAvailability = () => {
    const nextState = !nurseProfile.onCallAvailableNow;
    setNurseProfile((prev) => ({
      ...prev,
      onCallAvailableNow: nextState,
    }));
    logAuditEvent(
      nextState ? 'NURSE_ON_CALL_ENABLED' : 'NURSE_ON_CALL_DISABLED',
      'SHIFT_DISPATCH',
      `Nurse ${nurseProfile.name} switched live on-call status to: ${nextState ? 'ONLINE & DISPATCHABLE' : 'OFFLINE'}`
    );
    showPushNotification({
      title: nextState ? '🟢 Live On-Call Mode Activated' : '⚪ On-Call Mode Paused',
      message: nextState
        ? 'You will receive instant push notifications for emergency hospital vacancies in your radius.'
        : 'Emergency instant notifications paused.',
      type: 'URGENT_SHIFT',
    });
  };

  const updateDayAvailability = (day: string, slot: 'morning' | 'afternoon' | 'night', value: boolean) => {
    setNurseProfile((prev) => ({
      ...prev,
      weeklyAvailability: {
        ...prev.weeklyAvailability,
        [day]: {
          ...prev.weeklyAvailability[day],
          [slot]: value,
        },
      },
    }));
  };

  const applyForShift = (shiftId: string, customNotes?: string) => {
    const targetShift = shifts.find((s) => s.id === shiftId);
    if (!targetShift) return;

    // Check if already applied
    const existing = applications.find((a) => a.shiftId === shiftId && a.nurseId === nurseProfile.id);
    if (existing) {
      alert('You have already submitted an application for this shift.');
      return;
    }

    const newApp: ShiftApplication = {
      id: `app_${Date.now()}`,
      shiftId: targetShift.id,
      shiftTitle: targetShift.title,
      facilityName: targetShift.facilityName,
      nurseId: nurseProfile.id,
      nurseName: nurseProfile.name,
      nurseAvatar: nurseProfile.avatar,
      nurseSpecialties: nurseProfile.specialties,
      nurseRating: nurseProfile.rating,
      appliedAt: 'Just now',
      status: 'PENDING',
      matchScore: 99,
      credentialsVerified: nurseProfile.complianceStatus === 'FULLY_COMPLIANT',
      notes: customNotes || 'Instant application via CarePulse on-demand dispatch.',
    };

    setApplications((prev) => [newApp, ...prev]);
    setShifts((prev) =>
      prev.map((s) => (s.id === shiftId ? { ...s, applicantsCount: s.applicantsCount + 1 } : s))
    );

    logAuditEvent(
      'SHIFT_APPLICATION_SUBMITTED',
      'SHIFT_DISPATCH',
      `Nurse ${nurseProfile.name} applied for shift "${targetShift.title}" at ${targetShift.facilityName}. Verified compliance match: 99%`
    );

    showPushNotification({
      title: '✅ Shift Request Transmitted',
      message: `Your application for "${targetShift.title}" was delivered to ${targetShift.facilityName}. Facility coordinator notified for instant review.`,
      type: 'URGENT_SHIFT',
      shiftId: targetShift.id,
    });
  };

  const postUrgentShift = (shiftData: Partial<Shift>) => {
    const newShift: Shift = {
      id: `shift_${Date.now()}`,
      title: shiftData.title || '🚨 Urgent Vacancy: Registered Nurse',
      facilityId: shiftData.facilityId || 'fac_01',
      facilityName: shiftData.facilityName || 'Amsterdam University Medical Center (UMC)',
      facilityType: shiftData.facilityType || 'HOSPITAL',
      department: shiftData.department || 'General Ward',
      location: shiftData.location || 'Amsterdam, Netherlands',
      date: shiftData.date || new Date().toISOString().split('T')[0],
      startTime: shiftData.startTime || '07:30',
      endTime: shiftData.endTime || '16:00',
      durationHours: shiftData.durationHours || 8.5,
      hourlyRate: shiftData.hourlyRate || 72.0,
      urgentBonus: shiftData.urgentBonus || 60.0,
      totalPayout: shiftData.totalPayout || ((shiftData.hourlyRate || 72) * (shiftData.durationHours || 8.5) + (shiftData.urgentBonus || 60)),
      urgency: shiftData.urgency || 'CRITICAL_URGENT',
      requiredSpecialty: shiftData.requiredSpecialty || 'Intensive Care (ICU)',
      requiredCredentials: shiftData.requiredCredentials || ['BIG_REGISTER', 'BLS_ACLS', 'VOG_CRIMINAL_CHECK'],
      patientRatio: shiftData.patientRatio || '1:3 High Acuity',
      description: shiftData.description || 'Immediate emergency staffing needed to cover urgent hospital vacancy.',
      dressCode: shiftData.dressCode || 'Standard Sterile Medical Scrubs',
      status: 'OPEN',
      applicantsCount: 0,
      postedAt: 'Just now',
    };

    setShifts((prev) => [newShift, ...prev]);

    logAuditEvent(
      'URGENT_SHIFT_POSTED_AND_BROADCAST',
      'SHIFT_DISPATCH',
      `Facility posted urgent shift "${newShift.title}" with instant push broadcast to all qualified on-call medical assistants.`
    );

    showPushNotification({
      title: '🚨 Emergency Push Broadcast Sent',
      message: `Broadcasting "${newShift.title}" (€${newShift.totalPayout.toFixed(2)}) to 24 matching certified nurses within 20km.`,
      type: 'URGENT_SHIFT',
      shiftId: newShift.id,
    });
  };

  const approveApplication = (applicationId: string) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'APPROVED' } : a))
    );

    setShifts((prev) =>
      prev.map((s) =>
        s.id === app.shiftId
          ? {
              ...s,
              status: 'ASSIGNED',
              assignedNurseId: app.nurseId,
              assignedNurseName: app.nurseName,
            }
          : s
      )
    );

    logAuditEvent(
      'SHIFT_APPLICATION_APPROVED',
      'SHIFT_DISPATCH',
      `Facility Coordinator approved nurse ${app.nurseName} for shift "${app.shiftTitle}". Digital credential verification passed.`
    );

    try {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }

    showPushNotification({
      title: '🎉 Shift Approved & Confirmed!',
      message: `You are booked for "${app.shiftTitle}" at ${app.facilityName}. Roster updated. Live check-in will unlock at start time.`,
      type: 'APPLICATION_APPROVED',
      shiftId: app.shiftId,
    });
  };

  const denyApplication = (applicationId: string) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'DENIED' } : a))
    );

    logAuditEvent(
      'SHIFT_APPLICATION_DENIED',
      'SHIFT_DISPATCH',
      `Facility Coordinator declined application #${applicationId} for shift "${app.shiftTitle}".`
    );

    showPushNotification({
      title: 'Shift Request Update',
      message: `Application for "${app.shiftTitle}" was not accepted. Other vacancies are available on the radar.`,
      type: 'APPLICATION_DENIED',
    });
  };

  const clockInShift = (shiftId: string) => {
    const targetShift = shifts.find((s) => s.id === shiftId);
    if (!targetShift) return;

    const nowTime = new Date().toTimeString().substring(0, 5);
    const newTimesheet: Timesheet = {
      id: `ts_${Date.now()}`,
      shiftId: targetShift.id,
      nurseId: nurseProfile.id,
      nurseName: nurseProfile.name,
      facilityName: targetShift.facilityName,
      date: new Date().toISOString().split('T')[0],
      clockInTime: nowTime,
      actualHours: targetShift.durationHours,
      breakMinutes: 30,
      hourlyRate: targetShift.hourlyRate,
      grossPay: targetShift.totalPayout,
      status: 'CLOCKED_IN',
      nurseNotes: 'Checked in on-site via Geofence GPS verification (Location Accuracy: 4.2m).',
    };

    setTimesheets((prev) => [newTimesheet, ...prev]);
    setShifts((prev) =>
      prev.map((s) => (s.id === shiftId ? { ...s, status: 'IN_PROGRESS' } : s))
    );

    logAuditEvent(
      'NURSE_GPS_CLOCK_IN',
      'SECURITY',
      `Nurse ${nurseProfile.name} clocked in at ${targetShift.facilityName} (${nowTime}). GPS Geofence matched facility perimeter.`
    );

    showPushNotification({
      title: '📍 GPS Check-in Verified',
      message: `Shift at ${targetShift.facilityName} is now active. Real-time activity tracking initiated.`,
      type: 'CLOCK_IN_REMINDER',
      shiftId: targetShift.id,
    });
  };

  const clockOutShift = (timesheetId: string, notes: string) => {
    const nowTime = new Date().toTimeString().substring(0, 5);
    setTimesheets((prev) =>
      prev.map((t) =>
        t.id === timesheetId
          ? {
              ...t,
              clockOutTime: nowTime,
              status: 'SUBMITTED',
              nurseNotes: notes || t.nurseNotes,
            }
          : t
      )
    );

    const ts = timesheets.find((t) => t.id === timesheetId);
    if (ts) {
      setShifts((prev) =>
        prev.map((s) => (s.id === ts.shiftId ? { ...s, status: 'COMPLETED' } : s))
      );
      logAuditEvent(
        'NURSE_CLOCK_OUT_SUBMITTED',
        'SECURITY',
        `Nurse ${nurseProfile.name} clocked out from ${ts.facilityName}. Electronic timesheet submitted for instant coordinator signature.`
      );
    }

    showPushNotification({
      title: '⏱️ Timesheet Submitted for Approval',
      message: 'Your hours have been logged and sent to the facility coordinator for electronic sign-off & automated payout.',
      type: 'CLOCK_IN_REMINDER',
    });
  };

  const approveTimesheetAndExecutePayroll = (timesheetId: string) => {
    const targetTs = timesheets.find((t) => t.id === timesheetId);
    if (!targetTs) return;

    // Update timesheet
    setTimesheets((prev) =>
      prev.map((t) =>
        t.id === timesheetId
          ? {
              ...t,
              status: 'PAID',
              supervisorSignature: 'Dr. S. de Groot (Verified Digital Key: #AG8819)',
              supervisorName: 'Dr. Sander de Groot',
            }
          : t
      )
    );

    // Calculate Multi-bank split
    const totalGross = targetTs.grossPay;
    const splitBreakdown = nurseProfile.bankAccounts.map((acc) => ({
      bankName: acc.bankName,
      iban: acc.iban,
      accountType: acc.accountType,
      percentage: acc.splitPercentage,
      amount: Math.round(((totalGross * acc.splitPercentage) / 100) * 100) / 100,
    }));

    const newPayout: PaymentPayout = {
      id: `pay_${Date.now()}`,
      payoutReference: `SEPA-${new Date().toISOString().substring(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      timesheetId: targetTs.id,
      shiftId: targetTs.shiftId,
      shiftTitle: targetTs.facilityName + ' Completed Shift',
      nurseId: targetTs.nurseId,
      nurseName: targetTs.nurseName,
      facilityName: targetTs.facilityName,
      totalAmount: totalGross,
      taxWithholding: 0.0,
      netPayoutAmount: totalGross,
      payoutDate: new Date().toISOString().split('T')[0],
      status: 'COMPLETED',
      splitBreakdown,
      invoiceNumber: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      sepaBatchId: `BATCH-NL-SEPA-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    setPayouts((prev) => [newPayout, ...prev]);

    logAuditEvent(
      'AUTOMATED_PAYROLL_MULTI_BANK_DISBURSED',
      'PAYMENT',
      `Executed automated SEPA payout of €${totalGross.toFixed(2)} for ${targetTs.nurseName} across ${nurseProfile.bankAccounts.length} synced bank accounts.`
    );

    try {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    } catch {
      // safe fallback
    }

    showPushNotification({
      title: '💶 Instant Multi-Bank Payroll Disbursed',
      message: `€${totalGross.toFixed(2)} paid for shift at ${targetTs.facilityName}! Synced to: ${splitBreakdown.map((s) => `${s.bankName} (${s.percentage}%)`).join(', ')}.`,
      type: 'PAYMENT_SENT',
    });
  };

  const updateBankAccounts = (accounts: BankAccount[]) => {
    setNurseProfile((prev) => ({
      ...prev,
      bankAccounts: accounts,
    }));
    logAuditEvent(
      'BANK_ACCOUNTS_AND_SPLIT_UPDATED',
      'PAYMENT',
      `Nurse updated multi-bank payroll configuration: ${accounts.map((a) => `${a.bankName} (${a.splitPercentage}%)`).join(' | ')}`
    );
    showPushNotification({
      title: '🏦 Banking & Payroll Sync Saved',
      message: 'Multi-account split payout percentages updated successfully.',
      type: 'PAYMENT_SENT',
    });
  };

  const verifyCredentialAdmin = (credentialId: string, status: 'VERIFIED' | 'REJECTED') => {
    setNurseProfile((prev) => {
      const updatedCreds = prev.credentials.map((c) =>
        c.id === credentialId
          ? {
              ...c,
              status,
              verificationHash: status === 'VERIFIED' ? `0x${Math.random().toString(16).substring(2, 12)}` : undefined,
            }
          : c
      );
      const allVerified = updatedCreds.every((c) => c.status === 'VERIFIED');
      return {
        ...prev,
        credentials: updatedCreds,
        complianceStatus: allVerified ? 'FULLY_COMPLIANT' : 'NEEDS_RENEWAL',
      };
    });

    logAuditEvent(
      'CREDENTIAL_COMPLIANCE_STATUS_UPDATE',
      'CREDENTIAL_CHECK',
      `Admin changed credential ID ${credentialId} status to ${status}.`
    );

    showPushNotification({
      title: status === 'VERIFIED' ? '✅ Credential Verified' : '⚠️ Credential Flagged',
      message: `Admin has updated credential compliance status to ${status}.`,
      type: 'CREDENTIAL_ALERT',
    });
  };

  const addNewCredential = (cred: Omit<Credential, 'id' | 'verificationHash' | 'status'>) => {
    const newCred: Credential = {
      ...cred,
      id: `cred_${Date.now()}`,
      status: 'PENDING_REVIEW',
      verificationHash: `0x${Math.random().toString(16).substring(2, 10)}`,
    };

    setNurseProfile((prev) => ({
      ...prev,
      credentials: [...prev.credentials, newCred],
    }));

    logAuditEvent(
      'NEW_CREDENTIAL_SUBMITTED_FOR_REVIEW',
      'CREDENTIAL_CHECK',
      `Nurse submitted document: ${cred.name} (${cred.licenseNumber}) for governmental API verification.`
    );

    showPushNotification({
      title: '📄 Credential Uploaded for Verification',
      message: `${cred.name} is queued for automated CIBG/BIG and background audit checks.`,
      type: 'CREDENTIAL_ALERT',
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const exportGdprComplianceData = () => {
    const exportBundle = {
      exportTimestamp: new Date().toISOString(),
      legalStandard: 'EU GDPR Art. 20 (Right to Data Portability) & US HIPAA Security Rule 45 CFR § 164.312',
      dataSubject: nurseProfile,
      shiftHistory: shifts.filter((s) => s.assignedNurseId === nurseProfile.id),
      timesheetHistory: timesheets.filter((t) => t.nurseId === nurseProfile.id),
      payoutTransactions: payouts.filter((p) => p.nurseId === nurseProfile.id),
      securityAuditTrail: auditLogs.slice(0, 15),
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carepulse_gdpr_hipaa_export_${nurseProfile.id}_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    logAuditEvent(
      'GDPR_ARTICLE_20_DATA_EXPORT_REQUEST',
      'GDPR_HIPAA',
      `Data subject ${nurseProfile.name} generated complete encrypted GDPR & HIPAA personal record bundle export.`
    );

    showPushNotification({
      title: '🔒 GDPR / HIPAA Data Bundle Exported',
      message: 'Complete portable JSON record downloaded with cryptographic audit signature.',
      type: 'CREDENTIAL_ALERT',
    });
  };

  const triggerEmergencyAlertSimulation = () => {
    const randomBonus = Math.floor(70 + Math.random() * 50);
    const simShift: Shift = {
      id: `shift_urgent_sim_${Date.now()}`,
      title: '🚨 FLASH URGENT: Trauma ER Emergency Nurse Needed',
      facilityId: 'fac_01',
      facilityName: 'Amsterdam University Medical Center (UMC)',
      facilityType: 'HOSPITAL',
      department: 'Emergency & Trauma Level 1',
      location: 'De Boelelaan 1117, Amsterdam',
      date: new Date().toISOString().split('T')[0],
      startTime: 'Now / ASAP',
      endTime: '+8.0 hours',
      durationHours: 8.0,
      hourlyRate: 82.00,
      urgentBonus: randomBonus,
      totalPayout: 82.0 * 8.0 + randomBonus,
      urgency: 'CRITICAL_URGENT',
      requiredSpecialty: 'Emergency (ED)',
      requiredCredentials: ['BIG_REGISTER', 'BLS_ACLS'],
      patientRatio: '1:2 Urgent Influx',
      description: 'Sudden high triage volume in Level 1 Trauma. Immediate 1-click booking open for certified trauma nurses.',
      status: 'OPEN',
      applicantsCount: 0,
      postedAt: 'Just now',
    };

    setShifts((prev) => [simShift, ...prev]);

    showPushNotification({
      title: '🚨 EMERGENCY PUSH DISPATCH',
      message: `Trauma ER at Amsterdam UMC needs urgent nurse! Payout €${simShift.totalPayout.toFixed(2)} (€82/hr + €${randomBonus} flash bonus). Tap to claim!`,
      type: 'URGENT_SHIFT',
      shiftId: simShift.id,
    });

    logAuditEvent(
      'REALTIME_FLASH_PUSH_BROADCAST_TRIGGERED',
      'SHIFT_DISPATCH',
      `Emergency dispatch daemon triggered real-time push notification across network for shift #${simShift.id}.`
    );
  };

  // --- Parent & Disabled Child Care Handlers ---

  const triggerLateCallOffSimulation = (slotId?: string) => {
    const targetSlotId = slotId || 'slot_02';
    const targetSlot = careSchedule.find((s) => s.id === targetSlotId) || careSchedule[1];

    // Mark slot as late call-off & auto-replacing
    setCareSchedule((prev) =>
      prev.map((s) =>
        s.id === targetSlotId
          ? {
              ...s,
              status: 'LATE_CALL_OFF',
              isUrgentReplacement: true,
              replacementEtaMinutes: 18,
            }
          : s
      )
    );

    const newIncident: LateCallOffIncident = {
      id: `incident_${Date.now()}`,
      slotId: targetSlot.id,
      slotTitle: targetSlot.title,
      slotTime: targetSlot.timeSlot,
      slotDate: targetSlot.date,
      originalCaregiverName: targetSlot.assignedCaregiverName,
      originalCaregiverAvatar: targetSlot.assignedCaregiverAvatar,
      callOffReason: 'Sudden high fever & acute illness reported (1h 45m before shift)',
      callOffTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'REPLACEMENT_FOUND',
      notifiedCandidatesCount: 4,
      matchedCaregiver: {
        id: 'cg_02',
        name: 'Lisa Jansen, BSN',
        title: 'Certified Pediatric ICU & Respite Nurse',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
        phone: '+31 6 8820 4419',
        etaMinutes: 18,
        distanceKm: 2.8,
        rating: 4.95,
        specialties: ['Pediatric Epilepsy', 'G-Tube Certified', 'Lars Familiar Caregiver'],
        handoverSynced: true,
      },
      timeline: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          title: 'Late Call-Off Received from ' + targetSlot.assignedCaregiverName,
          description: 'Caretaker reported acute illness. CarePulse Emergency Fallback Engine instantly took over.',
          step: 1,
          completed: true,
        },
        {
          time: new Date(Date.now() + 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          title: 'Skills & Protocol Auto-Matching',
          description: 'Identified required pediatric credentials (Epilepsy Stesolid, G-Tube Mic-Key, Ceiling Hoist).',
          step: 2,
          completed: true,
        },
        {
          time: new Date(Date.now() + 12000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          title: 'Emergency Match Accepted (Lisa Jansen, BSN)',
          description: 'Pre-vetted standby pediatric caregiver accepted with zero delay for the family.',
          step: 3,
          completed: true,
        },
        {
          time: new Date(Date.now() + 18000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          title: 'Digital Medical Handover Synced',
          description: 'Child seizure protocol, emergency neurologist contact, and calming routines pushed to caregiver.',
          step: 4,
          completed: true,
        },
        {
          time: new Date(Date.now() + 25000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          title: 'Caregiver En Route (ETA 18 min)',
          description: 'Live GPS geofence tracking active. Guaranteed arrival before scheduled care time.',
          step: 5,
          completed: true,
        },
      ],
    };

    setLateCallOffIncident(newIncident);

    logAuditEvent(
      'FAMILY_CARE_LATE_CALL_OFF_RECOVERY',
      'SHIFT_DISPATCH',
      `Emergency Auto-Replacement Engine triggered for ${childProfile.name}. Caregiver ${targetSlot.assignedCaregiverName} replaced by Lisa Jansen, BSN.`
    );

    showPushNotification({
      title: '🚨 Late Call-Off Absorbed & Auto-Replaced',
      message: `${targetSlot.assignedCaregiverName} called off. CarePulse auto-matched Lisa Jansen, BSN (Pediatric ICU). En route with 18m ETA!`,
      type: 'URGENT_SHIFT',
    });
  };

  const resetLateCallOffSimulation = () => {
    setLateCallOffIncident(null);
    setCareSchedule((prev) =>
      prev.map((s) =>
        s.id === 'slot_02'
          ? {
              ...s,
              status: 'SCHEDULED',
              isUrgentReplacement: false,
              replacementEtaMinutes: undefined,
            }
          : s
      )
    );
    showPushNotification({
      title: '🔄 Simulation State Reset',
      message: 'Caregiver schedule and emergency incidents reset to default state.',
      type: 'CREDENTIAL_ALERT',
    });
  };

  const acknowledgeReplacementHandover = () => {
    if (lateCallOffIncident) {
      setLateCallOffIncident((prev) =>
        prev
          ? {
              ...prev,
              status: 'ON_SITE',
              timeline: prev.timeline.map((t) => (t.step === 5 ? { ...t, title: 'Caregiver Arrived On-Site & Verified', completed: true } : t)),
            }
          : null
      );
    }
    setCareSchedule((prev) =>
      prev.map((s) =>
        s.id === 'slot_02'
          ? {
              ...s,
              status: 'REPLACEMENT_CONFIRMED',
              handoverProtocolAcknowledged: true,
            }
          : s
      )
    );
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // safe fallback
    }
    showPushNotification({
      title: '✅ Caregiver On-Site & Handover Confirmed',
      message: 'Lisa Jansen, BSN has checked in on-site. Medical passport acknowledged.',
      type: 'CREDENTIAL_ALERT',
    });
  };

  const requestDirectStandbyShift = (caregiverId: string) => {
    const cg = caregiverCircle.find((c) => c.id === caregiverId);
    if (!cg) return;

    showPushNotification({
      title: '📅 Direct Standby Shift Requested',
      message: `Shift request transmitted to ${cg.name}. Auto-syncing to your PGB planner.`,
      type: 'URGENT_SHIFT',
    });

    logAuditEvent(
      'FAMILY_STANDBY_CAREGIVER_REQUESTED',
      'SHIFT_DISPATCH',
      `Parent Sanne requested direct care slot with trusted caregiver ${cg.name} for ${childProfile.name}.`
    );
  };

  const autoPlanWeeklyRoster = () => {
    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }

    showPushNotification({
      title: '✨ CarePulse Smart Planner Complete',
      message: 'Weekly care schedule fully optimized and matched with trusted circle caregivers according to your PGB budget.',
      type: 'URGENT_SHIFT',
    });

    logAuditEvent(
      'SMART_ROSTER_AUTO_PLANNED',
      'SHIFT_DISPATCH',
      `CarePulse Auto-Planner generated complete 7-day care schedule for ${childProfile.name} conforming to SVB budget.`
    );
  };

  const addCareSlot = (slotData: Omit<CareSlot, 'id'>) => {
    const newSlot: CareSlot = {
      ...slotData,
      id: `slot_${Date.now()}`,
    };
    setCareSchedule((prev) => [newSlot, ...prev]);

    showPushNotification({
      title: '📅 Care Slot Added to Schedule',
      message: `Added "${newSlot.title}" (${newSlot.timeSlot}) to Lars's weekly care plan.`,
      type: 'CREDENTIAL_ALERT',
    });
  };

  const approveSvbTimesheetSlot = (slotId: string) => {
    const slot = careSchedule.find((s) => s.id === slotId);
    if (!slot) return;

    setCareSchedule((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, status: 'COMPLETED' } : s))
    );

    setChildProfile((prev) => ({
      ...prev,
      pgbBudget: {
        ...prev.pgbBudget,
        usedBudgetYear: prev.pgbBudget.usedBudgetYear + slot.totalCost,
        remainingBudgetYear: prev.pgbBudget.remainingBudgetYear - slot.totalCost,
        monthlyUsed: prev.pgbBudget.monthlyUsed + slot.totalCost,
      },
    }));

    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch {
      // safe fallback
    }

    logAuditEvent(
      'SVB_PGB_TIMESHEET_APPROVED',
      'PAYMENT',
      `Parent approved care slot "${slot.title}" (€${slot.totalCost.toFixed(2)}) for ${slot.assignedCaregiverName}. Transmitted to SVB Trekkingsrecht.`
    );

    showPushNotification({
      title: '💶 SVB PGB Timesheet Approved',
      message: `€${slot.totalCost.toFixed(2)} approved for ${slot.assignedCaregiverName}. Digital declaration sent to SVB.`,
      type: 'PAYMENT_SENT',
    });
  };

  const exportSvbOverview = () => {
    const bundle = {
      svbClientNumber: childProfile.pgbBudget.svbClientNumber,
      childName: childProfile.name,
      parentGuardian: childProfile.primaryCaregiverParent,
      annualBudget: childProfile.pgbBudget.totalBudgetYear,
      usedBudget: childProfile.pgbBudget.usedBudgetYear,
      remainingBudget: childProfile.pgbBudget.remainingBudgetYear,
      completedSlots: careSchedule.filter((s) => s.status === 'COMPLETED'),
      exportDate: new Date().toISOString(),
      legalDeclaration: 'Statutory Declaration for Sociale Verzekeringsbank (SVB) - Trekkingsrecht PGB Zorgovereenkomst',
    };

    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `svb_pgb_declaration_${childProfile.name.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showPushNotification({
      title: '📄 SVB Declaration Bundle Exported',
      message: 'Compliant SVB PGB declaration JSON downloaded with audit stamp.',
      type: 'CREDENTIAL_ALERT',
    });
  };

  const exportMedicalPassport = () => {
    const passportBundle = {
      patient: childProfile.name,
      age: childProfile.age,
      diagnosis: childProfile.diagnosis,
      parentContact: {
        name: childProfile.primaryCaregiverParent,
        phone: childProfile.parentPhone,
        address: `${childProfile.parentAddress}, ${childProfile.city}`,
      },
      emergencyProtocol: childProfile.emergencyMedicalProtocol,
      trustedCircle: caregiverCircle.map((c) => ({ name: c.name, title: c.title, phone: c.phone })),
      exportTimestamp: new Date().toISOString(),
      standard: 'Pediatric Complex Needs Emergency Passport (CarePulse Medical Standard)',
    };

    const blob = new Blob([JSON.stringify(passportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical_care_passport_${childProfile.name.toLowerCase().replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showPushNotification({
      title: '🩺 Medical Care Passport Exported',
      message: 'Full emergency seizure protocol and feeding passport downloaded.',
      type: 'CREDENTIAL_ALERT',
    });
  };

  const verifyDigitalShadowVideoQuiz = (videoId: string) => {
    setDigitalShadowVideos((prev) =>
      prev.map((v) =>
        v.id === videoId ? { ...v, verifiedByNursesCount: v.verifiedByNursesCount + 1 } : v
      )
    );
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    showPushNotification({
      title: '✅ Tacit Competence Verified',
      message: 'Caregiver has passed protocol verification and is cleared for on-site care.',
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('TACIT_PROTOCOL_VERIFIED', 'CREDENTIAL_CHECK', `Video guide ${videoId} tacit quiz passed with 100% score.`);
  };

  const generateWetDbaContract = (caregiverId: string) => {
    const caregiver = caregiverCircle.find((c) => c.id === caregiverId);
    if (!caregiver) return;

    const newContract: WetDbaContract = {
      id: `contract_${Date.now()}`,
      caregiverId: caregiver.id,
      caregiverName: caregiver.name,
      caregiverIban: 'NL88 INGB 0109 4432 99',
      caregiverBigNumber: `BIG-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      startDate: '2026-09-01',
      endDate: '2027-08-31',
      hourlyRate: caregiver.hourlyRate,
      maxHoursWeekly: 18,
      svbAgreementType: 'ZORGOVEREENKOMST_OPDRACHT',
      wetDbaExemptionChecked: true,
      belastingdienstCompliant: true,
      status: 'ACTIVE_VERIFIED',
    };

    setWetDbaContracts((prev) => [newContract, ...prev]);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    showPushNotification({
      title: '📜 Wet DBA Zorgovereenkomst Generated',
      message: `Model contract of opdracht established for ${caregiver.name} with SVB Trekkingsrecht alignment.`,
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('WET_DBA_CONTRACT_CREATED', 'SECURITY', `Auto-generated compliant Zorgovereenkomst for ${caregiver.name}.`);
  };

  const exportWetDbaContract = (contractId: string) => {
    const contract = wetDbaContracts.find((c) => c.id === contractId);
    if (!contract) return;

    const legalBundle = {
      agreementTitle: 'Zorgovereenkomst van Opdracht (Model Sociale Verzekeringsbank / Belastingdienst)',
      contractId: contract.id,
      parentClient: {
        name: childProfile.primaryCaregiverParent,
        svbClientNumber: childProfile.pgbBudget.svbClientNumber,
        address: `${childProfile.parentAddress}, ${childProfile.city}`,
      },
      caregiverContractor: {
        name: contract.caregiverName,
        bigRegistration: contract.caregiverBigNumber,
        iban: contract.caregiverIban,
      },
      childBeneficiary: {
        name: childProfile.name,
        diagnosis: childProfile.diagnosis,
      },
      financialTerms: {
        hourlyTariffPgb: `€${contract.hourlyRate.toFixed(2)}`,
        maxHoursWeekly: contract.maxHoursWeekly,
        wetDbaSafeHarborClause: 'Partijen verklaren uitdrukkelijk geen gezagsverhouding aan te gaan overeenkomstig Richtlijn Belastingdienst & SVB Trekkingsrecht.',
      },
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(legalBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zorgovereenkomst_${contract.caregiverName.toLowerCase().replace(/\s+/g, '_')}_wet_dba.json`;
    a.click();
    URL.revokeObjectURL(url);

    showPushNotification({
      title: '📄 Legal Care Contract Exported',
      message: `Signed legal contract for ${contract.caregiverName} downloaded.`,
      type: 'CREDENTIAL_ALERT',
    });
  };

  const triggerEpilepsyAlarmSim = () => {
    setNightWatchTelemetry({
      timestamp: 'Just now (Critical IoT Telemetry)',
      heartRateBpm: 142,
      oxygenSaturationSpO2: 89,
      motionIntensityScore: 94,
      sensorBatteryLevel: 88,
      status: 'EPILEPTIC_ALERT_TRIGGERED',
      soundAlarmActive: true,
      lastSeizureRiskPrediction: 'HIGH',
    });

    showPushNotification({
      title: '🚨 NIGHTWATCH SENSOR: SEIZURE DETECTED',
      message: 'High movement intensity & SpO2 desaturation (89%). Check Lars immediately!',
      type: 'URGENT_SHIFT',
    });
    logAuditEvent('NIGHTWATCH_SEIZURE_TRIGGERED', 'SECURITY', 'Nocturnal seizure telemetry detected. Alarm broadcasted to on-duty nurse.');
  };

  const resetNightWatchTelemetry = () => {
    setNightWatchTelemetry(initialNightWatchTelemetry);
    showPushNotification({
      title: 'NightWatch Sensor Reset',
      message: 'Telemetry returned to Normal Resting State (SpO2 98%, BPM 74).',
      type: 'APPLICATION_APPROVED',
    });
  };

  const toggleStandbyRetainer = (caregiverId: string) => {
    setStandbyPoolCaregivers((prev) =>
      prev.map((c) => {
        if (c.id === caregiverId) {
          const nextStatus = c.activeRetainerStatus === 'RETAINER_ACTIVE' ? 'OFF_DUTY' : 'RETAINER_ACTIVE';
          return { ...c, activeRetainerStatus: nextStatus };
        }
        return c;
      })
    );
    showPushNotification({
      title: 'Standby Retainer Updated',
      message: 'Guaranteed 15-minute emergency SLA updated for your neighborhood caregiver.',
      type: 'APPLICATION_APPROVED',
    });
  };

  const proposeRespiteCoOp = (familyId: string) => {
    setRespiteCoOpFamilies((prev) =>
      prev.map((f) => (f.id === familyId ? { ...f, status: 'ACTIVE_SHARED_RESPITE' } : f))
    );
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    showPushNotification({
      title: '🤝 Shared Respite Co-Op Activated',
      message: 'Connected with Noah’s family for Saturday hydrotherapy! PGB cost halved.',
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('RESPITE_COOP_ACTIVATED', 'SHIFT_DISPATCH', `Activated shared care session with family ${familyId}.`);
  };

  // CIBG BIG Validator & NEN 7513
  const validateBigNumberLive = async (bigNum: string): Promise<CibgBigValidation> => {
    // Simulates instant CIBG / Vektis registry gateway lookup
    const existing = cibgValidations.find((v) => v.bigNumber === bigNum);
    if (existing) return existing;

    const newValidation: CibgBigValidation = {
      bigNumber: bigNum,
      nurseName: 'Geregistreerd Kind-Verpleegkundige',
      profession: 'Verpleegkundige (Art. 3 Wet BIG)',
      registrationStatus: 'ACTIEF',
      specialisms: ['Kinderverpleegkundige', 'Pediatrische Noodzorg'],
      voorbehoudenHandelingen: [
        { actionName: 'Sonde inbrengen & voeding bolus toedienen', competenceStatus: 'BEVOEGD_EN_BEKWAAM', lastCertifiedDate: '2026-06-01' },
        { actionName: 'Stesolid / Buccolam toedienen bij status epilepticus', competenceStatus: 'BEVOEGD_EN_BEKWAAM', lastCertifiedDate: '2026-06-01' },
      ],
      agbCode: `910${Math.floor(10000 + Math.random() * 90000)}`,
      vektisStatus: 'GECONTROLEERD_VEKTIS',
      lastCheckedTimestamp: new Date().toISOString(),
      cibgApiSignature: `CIBG-VALID-NL-2026-${bigNum}-SHA256-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    };

    setCibgValidations((prev) => [newValidation, ...prev]);
    logAuditEvent('CIBG_BIG_LIVE_VALIDATION', 'CREDENTIAL_CHECK', `Live CIBG query for BIG #${bigNum}: Verified Active.`);
    return newValidation;
  };

  const logNen7513Access = (resource: string, purpose: Nen7513AuditEntry['purposeOfUse']) => {
    const entry: Nen7513AuditEntry = {
      id: `nen_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' CET',
      accessorName: currentRole === 'nurse' ? `${nurseProfile.name} (BIG-${nurseProfile.bigNumber})` : 'Sanne van Dijk (Ouder)',
      accessorRole: currentRole,
      accessorBigOrId: currentRole === 'nurse' ? `BIG-${nurseProfile.bigNumber}` : 'PARENT_AUTH_01',
      patientId: 'patient_lars_2026',
      patientName: 'Lars van Dijk (7 jr)',
      resourceAccessed: resource,
      purposeOfUse: purpose,
      cryptographicSha256: `sha256_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(16)}`,
      igjAuditCompliant: true,
    };
    setNen7513AuditLogs((prev) => [entry, ...prev]);
  };

  const exportNen7513AuditVault = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(nen7513AuditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `CarePulse_NEN7513_Audit_Vault_Lars_van_Dijk_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showPushNotification({
      title: '🛡️ NEN 7513 Audit Vault Exported',
      message: 'Cryptographically sealed access log ready for IGJ inspection.',
      type: 'APPLICATION_APPROVED',
    });
  };

  // AAC Communicator & Daily Timeline
  const toggleTimelineItem = (id: string) => {
    setChildDayTimeline((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const playPictoVoice = (picto: AacPictoSymbol) => {
    const textToSpeak = language === 'nl' ? picto.audioSpokenTextNl : picto.audioSpokenTextEn;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'nl' ? 'nl-NL' : 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
    showPushNotification({
      title: `🗣️ Lars: "${language === 'nl' ? picto.labelNl : picto.labelEn}"`,
      message: textToSpeak,
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('AAC_PICTO_VOICE_TRIGGER', 'SECURITY', `AAC Voice output triggered: "${textToSpeak}"`);
  };

  // Zorgkantoor Report
  const generateZorgkantoorReport = () => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    showPushNotification({
      title: '📋 Zorgkantoor Jaarverantwoording Gegenereerd',
      message: 'Officiële Wlz VV-07 verantwoording berekend. 100% compliant.',
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('ZORGKANTOOR_REPORT_GENERATED', 'GDPR_HIPAA', 'Generated official PGB Wlz Jaarverantwoording report.');
  };

  const exportZorgkantoorReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(zorgkantoorReport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Zorgkantoor_Jaarverantwoording_2026_Lars_van_Dijk.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 8-Minute Emergency Route Interceptor
  const dispatchEmergencyInterceptor = (id: string) => {
    setEmergencyInterceptors((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enRouteStatus: 'INTERCEPTING_EN_ROUTE' } : item))
    );
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    showPushNotification({
      title: '🚨 8-Min Route Interceptor Dispatched!',
      message: 'Maud Willemsen (BIG-9910284412) is en route via E-Bike Rapid. ETA: 6 mins.',
      type: 'URGENT_SHIFT',
    });
    logAuditEvent('EMERGENCY_ROUTE_INTERCEPTED', 'SHIFT_DISPATCH', `Dispatched emergency nurse interceptor ${id} with 6-min ETA.`);
  };

  const triggerEarlyWarningPreIctalSim = () => {
    setEarlyWarningSeizurePrediction({
      riskScore: 88,
      riskStatus: 'PRE_ICTAL_WARNING',
      hrvDropPercent: 38.4,
      nocturnalDesaturationCount: 3,
      aiReasoning: 'Acute sympathetic surge with profound HRV reduction and 3 micro-desaturations in last 12 minutes. High probability of onset within 15-20 minutes.',
      recommendedAction: 'Prepare Buccolam 5mg / Stesolid. Alert neighborhood route interceptor standby.',
      lastUpdated: 'Just now',
    });
    showPushNotification({
      title: '⚠️ PRE-ICTAL SEIZURE EARLY WARNING (AI)',
      message: 'HRV drop detected (38.4%). Anticipated seizure window in 15-20 min. Emergency standby alerted.',
      type: 'URGENT_SHIFT',
    });
  };

  const resetEarlyWarningPreIctalSim = () => {
    setEarlyWarningSeizurePrediction(initialEarlyWarningSeizurePrediction);
    showPushNotification({
      title: 'Early Warning AI Reset',
      message: 'Prediction status returned to Normal Baseline.',
      type: 'APPLICATION_APPROVED',
    });
  };

  // FHIR Hospital Transfer Gateway
  const transmitToHospitalEr = (hospital: FhirBundleExport['targetHospital']) => {
    setFhirBundle((prev) => ({
      ...prev,
      targetHospital: hospital,
      transmissionStatus: 'VERIFIED_TRANSMITTED',
      timestamp: new Date().toISOString(),
      sha256FhirDigest: `sha256_hl7fhir_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(16)}`,
    }));
    confetti({ particleCount: 70, spread: 85, origin: { y: 0.6 } });
    showPushNotification({
      title: '🏥 HL7® FHIR® Spoedoverdracht Geslaagd',
      message: `Volledig medisch dossier inclusief actuele NightWatch vitals verzonden naar ${hospital === 'EMMA_KINDERZIEKENHUIS_AMSTERDAM' ? 'Emma Kinderziekenhuis Amsterdam UMC' : hospital}.`,
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('FHIR_DOCUMENT_TRANSMISSION', 'GDPR_HIPAA', `Transmitted HL7 FHIR emergency document bundle to ${hospital}`);
  };

  const exportFhirDocumentBundle = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fhirBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `HL7_FHIR_Bundle_Lars_van_Dijk_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showPushNotification({
      title: '📦 HL7 FHIR Document Bundle Exported',
      message: 'MedMij & Nictiz-compliant JSON bundle downloaded.',
      type: 'APPLICATION_APPROVED',
    });
  };

  // Demo Scenarios Switcher
  const runDemoScenario = (mode: DemoScenarioMode) => {
    setActiveDemoScenario(mode);
    if (mode === 'SEIZURE_EMERGENCY') {
      triggerEarlyWarningPreIctalSim();
      triggerEpilepsyAlarmSim();
    } else if (mode === 'DBA_SVB_AUDIT') {
      generateZorgkantoorReport();
    } else if (mode === 'AAC_LARS_VOICE') {
      playPictoVoice(aacPictoSymbols[0]);
    } else if (mode === 'HOSPITAL_FHIR_TRANSFER') {
      transmitToHospitalEr('EMMA_KINDERZIEKENHUIS_AMSTERDAM');
    }
  };

  // AI SBAR Handover
  const addSbarHandoverReport = (reportData: Omit<SbarHandoverReport, 'id' | 'timestamp'>) => {
    const newReport: SbarHandoverReport = {
      ...reportData,
      id: `sbar_rep_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) + ' CET',
    };
    const updated = [newReport, ...sbarReports];
    setSbarReports(updated);
    localStorage.setItem('carepulse_sbar_reports', JSON.stringify(updated));
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    showPushNotification({
      title: '🎙️ SBAR Overdracht Succesvol Gegenereerd',
      message: `Audio overdracht verwerkt naar klinisch SBAR format (${newReport.shiftType}) en geregistreerd in NEN 7513 audit trail.`,
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('SBAR_VOICE_HANDOVER_RECORDED', 'SHIFT_DISPATCH', `Recorded SBAR voice handover by ${reportData.nurseName} (${reportData.nurseBig})`);
    logNen7513Access('sbar_handover_report', 'DIENSTOVERDRACHT');
  };

  // Multi-Family Route Dispatcher
  const updateCareStopStatus = (stopId: string, status: NeighborhoodCareStop['status']) => {
    setMultiFamilyRoutePlan((prev) => {
      const updatedStops = prev.stops.map((s) => (s.id === stopId ? { ...s, status } : s));
      const updatedPlan = { ...prev, stops: updatedStops };
      localStorage.setItem('carepulse_route_plan', JSON.stringify(updatedPlan));
      return updatedPlan;
    });
    showPushNotification({
      title: '🚲 Micro-Transit Route Status Gewijzigd',
      message: `Stop status bijgewerkt naar ${status}.`,
      type: 'APPLICATION_APPROVED',
    });
  };

  const optimizeRouteWithAi = () => {
    setMultiFamilyRoutePlan((prev) => ({
      ...prev,
      totalDistanceKm: 6.4,
      totalTransitTimeMinutes: 19,
      co2SavedKg: 2.8,
      standbyOverlapBenefitEuro: 65.0,
    }));
    confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
    showPushNotification({
      title: '⚡ AI E-Bike Route Geoptimaliseerd',
      message: 'Reistijd tussen zorglocaties verkort met 21% (-5 min, -1.4 km). Gecombineerde standby buffer geactiveerd.',
      type: 'APPLICATION_APPROVED',
    });
    logAuditEvent('AI_ROUTE_OPTIMIZATION', 'SHIFT_DISPATCH', 'Optimized multi-family neighborhood pediatric route.');
  };

  // Paramedic Pocket Card Actions
  const printParamedicCard = () => {
    window.print();
    logNen7513Access('paramedic_emergency_card', 'SPOEDINTERVENTIE');
  };

  const verifyEmergencyQr = () => {
    confetti({ particleCount: 90, spread: 90, origin: { y: 0.6 } });
    showPushNotification({
      title: '🚨 Paramedic Spoed QR Geverifieerd',
      message: `Ambulancepersoneel geverifieerd via Vektis/CIBG noodtoken. Directe toegang tot Stesolid & G-tube protocollen geopend.`,
      type: 'URGENT_SHIFT',
    });
    logAuditEvent('PARAMEDIC_QR_ACCESSED', 'SECURITY', 'Paramedic emergency QR pass scanned and verified.');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        currentRole,
        setCurrentRole,
        nurseProfile,
        facilities,
        shifts,
        applications,
        timesheets,
        payouts,
        auditLogs,
        notifications,
        activeShift,
        activeTimesheet,
        isSimulatingDevice,
        toastAlert,
        childProfile,
        careSchedule,
        caregiverCircle,
        lateCallOffIncident,
        digitalShadowVideos,
        pgbForecasts,
        wetDbaContracts,
        nightWatchTelemetry,
        standbyPoolCaregivers,
        respiteCoOpFamilies,
        cibgValidations,
        nen7513AuditLogs,
        aacPictoSymbols,
        childDayTimeline,
        wetDbaScorerResults,
        zorgkantoorReport,
        emergencyInterceptors,
        earlyWarningSeizurePrediction,
        fhirBundle,
        activeDemoScenario,
        sbarReports,
        multiFamilyRoutePlan,
        paramedicPocketCard,
        runDemoScenario,
        exportFhirDocumentBundle,
        transmitToHospitalEr,
        addSbarHandoverReport,
        updateCareStopStatus,
        optimizeRouteWithAi,
        printParamedicCard,
        verifyEmergencyQr,
        dismissToast,
        toggleSimulatingDevice,
        toggleOnCallAvailability,
        updateDayAvailability,
        applyForShift,
        postUrgentShift,
        approveApplication,
        denyApplication,
        clockInShift,
        clockOutShift,
        approveTimesheetAndExecutePayroll,
        updateBankAccounts,
        verifyCredentialAdmin,
        addNewCredential,
        markNotificationRead,
        markAllNotificationsRead,
        exportGdprComplianceData,
        logAuditEvent,
        triggerEmergencyAlertSimulation,
        triggerLateCallOffSimulation,
        resetLateCallOffSimulation,
        acknowledgeReplacementHandover,
        requestDirectStandbyShift,
        autoPlanWeeklyRoster,
        addCareSlot,
        approveSvbTimesheetSlot,
        exportSvbOverview,
        exportMedicalPassport,
        verifyDigitalShadowVideoQuiz,
        generateWetDbaContract,
        exportWetDbaContract,
        triggerEpilepsyAlarmSim,
        resetNightWatchTelemetry,
        toggleStandbyRetainer,
        proposeRespiteCoOp,
        validateBigNumberLive,
        logNen7513Access,
        exportNen7513AuditVault,
        toggleTimelineItem,
        playPictoVoice,
        generateZorgkantoorReport,
        exportZorgkantoorReport,
        dispatchEmergencyInterceptor,
        triggerEarlyWarningPreIctalSim,
        resetEarlyWarningPreIctalSim,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
