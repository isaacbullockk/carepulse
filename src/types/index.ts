export type Role = 'nurse' | 'facility' | 'parent' | 'admin';

export interface ChildCareProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  diagnosis: string;
  primaryCaregiverParent: string;
  parentPhone: string;
  parentAddress: string;
  city: string;
  pgbBudget: {
    totalBudgetYear: number;
    usedBudgetYear: number;
    remainingBudgetYear: number;
    monthlyBudget: number;
    monthlyUsed: number;
    hourlyRatePgb: number;
    svbClientNumber: string;
    svbStatus: 'SYNCED_ACTIVE' | 'PENDING_APPROVAL';
  };
  emergencyMedicalProtocol: {
    seizureProtocol: string;
    feedingAndNutrition: string;
    medicationSchedule: string;
    sensoryAndCalming: string;
    mobilityAndTransfer: string;
    emergencyPediatrician: {
      name: string;
      hospital: string;
      phone: string;
    };
  };
}

export interface CaregiverCircleMember {
  id: string;
  name: string;
  avatar: string;
  title: string;
  phone: string;
  familiarityLevel: 'TRUSTED_PRIMARY' | 'STANDBY_FAMILIAR' | 'VERIFIED_PEDIATRIC_RESERVE';
  shiftsWithChildCount: number;
  rating: number;
  specialties: string[];
  hourlyRate: number;
  isOnCallStandby: boolean;
  distanceKm: number;
  verifiedBig: boolean;
  pediatricFirstAid: boolean;
  epilepsyTrained: boolean;
  pegTubeCertified: boolean;
}

export interface CareSlot {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  date: string; // YYYY-MM-DD
  title: string;
  timeSlot: string; // e.g. "14:30 - 18:30"
  durationHours: number;
  hourlyRate: number;
  totalCost: number;
  careType: 'AFTER_SCHOOL_CARE' | 'NIGHT_RESPITE' | 'WEEKEND_SPECIALIST' | 'MORNING_ROUTINE' | 'MEDICAL_DAY_CARE';
  status: 'SCHEDULED' | 'LATE_CALL_OFF' | 'AUTO_REPLACING' | 'REPLACEMENT_CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';
  assignedCaregiverId: string;
  assignedCaregiverName: string;
  assignedCaregiverAvatar: string;
  assignedCaregiverTitle: string;
  assignedCaregiverPhone: string;
  specialNeedsFocus: string;
  isUrgentReplacement?: boolean;
  replacementEtaMinutes?: number;
  handoverProtocolAcknowledged?: boolean;
}

export interface LateCallOffIncident {
  id: string;
  slotId: string;
  slotTitle: string;
  slotTime: string;
  slotDate: string;
  originalCaregiverName: string;
  originalCaregiverAvatar: string;
  callOffReason: string;
  callOffTimestamp: string;
  status: 'SEARCHING_CIRCLE' | 'BROADCASTING_STANDBY' | 'REPLACEMENT_FOUND' | 'EN_ROUTE' | 'ON_SITE';
  notifiedCandidatesCount: number;
  matchedCaregiver?: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    phone: string;
    etaMinutes: number;
    distanceKm: number;
    rating: number;
    specialties: string[];
    handoverSynced: boolean;
  };
  timeline: {
    time: string;
    title: string;
    description: string;
    step: number;
    completed: boolean;
  }[];
}

export interface Credential {
  id: string;
  name: string;
  type: 'BIG_REGISTER' | 'BLS_ACLS' | 'SPECIALTY_CERT' | 'VOG_CRIMINAL_CHECK' | 'ID_VERIFICATION' | 'LIABILITY_INSURANCE';
  licenseNumber: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'VERIFIED' | 'PENDING_REVIEW' | 'EXPIRED' | 'REJECTED';
  documentUrl?: string;
  verificationHash?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  accountType: 'PRIMARY_CHECKING' | 'TAX_SAVINGS' | 'BUSINESS' | 'PERSONAL';
  splitPercentage: number; // e.g. 70 for 70%
  isDefault: boolean;
}

export interface NurseProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  title: string; // e.g. "Registered ICU & Critical Care Nurse (RN-BSN)"
  hourlyRate: number; // in EUR/USD
  rating: number;
  completedShiftsCount: number;
  onCallAvailableNow: boolean;
  weeklyAvailability: {
    [day: string]: { morning: boolean; afternoon: boolean; night: boolean };
  };
  specialties: string[];
  yearsExperience: number;
  credentials: Credential[];
  bankAccounts: BankAccount[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  complianceStatus: 'FULLY_COMPLIANT' | 'NEEDS_RENEWAL' | 'NON_COMPLIANT';
  gdprConsentDate: string;
  hipaaTrainedDate: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'HOSPITAL' | 'CARE_HOME' | 'HOME_CARE_AGENCY' | 'CLINIC';
  department: string;
  location: string;
  city: string;
  distanceKm?: number;
  contactPerson: string;
  contactEmail: string;
  rating: number;
  verifiedHospital: boolean;
}

export interface Shift {
  id: string;
  title: string;
  facilityId: string;
  facilityName: string;
  facilityType: 'HOSPITAL' | 'CARE_HOME' | 'HOME_CARE_AGENCY' | 'CLINIC';
  department: string;
  location: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  durationHours: number;
  hourlyRate: number;
  urgentBonus: number;
  totalPayout: number;
  urgency: 'CRITICAL_URGENT' | 'HIGH' | 'STANDARD';
  requiredSpecialty: string;
  requiredCredentials: string[];
  patientRatio?: string;
  description: string;
  dressCode?: string;
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedNurseId?: string;
  assignedNurseName?: string;
  applicantsCount: number;
  postedAt: string;
}

export interface ShiftApplication {
  id: string;
  shiftId: string;
  shiftTitle: string;
  facilityName: string;
  nurseId: string;
  nurseName: string;
  nurseAvatar: string;
  nurseSpecialties: string[];
  nurseRating: number;
  appliedAt: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED' | 'WITHDRAWN';
  matchScore: number; // 0-100%
  credentialsVerified: boolean;
  notes?: string;
}

export interface Timesheet {
  id: string;
  shiftId: string;
  nurseId: string;
  nurseName: string;
  facilityName: string;
  date: string;
  clockInTime: string;
  clockOutTime?: string;
  actualHours: number;
  breakMinutes: number;
  hourlyRate: number;
  grossPay: number;
  status: 'CLOCKED_IN' | 'SUBMITTED' | 'APPROVED' | 'PAID';
  supervisorSignature?: string;
  supervisorName?: string;
  nurseNotes?: string;
}

export interface PaymentPayout {
  id: string;
  payoutReference: string;
  timesheetId: string;
  shiftId: string;
  shiftTitle: string;
  nurseId: string;
  nurseName: string;
  facilityName: string;
  totalAmount: number;
  taxWithholding: number;
  netPayoutAmount: number;
  payoutDate: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  splitBreakdown: {
    bankName: string;
    iban: string;
    accountType: string;
    percentage: number;
    amount: number;
  }[];
  invoiceNumber: string;
  sepaBatchId: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: Role;
  action: string;
  category: 'SECURITY' | 'CREDENTIAL_CHECK' | 'PAYMENT' | 'SHIFT_DISPATCH' | 'GDPR_HIPAA';
  details: string;
  ipAddress: string;
  encryptedHash: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  type: 'URGENT_SHIFT' | 'APPLICATION_APPROVED' | 'APPLICATION_DENIED' | 'PAYMENT_SENT' | 'CREDENTIAL_ALERT' | 'CLOCK_IN_REMINDER';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  shiftId?: string;
}

// === UNIQUE MOAT MODULES ===

export interface DigitalShadowVideo {
  id: string;
  title: string;
  duration: string; // e.g. "0:45"
  category: 'G_TUBE_FEEDING' | 'SEIZURE_RESPONSE' | 'SENSORY_CALMING' | 'MOBILITY_HOIST' | 'COMMUNICATION_AAC';
  thumbnail: string;
  videoUrl: string;
  description: string;
  keyInstructions: string[];
  tacitQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  verifiedByNursesCount: number;
}

export interface PgbForecastMonth {
  month: string;
  monthName: string;
  projectedSpend: number;
  actualSpend: number;
  budgetCap: number;
  isHolidaySeason: boolean;
  notes: string;
}

export interface WetDbaContract {
  id: string;
  caregiverId: string;
  caregiverName: string;
  caregiverIban: string;
  caregiverBigNumber: string;
  startDate: string;
  endDate: string;
  hourlyRate: number;
  maxHoursWeekly: number;
  svbAgreementType: 'ZORGOVEREENKOMST_OPDRACHT' | 'ZORGOVEREENKOMST_PARTNER' | 'ARBEIDSOVEREENKOMST';
  wetDbaExemptionChecked: boolean;
  belastingdienstCompliant: boolean;
  status: 'ACTIVE_VERIFIED' | 'NEEDS_RENEWAL' | 'PENDING_SVB_SIGNATURE';
}

export interface NightWatchTelemetry {
  timestamp: string;
  heartRateBpm: number;
  oxygenSaturationSpO2: number;
  motionIntensityScore: number; // 0-100 (epilepsy jerking detection)
  sensorBatteryLevel: number;
  status: 'NORMAL_RESTING' | 'POSSIBLE_RESTLESSNESS' | 'EPILEPTIC_ALERT_TRIGGERED' | 'SENSOR_DISCONNECTED';
  soundAlarmActive: boolean;
  lastSeizureRiskPrediction: 'LOW' | 'ELEVATED' | 'HIGH';
}

export interface StandbyPoolCaregiver {
  id: string;
  name: string;
  avatar: string;
  title: string;
  phone: string;
  distanceKm: number;
  etaMinutes: number;
  standbyHourlyRetainer: number; // e.g. €4.00/hr
  activeRetainerStatus: 'RETAINER_ACTIVE' | 'OFF_DUTY' | 'DISPATCHED';
  guaranteedArrivalMinutes: number; // e.g. 15
  verifiedBig: boolean;
  specialties: string[];
}

export interface RespiteCoOpFamily {
  id: string;
  parentName: string;
  childName: string;
  childAge: number;
  avatar: string;
  neighborhood: string;
  distanceKm: number;
  sharedInterests: string[];
  compatibleDiagnosis: string;
  proposedActivity: string;
  estimatedCostSplit: {
    totalHourlyRate: number;
    parentShare: number;
    coOpShare: number;
  };
  status: 'MATCH_RECOMMENDED' | 'PENDING_CO_OP' | 'ACTIVE_SHARED_RESPITE';
}

// === CIBG BIG VALIDATOR & NEN 7513 AUDIT VAULT ===
export interface CibgBigValidation {
  bigNumber: string;
  nurseName: string;
  profession: string;
  registrationStatus: 'ACTIEF' | 'HERREGISTRATIE_VOLDOAN' | 'GESCHORST';
  specialisms: string[];
  voorbehoudenHandelingen: {
    actionName: string;
    competenceStatus: 'BEVOEGD_EN_BEKWAAM' | 'HERCERTIFICERING_VEREIST';
    lastCertifiedDate: string;
  }[];
  agbCode: string;
  vektisStatus: 'GECONTROLEERD_VEKTIS' | 'IN_BEHANDELING';
  lastCheckedTimestamp: string;
  cibgApiSignature: string;
}

export interface Nen7513AuditEntry {
  id: string;
  timestamp: string;
  accessorName: string;
  accessorRole: Role;
  accessorBigOrId: string;
  patientId: string;
  patientName: string;
  resourceAccessed: string;
  purposeOfUse: 'DIENSTOVERDRACHT' | 'SPOEDINTERVENTIE' | 'MEDICATIE_CONTROLE' | 'SVB_VERANTWOORDING' | 'OUDER_AUDIT';
  cryptographicSha256: string;
  igjAuditCompliant: boolean;
}

// === AAC PICTOGRAMS COMMUNICATOR & "MIJN DAG IN BEELD" ===
export interface AacPictoSymbol {
  id: string;
  labelNl: string;
  labelEn: string;
  category: 'BASISBEHOEFTEN' | 'EMOTIES' | 'ACTIVITEITEN' | 'PIJN_MEDISCH' | 'SONDE_EPILEPSIE';
  iconEmoji: string;
  audioSpokenTextNl: string;
  audioSpokenTextEn: string;
}

export interface ChildDayTimelineEntry {
  id: string;
  time: string;
  title: string;
  pictoIcon: string;
  type: 'MEDICATIE' | 'SONDEVOEDING' | 'RUST' | 'ACTIVITEIT' | 'THERAPIE';
  completed: boolean;
  notes: string;
}

// === WET DBA SAFE HARBOR SCORER & ZORGKANTOOR REPORT ===
export interface WetDbaScorerResult {
  caregiverId: string;
  caregiverName: string;
  overallRiskScore: number; // 0 (Zero Risk) to 100
  riskLevel: 'SAFE_HARBOR_LOW_RISK' | 'ATTENTION_MODERATE' | 'HIGH_RISK_HIERARCHY';
  factors: {
    multipleClientsChecked: boolean;
    substitutionClausePresent: boolean;
    tariffAdequate: boolean;
    absenceOfHierarchy: boolean;
    independentMaterials: boolean;
    kvkVerified: boolean;
  };
  safeHarborCertificateId: string;
  belastingdienstVerdict: string;
  lastCalculatedAt: string;
}

export interface ZorgkantoorReport {
  id: string;
  year: number;
  clientSvbNumber: string;
  clientName: string;
  zorgkantoorName: string;
  wlzIndicatie: string;
  totalBudgetAllocated: number;
  totalBudgetSpent: number;
  remainingSurplus: number;
  hoursDelivered: number;
  complianceAuditPassed: boolean;
  generatedAt: string;
}

// === EMERGENCY ROUTE INTERCEPTOR & SEIZURE PREDICTION ===
export interface EmergencyRouteInterceptor {
  id: string;
  nurseName: string;
  nurseAvatar: string;
  currentStreet: string;
  neighborhood: string;
  distanceKm: number;
  etaMinutes: number;
  enRouteStatus: 'INTERCEPTING_EN_ROUTE' | 'STANDBY_ALERTED' | 'ARRIVED_ON_SITE';
  travelMode: 'E_BIKE_RAPID' | 'CAR_MEDIC' | 'ON_FOOT';
  specialties: string[];
  contactPhone: string;
  bigNumber: string;
}

export interface EarlyWarningSeizurePrediction {
  riskScore: number; // 0 - 100
  riskStatus: 'NORMAL' | 'WATCHFUL' | 'PRE_ICTAL_WARNING' | 'CRITICAL_SEIZURE_CLUSTER';
  hrvDropPercent: number;
  nocturnalDesaturationCount: number;
  aiReasoning: string;
  recommendedAction: string;
  lastUpdated: string;
}

// === MEDMIJ / HL7 FHIR PEDIATRIC HOSPITAL GATEWAY ===
export interface FhirBundleExport {
  resourceType: 'Bundle';
  type: 'document';
  id: string;
  timestamp: string;
  targetHospital: 'EMMA_KINDERZIEKENHUIS_AMSTERDAM' | 'WILHELMINA_KINDERZIEKENHUIS_UTRECHT' | 'SOPHIA_KINDERZIEKENHUIS_ROTTERDAM';
  hospitalEpicOid: string;
  patientFhirId: string;
  medicationStatements: {
    code: string;
    display: string;
    dosageInstruction: string;
    route: string;
    emergencyStesolidProtocol: boolean;
  }[];
  criticalConditions: {
    system: string;
    code: string;
    display: string;
    clinicalStatus: 'active' | 'resolved';
  }[];
  nightWatchTelemetryVitals: {
    hrvLatestBpm: number;
    spo2LatestPercent: number;
    respiratoryBaseline: number;
  };
  transmissionStatus: 'VERIFIED_TRANSMITTED' | 'PENDING_ACK' | 'ENCRYPTED_RESTING';
  sha256FhirDigest: string;
}

// === DEMO SCENARIO MODES ===
export type DemoScenarioMode = 'SEIZURE_EMERGENCY' | 'DBA_SVB_AUDIT' | 'AAC_LARS_VOICE' | 'HOSPITAL_FHIR_TRANSFER';

// === AI SBAR CLINICAL VOICE HANDOVER ===
export interface SbarHandoverReport {
  id: string;
  timestamp: string;
  nurseName: string;
  nurseBig: string;
  shiftType: 'DAY_SHIFT' | 'EVENING_SHIFT' | 'NIGHT_WATCH';
  rawAudioTranscript: string;
  audioDurationSeconds: number;
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  administeredMeds: {
    name: string;
    time: string;
    route: string;
    verified: boolean;
  }[];
  criticalFlags: string[];
  svbBillableHours: number;
}

// === MULTI-FAMILY NEIGHBORHOOD ROUTE DISPATCHER ===
export interface NeighborhoodCareStop {
  id: string;
  familyId: string;
  childName: string;
  age: number;
  address: string;
  neighborhood: string;
  coordinates: { x: number; y: number }; // percentage on stylized SVG map
  timeWindow: string;
  careType: 'G_TUBE_FEED' | 'MEDICATION_ADMIN' | 'RESPITE_SUPERVISION' | 'TRACHEOSTOMY_SUCTION';
  status: 'PENDING' | 'EN_ROUTE' | 'COMPLETED';
  urgencyLevel: 'ROUTINE' | 'ELEVATED' | 'CRITICAL';
  estimatedDurationMinutes: number;
}

export interface MultiFamilyRoutePlan {
  id: string;
  date: string;
  nurseId: string;
  nurseName: string;
  transitMode: 'E_BIKE_SPEED_PEDELEC' | 'CAR_EV' | 'WALKING';
  totalDistanceKm: number;
  totalTransitTimeMinutes: number;
  totalPgbCareHours: number;
  stops: NeighborhoodCareStop[];
  co2SavedKg: number;
  standbyOverlapBenefitEuro: number;
}

// === PARAMEDIC IN-POCKET EMERGENCY CARD ===
export interface ParamedicPocketCard {
  cardId: string;
  patientName: string;
  dateOfBirth: string;
  bsnMasked: string;
  bloodGroup: string;
  weightKg: number;
  primaryDiagnosis: string;
  secondaryConditions: string[];
  criticalAirwayProfile: {
    gTubeSpec: string;
    emergencySuctionVacuum: string;
    tracheaNote: string;
  };
  rescueMedicationProtocol: {
    firstLine: string;
    firstLineDose: string;
    secondLine: string;
    secondLineDose: string;
    maxDosesBefore112: number;
  };
  emergencyContacts: {
    role: string;
    name: string;
    phone: string;
  }[];
  treatingPediatrician: {
    name: string;
    hospital: string;
    pagerNumber: string;
  };
  qrCodeSignatureHash: string;
  lastVerifiedDate: string;
}

