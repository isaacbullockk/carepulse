export type Language = 'en' | 'nl';

export interface Translations {
  common: {
    appName: string;
    tagline: string;
    subTagline: string;
    roleNurse: string;
    roleNurseShort: string;
    roleFacility: string;
    roleFacilityShort: string;
    roleParent: string;
    roleParentShort: string;
    roleAdmin: string;
    roleAdminShort: string;
    simulateUrgentPush: string;
    simulateLateCallOff: string;
    desktopView: string;
    mobileView: string;
    pushAlertStream: string;
    markAllRead: string;
    noNotifications: string;
    encryptedRealTime: string;
    hipaaGdprMode: string;
    footerTitle: string;
    footerSub: string;
    footerBigReg: string;
    footerSepa: string;
    footerHipaa: string;
    cancel: string;
    save: string;
    submit: string;
    close: string;
    view: string;
    approved: string;
    pending: string;
    verified: string;
    rejected: string;
    expired: string;
    clockedIn: string;
    settled: string;
    hours: string;
    bonus: string;
    total: string;
    status: string;
    actions: string;
    date: string;
    time: string;
    location: string;
    department: string;
    rate: string;
    specialty: string;
    distance: string;
    filterAll: string;
    language: string;
  };
  nurse: {
    bigVerifiedBadge: string;
    shiftsCountLabel: string;
    rateLabel: string;
    amsterdamRadius: string;
    onCallActive: string;
    onCallInactive: string;
    onCallDescActive: string;
    onCallDescPaused: string;
    toggleOnCall: string;
    augustEarnings: string;
    sepaAutomated: string;
    liveVacancyRadar: string;
    shiftsOpen: string;
    flashEmergencyBonuses: string;
    complianceSeal: string;
    compliant100: string;
    credentialsActive: string;
    payrollRouting: string;
    bankAccountsCount: string;
    splitSummary: string;
    urgentShiftRadarTab: string;
    availabilityMatrixTab: string;
    activeShiftTrackerTab: string;
    credentialVaultTab: string;
    verifiedStatus: string;
    multiBankPayrollTab: string;
    filterDepartment: string;
    allFacilities: string;
    hospitalsFilter: string;
    careHomesFilter: string;
    homeCareFilter: string;
    flashUrgentOnly: string;
    flashUrgentBadge: string;
    bigAclsRequired: string;
    staffingRatio: string;
    totalShiftPayout: string;
    bonusLabel: string;
    bookedRoster: string;
    requestedStatus: string;
    claimShift: string;
    weeklyAvailabilityTitle: string;
    weeklyAvailabilityDesc: string;
    autoMatchActive: string;
    shiftWindow: string;
    morningShift: string;
    openSlot: string;
    afternoonShift: string;
    criticalNightShift: string;
    nightShiftTip: string;
    selectAllOpen: string;
    liveActiveShift: string;
    elapsedShiftTime: string;
    gpsGeofencePerimeter: string;
    verifiedOnSite: string;
    accuracyVerified: string;
    clockInTime: string;
    todayLabel: string;
    scheduledEnd: string;
    accruingShiftValue: string;
    automatedPayoutCheckout: string;
    handoverNotes: string;
    handoverPlaceholder: string;
    endShiftSubmit: string;
    upcomingShifts: string;
    noActiveShifts: string;
    claimUrgentTip: string;
    confirmedRosterBadge: string;
    gpsClockIn: string;
    completedTimesheets: string;
    tableDate: string;
    tableFacility: string;
    tableHours: string;
    tableGrossPay: string;
    tableSignoff: string;
    tableStatus: string;
    pendingSignature: string;
    credentialVaultTitle: string;
    credentialVaultDesc: string;
    exportGdpr: string;
    uploadCert: string;
    issuerLabel: string;
    issuedLabel: string;
    expiresLabel: string;
    hashLabel: string;
    multiBankTitle: string;
    multiBankDesc: string;
    addBankAccount: string;
    saveSplitSettings: string;
    beneficiaryLabel: string;
    payoutAllocation: string;
    disbursedPayrollTitle: string;
    sepaClearedBadge: string;
    instantDisbursed: string;
    viewRemittance: string;
    claimShiftTitle: string;
    applyingFor: string;
    atFacility: string;
    compliancePreCheckPassed: string;
    compliancePreCheckDesc: string;
    optionalNoteLabel: string;
    optionalNotePlaceholder: string;
    submitInstantApp: string;
    uploadModalTitle: string;
    certNameLabel: string;
    certCategoryLabel: string;
    licenseNumberLabel: string;
    issuingBodyLabel: string;
    verifyAndAddToVault: string;
    addBankModalTitle: string;
    bankNameLabel: string;
    ibanLabel: string;
    accountPurposeLabel: string;
    purposeChecking: string;
    purposeTax: string;
    purposeBusiness: string;
    purposeSavings: string;
    addAccountBtn: string;
    splitLabel: string;
    licenseNo: string;
    issuer: string;
    validUntil: string;
  };
  parent: {
    parentPortalBadge: string;
    guardianLabel: string;
    childNameLabel: string;
    childAgeLabel: string;
    diagnosisSummary: string;
    autoProtectionActive: string;
    autoProtectionDesc: string;
    simulateCallOffBtn: string;
    broadcastSosBtn: string;
    tabAutoReplacement: string;
    tabSmartPlanner: string;
    tabCaregiverCircle: string;
    tabMedicalPassport: string;
    tabPgbSvb: string;

    // Emergency replacement
    incidentActiveHeader: string;
    incidentActiveSub: string;
    incidentTimelineHeader: string;
    noActiveIncidentHeader: string;
    noActiveIncidentSub: string;
    replacingStatusBadge: string;
    replacementFoundBadge: string;
    caregiverEnRouteBadge: string;
    callOffReasonLabel: string;
    originalCaregiverLabel: string;
    matchedCaregiverLabel: string;
    etaMinutesLabel: string;
    protocolDeliveredBadge: string;
    liveDistanceLabel: string;
    specialtiesMatch100: string;
    callReplacementCaregiver: string;
    acknowledgeHandoverBtn: string;
    resetEmergencySimulationBtn: string;

    // Smart Planner
    plannerHeader: string;
    plannerSub: string;
    autoPlanRosterBtn: string;
    addCareSlotBtn: string;
    scheduledCoverageHeader: string;
    filterAllDays: string;
    statusScheduled: string;
    statusLateCallOff: string;
    statusCompleted: string;
    careTypeMorning: string;
    careTypeAfterSchool: string;
    careTypeNightRespite: string;
    careTypeWeekend: string;
    specialNeedsFocusLabel: string;
    hoursAndRate: string;
    triggerCallOffForSlot: string;

    // Caregiver Circle
    circleHeader: string;
    circleSub: string;
    addCaregiverBtn: string;
    trustedPrimaryBadge: string;
    standbyFamiliarBadge: string;
    pediatricReserveBadge: string;
    completedShiftsCount: string;
    pediatricFirstAidBadge: string;
    epilepsyTrainedBadge: string;
    gTubeCertifiedBadge: string;
    onCallStandbyLive: string;
    requestStandbyShift: string;

    // Medical Passport
    passportHeader: string;
    passportSub: string;
    exportPassportBtn: string;
    seizureProtocolHeader: string;
    feedingProtocolHeader: string;
    medicationHeader: string;
    sensoryCalmingHeader: string;
    mobilityHeader: string;
    neurologistContact: string;

    // PGB & SVB
    pgbHeader: string;
    pgbSub: string;
    annualBudget: string;
    monthlyBudget: string;
    remainingBudget: string;
    hourlyRateLabel: string;
    svbSyncedActive: string;
    svbClientNumber: string;
    timesheetsReadySign: string;
    approveSvbTimesheet: string;
    exportSvbDeclaration: string;

    // Unique Moat Modules
    tabDigitalShadowing: string;
    tabPgbForecaster: string;
    tabNightWatchSentinel: string;
    tabStandbyRetainer: string;
    tabRespiteCoOp: string;
    tabAacCommunicator: string;
    tabCibgVault: string;
    tabWetDbaScorer: string;
    tabEmergencyInterceptor: string;

    // Digital Shadowing
    digitalShadowHeader: string;
    digitalShadowSub: string;
    watchMicroGuideBtn: string;
    takeTacitQuizBtn: string;
    verifiedByNursesLabel: string;
    quizModalTitle: string;
    quizPassScoreNotice: string;
    submitQuizAnswer: string;
    quizCorrectAlert: string;
    quizIncorrectAlert: string;

    // PGB Forecaster & Contracts
    burnRateHeader: string;
    burnRateSub: string;
    projectedYearEndBalance: string;
    burnRateOnTrackBadge: string;
    burnRateSurgeWarning: string;
    contractGenHeader: string;
    contractGenSub: string;
    generateWetDbaContractBtn: string;
    downloadContractPdfBtn: string;
    wetDbaCompliantBadge: string;

    // NightWatch Telemetry Sentinel
    nightWatchHeader: string;
    nightWatchSub: string;
    telemetryLiveBadge: string;
    heartRateLabel: string;
    spO2Label: string;
    motionScoreLabel: string;
    batteryLabel: string;
    triggerEpilepsyAlarmSim: string;
    resetTelemetrySim: string;
    epilepsyAlarmActiveTitle: string;

    // Standby Pool Retainer
    standbyRetainerHeader: string;
    standbyRetainerSub: string;
    activateRetainerBtn: string;
    deactivateRetainerBtn: string;
    guaranteedSlaArrival: string;
    hourlyStandbyCost: string;

    // Respite Co-Op Matcher
    respiteCoOpHeader: string;
    respiteCoOpSub: string;
    compatibleFamilyBadge: string;
    proposeSharedSessionBtn: string;
    sharedPgbSavingsBadge: string;
  };
  facility: {
    portalBadge: string;
    idLabel: string;
    coordinatorLabel: string;
    broadcastUrgentBtn: string;
    pendingRequests: string;
    applicantsLabel: string;
    instantApprovalReady: string;
    timesheetsSignoff: string;
    pendingLabel: string;
    multiBankReady: string;
    avgTimeToFill: string;
    minutesLabel: string;
    vsTraditional: string;
    complianceRate: string;
    verified100: string;
    auditCleared: string;
    applicantsQueueTab: string;
    postBroadcastTab: string;
    liveRosterTab: string;
    timesheetsTab: string;
    shiftClaimsTitle: string;
    shiftClaimsDesc: string;
    pendingActions: string;
    allHandledTitle: string;
    allHandledDesc: string;
    matchScore: string;
    appliedAt: string;
    declineBtn: string;
    instantApproveBtn: string;
    broadcastTitle: string;
    broadcastDesc: string;
    shiftTitleLabel: string;
    departmentLabel: string;
    shiftDateLabel: string;
    startTimeLabel: string;
    endTimeLabel: string;
    hourlyBaseRateLabel: string;
    urgentBonusLabel: string;
    patientRatioLabel: string;
    protocolDescLabel: string;
    calculatedPayout: string;
    broadcastAlertSubmit: string;
    rosterTitle: string;
    rosterDesc: string;
    liveRosterActive: string;
    assignedAssistant: string;
    awaitingMatch: string;
    shiftValue: string;
    timesheetSignoffTitle: string;
    timesheetSignoffDesc: string;
    waitingSignoff: string;
    noPendingTimesheets: string;
    clockOutsAppear: string;
    awaitingSignature: string;
    grossRemittance: string;
    signExecutePayrollBtn: string;
  };
  admin: {
    adminBadge: string;
    regulatoryStandards: string;
    opsTitle: string;
    opsDesc: string;
    exportAuditBundle: string;
    overallFillRate: string;
    fillRateSub: string;
    urgentTimeToFill: string;
    timeToFillSub: string;
    totalSettledPayroll: string;
    settledPayrollSub: string;
    agencyCostReduction: string;
    savedAmount: string;
    agencyCostSub: string;
    analyticsTab: string;
    payrollTab: string;
    complianceTab: string;
    securityTab: string;
    fillRatesTitle: string;
    fillRatesDesc: string;
    networkAvg: string;
    requestedVacancies: string;
    filledViaCarePulse: string;
    pushSpeedTitle: string;
    pushSpeedDesc: string;
    within30Mins: string;
    weeklyGrowthTitle: string;
    weeklyGrowthDesc: string;
    completedShifts: string;
    payrollEngineTitle: string;
    payrollEngineDesc: string;
    sepaConnected: string;
    settledBadge: string;
    batchId: string;
    grossPayout: string;
    viewRemittance: string;
    complianceHeaderTitle: string;
    complianceHeaderDesc: string;
    compliance100: string;
    seal: string;
    flagRevoke: string;
    verifySeal: string;
    auditStreamTitle: string;
    auditStreamDesc: string;
    searchAuditPlaceholder: string;
    timestampCol: string;
    actorRoleCol: string;
    actionTypeCol: string;
    auditDetailsCol: string;
    cryptographicSealCol: string;
  };
  invoice: {
    slipTitle: string;
    printSlip: string;
    automatedNode: string;
    caregiverContractor: string;
    sepaPaidBadge: string;
    invoiceNum: string;
    sepaBatch: string;
    paymentDate: string;
    clientFacility: string;
    deptDispatch: string;
    timesheetRef: string;
    signoffDoctor: string;
    itemDescription: string;
    hours: string;
    rate: string;
    total: string;
    clinicalShiftItem: string;
    urgentPremiumItem: string;
    flashIncentiveItem: string;
    bonusLabel: string;
    totalNetPayout: string;
    multiBankDisbursement: string;
    complianceNote: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      appName: 'CarePulse',
      tagline: 'MedDispatch 24/7',
      subTagline: 'On-Demand Medical & Family Care Planner Engine',
      roleNurse: 'Freelance Nurse',
      roleNurseShort: 'Nurse',
      roleFacility: 'Hospital / Care Home',
      roleFacilityShort: 'Facility',
      roleParent: 'Parents & Disabled Child Care',
      roleParentShort: 'Family Care / PGB',
      roleAdmin: 'Admin & Compliance',
      roleAdminShort: 'Admin',
      simulateUrgentPush: 'Simulate Hospital Push',
      simulateLateCallOff: '⚡ Simulate Late Call-Off & Fallback',
      desktopView: 'Desktop',
      mobileView: 'Mobile',
      pushAlertStream: 'Push Alert Stream',
      markAllRead: 'Mark all read',
      noNotifications: 'No push notifications yet',
      encryptedRealTime: 'Encrypted Real-Time WebSocket',
      hipaaGdprMode: 'HIPAA / GDPR Mode',
      footerTitle: 'CarePulse Medical & Family Dispatch',
      footerSub: 'Healthcare & Special Needs Caregiver Marketplace',
      footerBigReg: 'CIBG BIG Register Sync',
      footerSepa: 'Multi-Bank SEPA Automated Payroll & SVB PGB Engine',
      footerHipaa: 'HIPAA & GDPR Art. 20 Compliant',
      cancel: 'Cancel',
      save: 'Save Changes',
      submit: 'Submit',
      close: 'Close',
      view: 'View',
      approved: 'Approved',
      pending: 'Pending Review',
      verified: 'Verified',
      rejected: 'Flagged / Revoked',
      expired: 'Expired',
      clockedIn: 'Clocked In',
      settled: 'Settled & Paid',
      hours: 'hrs',
      bonus: 'Bonus',
      total: 'Total',
      status: 'Status',
      actions: 'Actions',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      department: 'Department',
      rate: 'Rate',
      specialty: 'Specialty',
      distance: 'Distance',
      filterAll: 'All Categories',
      language: 'Language',
    },
    nurse: {
      bigVerifiedBadge: 'CIBG BIG Verified',
      shiftsCountLabel: 'shifts completed',
      rateLabel: 'hr base',
      amsterdamRadius: 'Amsterdam Region (25km radius)',
      onCallActive: 'ONLINE & ON-CALL',
      onCallInactive: 'OFFLINE / PAUSED',
      onCallDescActive: 'Your profile is live on emergency dispatch radars. You receive instant push alerts with high flash bonuses.',
      onCallDescPaused: 'Instant dispatch is paused. You can still browse and claim scheduled shifts below.',
      toggleOnCall: 'Toggle Live Availability',
      augustEarnings: 'August Gross Earnings',
      sepaAutomated: 'SEPA Instant Automated',
      liveVacancyRadar: 'Live Vacancy Radar',
      shiftsOpen: 'vacancies matching credentials',
      flashEmergencyBonuses: 'Flash emergency bonuses active',
      complianceSeal: 'Compliance Status',
      compliant100: '100% Audit Verified',
      credentialsActive: 'BIG & certificates active',
      payrollRouting: 'Payroll Routing',
      bankAccountsCount: '2 Connected Bank Accounts',
      splitSummary: '70% Checking / 30% Tax',
      urgentShiftRadarTab: 'Urgent Shift Radar',
      availabilityMatrixTab: 'Availability Matrix',
      activeShiftTrackerTab: 'Live Shift Clock',
      credentialVaultTab: 'Credential Vault',
      verifiedStatus: 'Verified',
      multiBankPayrollTab: 'Multi-Bank Payroll',
      filterDepartment: 'Filter Department:',
      allFacilities: 'All Facilities & Wards',
      hospitalsFilter: 'Hospitals (ICU / ER)',
      careHomesFilter: 'Care Homes & Geriatrics',
      homeCareFilter: 'Home Care Agencies',
      flashUrgentOnly: '🚨 Flash Urgent Only',
      flashUrgentBadge: 'FLASH URGENT',
      bigAclsRequired: 'BIG & ACLS Required',
      staffingRatio: 'Staff-to-Patient Ratio',
      totalShiftPayout: 'Total Gross Payout',
      bonusLabel: 'Urgent Bonus',
      bookedRoster: 'Booked on Roster',
      requestedStatus: 'Requested',
      claimShift: 'Claim Shift',
      weeklyAvailabilityTitle: 'Weekly Shift Availability Matrix',
      weeklyAvailabilityDesc: 'Configure the time slots where hospitals and care homes can automatically dispatch you for emergency coverage.',
      autoMatchActive: 'Algorithm Auto-Match Active',
      shiftWindow: 'Shift Window',
      morningShift: 'Morning Shift',
      openSlot: 'Available',
      afternoonShift: 'Afternoon Shift',
      criticalNightShift: 'Night Shift / ICU',
      nightShiftTip: 'Hospitals pay a 25% premium for night and weekend availability.',
      selectAllOpen: 'Select All Available',
      liveActiveShift: 'Live Active Shift Tracker',
      elapsedShiftTime: 'Elapsed Time',
      gpsGeofencePerimeter: 'GPS Geofence Perimeter',
      verifiedOnSite: 'Verified On-Site (Amsterdam UMC)',
      accuracyVerified: '±3m geofence radius verified',
      clockInTime: 'Clock-In Time',
      todayLabel: 'Today',
      scheduledEnd: 'Scheduled End',
      accruingShiftValue: 'Accruing Shift Value',
      automatedPayoutCheckout: 'Automated SEPA upon checkout',
      handoverNotes: 'Clinical Handover Notes (Optional)',
      handoverPlaceholder: 'Log bed transitions, patient handover summary, or coordinator contact for electronic timesheet signoff...',
      endShiftSubmit: 'End Shift & Submit Timesheet',
      upcomingShifts: 'Upcoming Confirmed Shifts',
      noActiveShifts: 'No active shift clocked in right now.',
      claimUrgentTip: 'Claim an urgent shift from the radar or check in when you arrive on-site.',
      confirmedRosterBadge: 'CONFIRMED ROSTER',
      gpsClockIn: 'GPS Clock-In',
      completedTimesheets: 'Submitted Timesheets & Sign-Offs',
      tableDate: 'Date',
      tableFacility: 'Facility & Ward',
      tableHours: 'Hours',
      tableGrossPay: 'Gross Pay',
      tableSignoff: 'Supervisor Sign-off',
      tableStatus: 'Status',
      pendingSignature: 'Pending Signature',
      credentialVaultTitle: 'Regulatory Credential Vault',
      credentialVaultDesc: 'All licenses and background checks are cryptographically hashed and verified against the Dutch CIBG BIG-Register & Justis VOG database.',
      exportGdpr: 'Export Compliance Bundle (GDPR)',
      uploadCert: 'Upload New Credential',
      issuerLabel: 'Issuer',
      issuedLabel: 'Issued',
      expiresLabel: 'Expires',
      hashLabel: 'Seal',
      multiBankTitle: 'Multi-Bank Automated Payroll Allocation',
      multiBankDesc: 'Configure dynamic percentage routing for instant shift compensation. Earnings are automatically divided across accounts via SEPA Instant.',
      addBankAccount: 'Add Bank Account',
      saveSplitSettings: 'Save Allocation',
      beneficiaryLabel: 'Beneficiary',
      payoutAllocation: 'Payout Allocation',
      disbursedPayrollTitle: 'Disbursed Shift Remittance History',
      sepaClearedBadge: 'SEPA INSTANT CLEARED',
      instantDisbursed: 'Instant Disbursed',
      viewRemittance: 'View Remittance Slip',
      claimShiftTitle: 'Submit Instant Shift Application',
      applyingFor: 'You are applying for',
      atFacility: 'at',
      compliancePreCheckPassed: 'Credential Pre-Check: 100% Passed',
      compliancePreCheckDesc: 'Your BIG registration and ICU certifications meet all requirements. The hospital coordinator will be alerted immediately.',
      optionalNoteLabel: 'Optional Coordinator Note / ETA',
      optionalNotePlaceholder: 'E.g., I am 15 minutes away by car, trained in Epic EHR...',
      submitInstantApp: 'Submit 1-Click Application',
      uploadModalTitle: 'Upload & Verify Regulatory Credential',
      certNameLabel: 'Credential Name',
      certCategoryLabel: 'Category Type',
      licenseNumberLabel: 'License / Registration Number',
      issuingBodyLabel: 'Issuing Organization / Authority',
      verifyAndAddToVault: 'Verify & Add to Vault',
      addBankModalTitle: 'Add Bank Account for Payroll Routing',
      bankNameLabel: 'Bank Institution Name',
      ibanLabel: 'IBAN (International Bank Account Number)',
      accountPurposeLabel: 'Account Purpose',
      purposeChecking: 'Primary Checking Account',
      purposeTax: 'Tax / VAT Escrow (Belastingdienst)',
      purposeBusiness: 'Business Operations',
      purposeSavings: 'Savings / Buffer',
      addAccountBtn: 'Add Account',
      splitLabel: 'split',
      licenseNo: 'License No',
      issuer: 'Issuer',
      validUntil: 'Valid Until',
    },
    parent: {
      parentPortalBadge: 'Parent & Family Care Guardian',
      guardianLabel: 'Guardian: Sanne van Dijk (Mother)',
      childNameLabel: 'Child',
      childAgeLabel: 'years old',
      diagnosisSummary: 'Cerebral Palsy (GMFCS IV) & Epilepsy',
      autoProtectionActive: 'CarePulse Emergency Fallback: Active',
      autoProtectionDesc: 'If any caregiver calls off late, CarePulse automatically finds, verifies, and dispatches a pre-qualified familiar replacement within minutes.',
      simulateCallOffBtn: '⚡ Simulate Late Caregiver Call-Off',
      broadcastSosBtn: '🚨 Request Emergency Caregiver (SOS)',
      tabAutoReplacement: 'Emergency Fallback Hub',
      tabSmartPlanner: 'Smart Care Planner & Schedule',
      tabCaregiverCircle: 'Trusted Care Circle',
      tabMedicalPassport: 'Medical Care Passport',
      tabPgbSvb: 'PGB & SVB Budget',

      // Emergency replacement
      incidentActiveHeader: '🚨 Active Emergency Replacement Triggered',
      incidentActiveSub: 'A scheduled caregiver called off. CarePulse auto-dispatch has taken over planning to guarantee seamless child care.',
      incidentTimelineHeader: 'Real-Time Auto-Replacement Stepper',
      noActiveIncidentHeader: 'All Caregiver Shifts Confirmed & On-Track',
      noActiveIncidentSub: 'No active call-offs. Your 24/7 Standby Pediatric Pool is standing by for instant emergency response.',
      replacingStatusBadge: 'SEARCHING TRUSTED CIRCLE',
      replacementFoundBadge: 'REPLACEMENT CONFIRMED (2m 17s)',
      caregiverEnRouteBadge: 'CAREGIVER EN ROUTE (GPS LIVE)',
      callOffReasonLabel: 'Reason for Call-Off',
      originalCaregiverLabel: 'Original Caregiver',
      matchedCaregiverLabel: 'Matched Emergency Caregiver',
      etaMinutesLabel: 'Live ETA to Home',
      protocolDeliveredBadge: 'Medical Protocol & Sensory Plan Synced',
      liveDistanceLabel: 'Distance',
      specialtiesMatch100: '100% Pediatric Skill Match',
      callReplacementCaregiver: 'Call Caregiver Direct',
      acknowledgeHandoverBtn: 'Confirm & Acknowledge Arrival',
      resetEmergencySimulationBtn: 'Reset Fallback Simulation',

      // Smart Planner
      plannerHeader: 'Automated Care Calendar & Routine Planning',
      plannerSub: 'CarePulse takes over your weekly schedule, matching slots with certified pediatric caregivers from your trusted circle.',
      autoPlanRosterBtn: '✨ Auto-Fill Weekly Care Roster',
      addCareSlotBtn: '+ Add Care Slot',
      scheduledCoverageHeader: 'Weekly Specialized Care Coverage',
      filterAllDays: 'All Week',
      statusScheduled: 'Confirmed Caregiver',
      statusLateCallOff: 'Late Call-Off (Auto-Replaced)',
      statusCompleted: 'Care Completed',
      careTypeMorning: 'Morning Routine & G-Tube',
      careTypeAfterSchool: 'After-School & Therapy',
      careTypeNightRespite: 'Night Respite & Seizure Monitor',
      careTypeWeekend: 'Weekend Specialist Care',
      specialNeedsFocusLabel: 'Clinical & Daily Protocol Focus',
      hoursAndRate: 'PGB Rate',
      triggerCallOffForSlot: 'Simulate Call-Off for This Slot',

      // Caregiver Circle
      circleHeader: 'Child’s Trusted Care Circle & Standby Pool',
      circleSub: 'Caregivers who have completed home orientation with your child and hold verified pediatric credentials.',
      addCaregiverBtn: '+ Add Pre-Vetted Caregiver',
      trustedPrimaryBadge: 'PRIMARY TRUSTED',
      standbyFamiliarBadge: 'STANDBY FAMILIAR',
      pediatricReserveBadge: 'EMERGENCY RESERVE',
      completedShiftsCount: 'shifts with Lars',
      pediatricFirstAidBadge: 'Pediatric BLS',
      epilepsyTrainedBadge: 'Epilepsy & Stesolid',
      gTubeCertifiedBadge: 'G-Tube (Mic-Key)',
      onCallStandbyLive: 'On-Call for Emergencies',
      requestStandbyShift: 'Schedule Direct Care',

      // Medical Passport
      passportHeader: 'Emergency Medical & Calming Passport',
      passportSub: 'Instantly shared with replacement caregivers so they know exact seizure protocols, feeding amounts, and sensory calming techniques.',
      exportPassportBtn: '📄 Export Medical Passport (PDF)',
      seizureProtocolHeader: 'Acute Seizure Emergency Protocol (112 / Midazolam)',
      feedingProtocolHeader: 'Enteral Tube Feeding (G-Tube Mic-Key)',
      medicationHeader: 'Daily Medication Schedule',
      sensoryCalmingHeader: 'Sensory Triggers & Calming Preferences',
      mobilityHeader: 'Mobility & Hoist Transfer Guidelines',
      neurologistContact: 'Pediatric Neurologist Direct Line',

      // PGB & SVB
      pgbHeader: 'Persoonsgebonden Budget (PGB) & SVB Trekkingsrecht',
      pgbSub: 'Automated care hour tracking and digital timesheet declarations synced with the Sociale Verzekeringsbank (SVB).',
      annualBudget: 'Annual PGB Grant',
      monthlyBudget: 'Monthly PGB Allocation',
      remainingBudget: 'Remaining Budget',
      hourlyRateLabel: 'Standard PGB Hourly Tariff',
      svbSyncedActive: 'SVB Trekkingsrecht: Live Synced',
      svbClientNumber: 'SVB Client ID',
      timesheetsReadySign: 'Care Timesheets Ready for SVB Sign-Off',
      approveSvbTimesheet: '1-Click Approve & Transmit to SVB',
      exportSvbDeclaration: 'Export SVB Declaratie Overzicht',

      // Unique Moat Modules
      tabDigitalShadowing: 'Digital Shadowing & AI Twin',
      tabPgbForecaster: 'PGB Burn-Rate & Contracts',
      tabNightWatchSentinel: 'NightWatch™ Telemetry Sentinel',
      tabStandbyRetainer: 'Standby Retainer Pool',
      tabRespiteCoOp: 'Respite Co-Op Matcher',
      tabAacCommunicator: 'AAC Pictograms & Daily Life',
      tabCibgVault: 'CIBG BIG & NEN 7513 Vault',
      tabWetDbaScorer: 'Wet DBA Safe Harbor & Zorgkantoor',
      tabEmergencyInterceptor: '8-Min Emergency Route Interceptor',

      // Digital Shadowing
      digitalShadowHeader: 'Tacit Knowledge & Micro-Video Handover',
      digitalShadowSub: '30-second video walkthroughs recorded by Sanne. Replacement caregivers must pass a 60-second tacit check before arrival.',
      watchMicroGuideBtn: 'Watch Protocol Walkthrough',
      takeTacitQuizBtn: 'Take Caregiver Tacit Check',
      verifiedByNursesLabel: 'caregivers verified on this guide',
      quizModalTitle: 'Caregiver Tacit Knowledge Verification',
      quizPassScoreNotice: 'Required for all standby replacements before entering the home.',
      submitQuizAnswer: 'Submit & Verify Competence',
      quizCorrectAlert: 'Tacit Verification Passed! Caregiver is cleared for this protocol.',
      quizIncorrectAlert: 'Incorrect answer. Please re-watch the parent video guide before proceeding.',

      // PGB Forecaster & Contracts
      burnRateHeader: 'PGB Burn-Rate AI Forecast & Budget Modeling',
      burnRateSub: 'Predicts budget exhaustion based on school terms and holiday respite surges, avoiding unexpected budget deficits.',
      projectedYearEndBalance: 'Projected Year-End Budget Surplus',
      burnRateOnTrackBadge: 'BUDGET TRAJECTORY: OPTIMAL',
      burnRateSurgeWarning: 'SUMMER RESURGE ACCOUNTED FOR',
      contractGenHeader: 'Wet DBA & Belastingdienst Compliant Contracts',
      contractGenSub: 'Auto-generates model contracts (Zorgovereenkomst van Opdracht) protecting parents and ZZP nurses from sham self-employment claims.',
      generateWetDbaContractBtn: 'Generate Compliant Model Contract',
      downloadContractPdfBtn: 'Download Signed SVB Contract (JSON/PDF)',
      wetDbaCompliantBadge: 'WET DBA EXEMPTION CERTIFIED',

      // NightWatch Telemetry Sentinel
      nightWatchHeader: 'NightWatch™ Live Epilepsy & Biometric Sentinel',
      nightWatchSub: 'Real-time telemetry stream from Lars’s NightWatch epilepsy sensor and Masimo pulse oximeter for overnight respite peace of mind.',
      telemetryLiveBadge: 'IOT SENSOR STREAM ACTIVE (0.2s LATENCY)',
      heartRateLabel: 'Heart Rate',
      spO2Label: 'Oxygen Saturation',
      motionScoreLabel: 'Movement / Convulsion Index',
      batteryLabel: 'Sensor Battery',
      triggerEpilepsyAlarmSim: '⚡ Simulate Nocturnal Seizure Telemetry',
      resetTelemetrySim: 'Reset to Normal Resting State',
      epilepsyAlarmActiveTitle: '🚨 CRITICAL: NOCTURNAL SEIZURE DETECTED BY NIGHTWATCH SENSOR',

      // Standby Pool Retainer
      standbyRetainerHeader: 'Paid Standby Retainer Micro-Economy',
      standbyRetainerSub: 'Allocate a small PGB retainer (€3.50-€4.00/hr) to guarantee 2-3 neighborhood nurses are on-call within a 15-minute arrival radius.',
      activateRetainerBtn: 'Activate Retainer (€4.00/hr)',
      deactivateRetainerBtn: 'Pause Retainer',
      guaranteedSlaArrival: 'Guaranteed Emergency SLA',
      hourlyStandbyCost: 'PGB Retainer Tariff',

      // Respite Co-Op Matcher
      respiteCoOpHeader: 'Neighborhood Respite Co-Ops & Shared Care',
      respiteCoOpSub: 'Connect with verified local families with compatible children to co-book pediatric nurses, halving PGB costs and fostering social connection.',
      compatibleFamilyBadge: '98% COMPATIBILITY MATCH',
      proposeSharedSessionBtn: 'Propose Shared Outing / Respite',
      sharedPgbSavingsBadge: '50% PGB COST SAVING PER FAMILY',
    },
    facility: {
      portalBadge: 'Healthcare Facility Portal',
      idLabel: 'Facility ID',
      coordinatorLabel: 'Duty Coordinator: Dr. M. de Boer',
      broadcastUrgentBtn: 'Post Urgent Shift Vacancy',
      pendingRequests: 'Shift Requests',
      applicantsLabel: 'Pre-screened applicants',
      instantApprovalReady: 'Instant 1-Click approval ready',
      timesheetsSignoff: 'Timesheets to Sign',
      pendingLabel: 'Pending coordinator approval',
      multiBankReady: 'Triggers instant SEPA multi-bank',
      avgTimeToFill: 'Average Time to Fill',
      minutesLabel: 'min',
      vsTraditional: 'vs 48 hrs agency benchmark',
      complianceRate: 'Staff Credential Rate',
      verified100: '100% Verified',
      auditCleared: 'BIG & VOG audit cleared',
      applicantsQueueTab: 'Applicants Queue',
      postBroadcastTab: 'Broadcast Urgent Shift',
      liveRosterTab: 'Live On-Site Roster',
      timesheetsTab: 'Timesheet Electronic Sign-Off',
      shiftClaimsTitle: 'Shift Applications Awaiting Approval',
      shiftClaimsDesc: 'Review and approve pre-screened nurses and assistants with verified CIBG credentials.',
      pendingActions: 'Pending Actions',
      allHandledTitle: 'All Applicants Processed',
      allHandledDesc: 'No pending applications at this moment. You can post a new urgent vacancy broadcast anytime.',
      matchScore: 'Specialty Match',
      appliedAt: 'Applied',
      declineBtn: 'Decline',
      instantApproveBtn: '1-Click Approve & Book',
      broadcastTitle: 'Post Urgent Shift Broadcast',
      broadcastDesc: 'Instantly notify all on-call nurses and healthcare assistants in your geographic perimeter with push alerts.',
      shiftTitleLabel: 'Shift Title & Role',
      departmentLabel: 'Department / Ward',
      shiftDateLabel: 'Shift Date',
      startTimeLabel: 'Start Time',
      endTimeLabel: 'End Time',
      hourlyBaseRateLabel: 'Base Hourly Rate (€)',
      urgentBonusLabel: 'Flash Urgency Bonus (€)',
      patientRatioLabel: 'Patient-to-Staff Ratio',
      protocolDescLabel: 'Ward Scope & Clinical Notes',
      calculatedPayout: 'Calculated Shift Gross Payout',
      broadcastAlertSubmit: '🚀 Broadcast Urgent Shift Alert',
      rosterTitle: 'Live On-Duty Facility Roster',
      rosterDesc: 'Real-time overview of freelance medical personnel currently active and verified on-site.',
      liveRosterActive: 'Live Roster Active',
      assignedAssistant: 'Assigned Assistant',
      awaitingMatch: 'Awaiting Nurse Match',
      shiftValue: 'Shift Value',
      timesheetSignoffTitle: 'Electronic Timesheet Sign-Off & Automated Payroll',
      timesheetSignoffDesc: 'Signing off a completed timesheet automatically triggers an immediate SEPA instant payout across the nurse’s configured bank accounts.',
      waitingSignoff: 'Waiting Sign-Off',
      noPendingTimesheets: 'No timesheets awaiting review.',
      clockOutsAppear: 'When nurses clock out on-site, their timesheets will appear here for signature.',
      awaitingSignature: 'Awaiting Coordinator Signature',
      grossRemittance: 'Gross Remittance',
      signExecutePayrollBtn: 'Sign & Release SEPA Payroll',
    },
    admin: {
      adminBadge: 'Platform Admin & Compliance',
      regulatoryStandards: 'ISO 27001 • HIPAA • AVG / GDPR Art. 20',
      opsTitle: 'Executive Staffing Operations & Multi-Bank Payroll Control',
      opsDesc: 'Monitor hospital staffing efficiency, automate SEPA disbursements, and inspect real-time regulatory compliance audit logs.',
      exportAuditBundle: 'Export Compliance Audit Bundle (GDPR/HIPAA)',
      overallFillRate: 'Overall Fill Rate',
      fillRateSub: '+14% vs last quarter',
      urgentTimeToFill: 'Avg Urgent Fill Time',
      timeToFillSub: 'Fastest in network: 4 mins',
      totalSettledPayroll: 'Total Settled Payroll',
      settledPayrollSub: '100% automated SEPA split',
      agencyCostReduction: 'Agency Cost Savings',
      savedAmount: '€142,850 saved',
      agencyCostSub: 'Eliminated agency markups',
      analyticsTab: 'Staffing Analytics',
      payrollTab: 'Multi-Bank Payroll Engine',
      complianceTab: 'Credential Compliance',
      securityTab: 'Audit & Security Trail',
      fillRatesTitle: 'Hospital & Care Home Staffing Fill Rates',
      fillRatesDesc: 'Requested vs successfully staffed shifts across healthcare departments',
      networkAvg: 'Network Average: 96.4%',
      requestedVacancies: 'Requested Vacancies',
      filledViaCarePulse: 'Filled via CarePulse',
      pushSpeedTitle: 'Urgent Push Response Speed',
      pushSpeedDesc: 'Distribution of shift claiming latency from push alert notification',
      within30Mins: '88% filled within 30 mins',
      weeklyGrowthTitle: 'Weekly Shift Volume & Growth',
      weeklyGrowthDesc: 'Total shifts completed across healthcare network',
      completedShifts: 'Completed Shifts',
      payrollEngineTitle: 'Multi-Bank Automated SEPA / ACH Payroll Engine',
      payrollEngineDesc: 'Zero-delay shift payouts routed dynamically to clinicians checking and tax escrow accounts upon supervisor signature.',
      sepaConnected: 'SEPA Instant API: Connected',
      settledBadge: 'SETTLED & PAID',
      batchId: 'SEPA Batch',
      grossPayout: 'Gross Payout',
      viewRemittance: 'View Remittance',
      complianceHeaderTitle: 'Clinician Credential & Registration Compliance',
      complianceHeaderDesc: 'Automated verification with CIBG BIG-Register, Ministry of Health and Justis background registry.',
      compliance100: '100% Regulatory Compliant',
      seal: 'Seal',
      flagRevoke: 'Flag / Revoke',
      verifySeal: 'Verify Seal',
      auditStreamTitle: 'Immutable Security & HIPAA/GDPR Audit Stream',
      auditStreamDesc: 'Every authorization, dispatch, credential verification, and SEPA transaction is cryptographically signed and logged.',
      searchAuditPlaceholder: 'Search audit trail by actor, action or seal...',
      timestampCol: 'Timestamp (UTC)',
      actorRoleCol: 'Actor & Role',
      actionTypeCol: 'Action Type',
      auditDetailsCol: 'Audit Details',
      cryptographicSealCol: 'Cryptographic Seal',
    },
    invoice: {
      slipTitle: 'Automated Healthcare Shift Remittance Slip',
      printSlip: 'Print Remittance Slip',
      automatedNode: 'Automated Medical Payroll & Settlement Node',
      caregiverContractor: 'Caregiver (Freelance Contractor)',
      sepaPaidBadge: 'SEPA Instant Settled',
      invoiceNum: 'Invoice Number',
      sepaBatch: 'SEPA Batch ID',
      paymentDate: 'Disbursement Date',
      clientFacility: 'Client Facility',
      deptDispatch: 'Department: Critical Care Dispatch',
      timesheetRef: 'Timesheet Ref',
      signoffDoctor: 'Signed by: Dr. M. de Boer',
      itemDescription: 'Item & Clinical Description',
      hours: 'Hours',
      rate: 'Rate',
      total: 'Total',
      clinicalShiftItem: 'Shift coverage according to approved timesheet',
      urgentPremiumItem: 'Flash Emergency Incentive Bonus',
      flashIncentiveItem: 'Critical staffing rapid dispatch bonus',
      bonusLabel: 'Fixed Bonus',
      totalNetPayout: 'Total Net Payout (0% Healthcare VAT Exemption)',
      multiBankDisbursement: 'Multi-Bank Automated Disbursement Breakdown',
      complianceNote: 'GDPR Article 20 Certified | HIPAA Audit Compliant | Encrypted SEPA XML Export',
    },
  },
  nl: {
    common: {
      appName: 'CarePulse',
      tagline: 'ZorgDispatch 24/7',
      subTagline: 'On-Demand Medische & Gezinszorg Planning Engine',
      roleNurse: 'ZZP Zorgverlener / Verpleegkundige',
      roleNurseShort: 'Verpleegkundige',
      roleFacility: 'Ziekenhuis / Zorginstelling',
      roleFacilityShort: 'Instelling',
      roleParent: 'Ouders & Zorg Zorgintensief Kind (PGB)',
      roleParentShort: 'Gezinszorg / PGB',
      roleAdmin: 'Beheer & Compliance',
      roleAdminShort: 'Beheerder',
      simulateUrgentPush: 'Simuleer Ziekenhuis Spoedoproep',
      simulateLateCallOff: '⚡ Simuleer Uitval & Automatische Vervanging',
      desktopView: 'Desktop',
      mobileView: 'Mobiel',
      pushAlertStream: 'Live Notificatiestroom',
      markAllRead: 'Alles als gelezen markeren',
      noNotifications: 'Geen meldingen op dit moment',
      encryptedRealTime: 'Versleutelde Real-Time WebSocket',
      hipaaGdprMode: 'AVG / GDPR & HIPAA Beveiligd',
      footerTitle: 'CarePulse Medische & Gezinsdispatch',
      footerSub: 'Platform voor Zorgprofessionals & Zorgintensieve Gezinnen',
      footerBigReg: 'CIBG BIG-register Koppeling',
      footerSepa: 'Geautomatiseerde Multi-Bank SEPA & SVB PGB Motor',
      footerHipaa: 'AVG (GDPR) Art. 20 & Wkkgz Conform',
      cancel: 'Annuleren',
      save: 'Wijzigingen Opslaan',
      submit: 'Versturen',
      close: 'Sluiten',
      view: 'Bekijken',
      approved: 'Goedgekeurd',
      pending: 'In Beoordeling',
      verified: 'Geverifieerd',
      rejected: 'Gemarkeerd / Ingetrokken',
      expired: 'Verlopen',
      clockedIn: 'Ingeklokt',
      settled: 'Uitbetaald & Afgewikkeld',
      hours: 'uur',
      bonus: 'Toeslag',
      total: 'Totaal',
      status: 'Status',
      actions: 'Acties',
      date: 'Datum',
      time: 'Tijd',
      location: 'Locatie',
      department: 'Afdeling',
      rate: 'Uurtarief',
      specialty: 'Specialisme',
      distance: 'Afstand',
      filterAll: 'Alle Categorieën',
      language: 'Taal',
    },
    nurse: {
      bigVerifiedBadge: 'CIBG BIG Geverifieerd',
      shiftsCountLabel: 'diensten voltooid',
      rateLabel: 'uur basis',
      amsterdamRadius: 'Regio Amsterdam (straal 25 km)',
      onCallActive: 'ONLINE & DIRECT OPROEPBAAR',
      onCallInactive: 'OFFLINE / PAUZE',
      onCallDescActive: 'Je profiel is direct zichtbaar op spoedradars van ziekenhuizen. Je ontvangt directe pushberichten met spoedtoeslagen.',
      onCallDescPaused: 'Directe oproepfunctie staat gepauzeerd. Je kunt nog steeds geplande diensten bekijken en aannemen.',
      toggleOnCall: 'Beschikbaarheid Wijzigen',
      augustEarnings: 'Bruto Inkomsten Augustus',
      sepaAutomated: 'SEPA Instant Geautomatiseerd',
      liveVacancyRadar: 'Live Dienstenradar',
      shiftsOpen: 'openstaande diensten passend bij bevoegdheid',
      flashEmergencyBonuses: 'Spoedtoeslagen actief',
      complianceSeal: 'Compliance Status',
      compliant100: '100% Geauditeerd & Akkoord',
      credentialsActive: 'BIG & certificaten actief',
      payrollRouting: 'Uitbetalingsverdeling',
      bankAccountsCount: '2 Gekoppelde Bankrekeningen',
      splitSummary: '70% Rekening-courant / 30% Belastingdepot',
      urgentShiftRadarTab: 'Spoeddiensten Radar',
      availabilityMatrixTab: 'Beschikbaarheidsmatrix',
      activeShiftTrackerTab: 'Live Diensttijdklok',
      credentialVaultTab: 'Kwalificatiekluis',
      verifiedStatus: 'Geverifieerd',
      multiBankPayrollTab: 'Multi-Bank Uitbetaling',
      filterDepartment: 'Filter Afdeling:',
      allFacilities: 'Alle Zorginstellingen & Afdelingen',
      hospitalsFilter: 'Ziekenhuizen (IC / SEH)',
      careHomesFilter: 'Verpleeghuizen & Geriatrie',
      homeCareFilter: 'Thuiszorgorganisaties',
      flashUrgentOnly: '🚨 Alleen Spoeddiensten',
      flashUrgentBadge: 'SPOEDDIENST',
      bigAclsRequired: 'BIG & ACLS Vereist',
      staffingRatio: 'Patiënt-Zorgverlener Ratio',
      totalShiftPayout: 'Totale Bruto Vergoeding',
      bonusLabel: 'Spoedtoeslag',
      bookedRoster: 'Ingepland op Rooster',
      requestedStatus: 'Aangevraagd',
      claimShift: 'Dienst Aannemen',
      weeklyAvailabilityTitle: 'Wekelijkse Beschikbaarheidsmatrix',
      weeklyAvailabilityDesc: 'Geef aan op welke dagdelen ziekenhuizen en zorginstellingen jou automatisch kunnen inzetten voor acute diensten.',
      autoMatchActive: 'Algoritme Auto-Match Actief',
      shiftWindow: 'Dienstvenster',
      morningShift: 'Ochtenddienst',
      openSlot: 'Beschikbaar',
      afternoonShift: 'Avonddienst',
      criticalNightShift: 'Nachtdienst / IC',
      nightShiftTip: 'Ziekenhuizen betalen 25% onregelmatigheidstoeslag (ORT) voor nacht- en weekendbeschikbaarheid.',
      selectAllOpen: 'Alles als Beschikbaar Selecteren',
      liveActiveShift: 'Live Dienstregistratie & Geofence',
      elapsedShiftTime: 'Verstreken Tijd',
      gpsGeofencePerimeter: 'GPS Geofence Perimeter',
      verifiedOnSite: 'Aanwezigheid Geverifieerd (Amsterdam UMC)',
      accuracyVerified: '±3m geofence straal bevestigd',
      clockInTime: 'Inkloktijd',
      todayLabel: 'Vandaag',
      scheduledEnd: 'Gepland Einde',
      accruingShiftValue: 'Opgebouwde Dienstvergoeding',
      automatedPayoutCheckout: 'Automatische SEPA-uitbetaling bij uitklokken',
      handoverNotes: 'Klinische Overdrachtsnotities (Optioneel)',
      handoverPlaceholder: 'Noteer bijzonderheden, patiëntenoverdracht of contactpersoon voor de digitale accordering...',
      endShiftSubmit: 'Dienst Beëindigen & Urenstaat Indienen',
      upcomingShifts: 'Aankomende Bevestigde Diensten',
      noActiveShifts: 'Momenteel geen actieve dienst ingeklokt.',
      claimUrgentTip: 'Neem een spoedoproep aan via de radar of klok in zodra je op de locatie arriveert.',
      confirmedRosterBadge: 'BEVESTIGD OP ROOSTER',
      gpsClockIn: 'GPS Inklokken',
      completedTimesheets: 'Ingediende Urenstaten & Accorderingen',
      tableDate: 'Datum',
      tableFacility: 'Instelling & Afdeling',
      tableHours: 'Uren',
      tableGrossPay: 'Bruto Bedrag',
      tableSignoff: 'Handtekening Coördinator',
      tableStatus: 'Status',
      pendingSignature: 'Wacht op Accordering',
      credentialVaultTitle: 'Kwalificatiekluis & BIG-Register',
      credentialVaultDesc: 'Alle bevoegdheden en VOG-documenten zijn cryptografisch beveiligd en geverifieerd bij het CIBG BIG-register en Justis.',
      exportGdpr: 'Exporteer AVG-Dossier (GDPR)',
      uploadCert: 'Nieuw Certificaat Uploaden',
      issuerLabel: 'Instantie',
      issuedLabel: 'Uitgegeven',
      expiresLabel: 'Geldig tot',
      hashLabel: 'Zegel',
      multiBankTitle: 'Multi-Bank Geautomatiseerde Uitbetalingsverdeling',
      multiBankDesc: 'Stel de percentages in voor automatische splitsing van inkomsten. Uitbetalingen verlopen direct via SEPA Instant naar jouw rekeningen.',
      addBankAccount: 'Bankrekening Toevoegen',
      saveSplitSettings: 'Verdeling Opslaan',
      beneficiaryLabel: 'Rekeninghouder',
      payoutAllocation: 'Uitbetalingspercentage',
      disbursedPayrollTitle: 'Overzicht Uitbetaalde Vergoedingen',
      sepaClearedBadge: 'SEPA INSTANT VOLTOOID',
      instantDisbursed: 'Direct Uitbetaald',
      viewRemittance: 'Specificatie Bekijken',
      claimShiftTitle: 'Direct Reageren op Dienst',
      applyingFor: 'Je reageert op de dienst',
      atFacility: 'bij',
      compliancePreCheckPassed: 'Kwalificatiecontrole: 100% Goedgekeurd',
      compliancePreCheckDesc: 'Jouw BIG-registratie en IC-aantekening voldoen aan alle eisen. De zorgcoördinator ontvangt direct een notificatie.',
      optionalNoteLabel: 'Optionele Opmerking / Reistijd (ETA)',
      optionalNotePlaceholder: 'Bijv. Ik ben binnen 15 minuten ter plaatse met de auto, ervaring met Epic / HiX EPD...',
      submitInstantApp: '1-Klik Aanvraag Bevestigen',
      uploadModalTitle: 'Certificaat of Bevoegdheid Toevoegen',
      certNameLabel: 'Naam van Certificaat / Bevoegdheid',
      certCategoryLabel: 'Categorie',
      licenseNumberLabel: 'Registratienummer / BIG-nummer',
      issuingBodyLabel: 'Uitgevende Instantie / Orgaan',
      verifyAndAddToVault: 'Verifiëren & Opslaan in Kluis',
      addBankModalTitle: 'Bankrekening Toevoegen voor Uitbetaling',
      bankNameLabel: 'Naam Bankinstelling',
      ibanLabel: 'IBAN (Internationaal Rekeningnummer)',
      accountPurposeLabel: 'Doel van Rekening',
      purposeChecking: 'Zakelijke Rekening-courant',
      purposeTax: 'Btw- / Belastingreserve (Belastingdienst)',
      purposeBusiness: 'Bedrijfsspaarrekening',
      purposeSavings: 'Privérekening / Buffer',
      addAccountBtn: 'Rekening Opslaan',
      splitLabel: 'deel',
      licenseNo: 'Registratienr',
      issuer: 'Instantie',
      validUntil: 'Geldig tot',
    },
    parent: {
      parentPortalBadge: 'Ouder- & Gezinszorgportaal',
      guardianLabel: 'Zorgvrager / Ouder: Sanne van Dijk',
      childNameLabel: 'Kind',
      childAgeLabel: 'jaar oud',
      diagnosisSummary: 'Cerebrale Parese (GMFCS IV) & Epilepsie',
      autoProtectionActive: 'CarePulse Automatische Vervanging: Actief',
      autoProtectionDesc: 'Wanneer een zorgverlener onverwacht uitvalt, neemt CarePulse de planning direct over en vindt automatisch binnen enkele minuten een gekwalificeerde vervanger uit jouw vertrouwde kring.',
      simulateCallOffBtn: '⚡ Simuleer Plotselinge Afzegging Zorgverlener',
      broadcastSosBtn: '🚨 Spoedvervanging Aanvragen (SOS)',
      tabAutoReplacement: 'Acute Vervangingscentrale',
      tabSmartPlanner: 'Slimme Zorgplanner & Rooster',
      tabCaregiverCircle: 'Vertrouwde Zorgcirkel',
      tabMedicalPassport: 'Medisch Zorgpaspoort',
      tabPgbSvb: 'PGB & SVB Budget',

      // Emergency replacement
      incidentActiveHeader: '🚨 Automatische Spoedvervanging Geactiveerd',
      incidentActiveSub: 'Een ingeplande zorgverlener heeft zich plotseling ziek gemeld. CarePulse heeft direct de planning overgenomen om de zorg voor Lars te waarborgen.',
      incidentTimelineHeader: 'Live Voortgang Vervangingsmotor',
      noActiveIncidentHeader: 'Alle Zorgdiensten Bevestigd & Onder Controle',
      noActiveIncidentSub: 'Momenteel geen uitval. Jouw 24/7 Standby Kinderzorgteam staat klaar voor acute noodgevallen.',
      replacingStatusBadge: 'ZOEKT IN VERTROUWDE KRING',
      replacementFoundBadge: 'VERVANGER GEVONDEN (2m 17s)',
      caregiverEnRouteBadge: 'ZORGVERLENER ONDERWEG (LIVE GPS)',
      callOffReasonLabel: 'Reden van Afmelding',
      originalCaregiverLabel: 'Oorspronkelijke Zorgverlener',
      matchedCaregiverLabel: 'Gekoppelde Spoedzorgverlener',
      etaMinutesLabel: 'Geschatte Aankomsttijd (ETA)',
      protocolDeliveredBadge: 'Medisch Protocol & Overdracht Gesynchroniseerd',
      liveDistanceLabel: 'Afstand tot woonadres',
      specialtiesMatch100: '100% Bevoegdheid & Match',
      callReplacementCaregiver: 'Bel Zorgverlener Direct',
      acknowledgeHandoverBtn: 'Aankomst Bevestigen & Accorderen',
      resetEmergencySimulationBtn: 'Simulatie Herstellen',

      // Smart Planner
      plannerHeader: 'Geautomatiseerd Zorgrooster & Dagplanning',
      plannerSub: 'CarePulse neemt de complexe weekplanning uit handen en koppelt vaste zorgmomenten automatisch aan gecertificeerde zorgprofessionals.',
      autoPlanRosterBtn: '✨ Weekrooster Automatisch Vullen',
      addCareSlotBtn: '+ Zorgmoment Toevoegen',
      scheduledCoverageHeader: 'Ingeplande Gespecialiseerde Zorg',
      filterAllDays: 'Hele Week',
      statusScheduled: 'Bevestigde Zorgverlener',
      statusLateCallOff: 'Uitval (Automatisch Vervangen)',
      statusCompleted: 'Zorg Voltooid',
      careTypeMorning: 'Ochtendroutine & Sondevoeding',
      careTypeAfterSchool: 'Na-schoolse Zorg & Fysio',
      careTypeNightRespite: 'Nachtzorg & Epilepsiemonitoring',
      careTypeWeekend: 'Weekend Zorg & Respite',
      specialNeedsFocusLabel: 'Medische & Dagelijkse Aandachtspunten',
      hoursAndRate: 'PGB Tarief',
      triggerCallOffForSlot: 'Simuleer Afmelding voor dit Moment',

      // Caregiver Circle
      circleHeader: 'Vertrouwde Zorgcirkel & Standby Reserve',
      circleSub: 'Zorgverleners die ingewerkt zijn bij Lars en beschikken over geverifieerde kinderverpleegkundige bevoegdheden.',
      addCaregiverBtn: '+ Nieuwe Zorgverlener Toevoegen',
      trustedPrimaryBadge: 'VASTE ZORGVERLENER',
      standbyFamiliarBadge: 'VERTROUWDE STANDBY',
      pediatricReserveBadge: 'SPOEDRESERVE',
      completedShiftsCount: 'diensten bij Lars',
      pediatricFirstAidBadge: 'Kinder-EHBO / BLS',
      epilepsyTrainedBadge: 'Epilepsie & Stesolid',
      gTubeCertifiedBadge: 'Sondevoeding (Mic-Key)',
      onCallStandbyLive: 'Oproepbaar voor Spoed',
      requestStandbyShift: 'Direct Inplannen',

      // Medical Passport
      passportHeader: 'Digitaal Medisch Zorg- & Noodpaspoort',
      passportSub: 'Wordt direct en veilig gedeeld met een invallende zorgverlener, zodat deze exact op de hoogte is van het aanvalsprotocol, sondehoeveelheden en prikkelverwerking.',
      exportPassportBtn: '📄 Exporteer Zorgpaspoort (PDF)',
      seizureProtocolHeader: 'Aanvalsprotocol & Noodmedicatie (112 / Midazolam)',
      feedingProtocolHeader: 'Sondevoeding & Vochtinname (Mic-Key)',
      medicationHeader: 'Dagelijks Medicatieschema',
      sensoryCalmingHeader: 'Prikkelverwerking & Rustgevende Gewoontes',
      mobilityHeader: 'Mobiliteit & Instructies Plafondlift',
      neurologistContact: 'Kinderspecialist & Ziekenhuis Contact',

      // PGB & SVB
      pgbHeader: 'Persoonsgebonden Budget (PGB) & SVB Trekkingsrecht',
      pgbSub: 'Automatische urenregistratie en declaraties gekoppeld aan de Sociale Verzekeringsbank (SVB).',
      annualBudget: 'Jaarlijks PGB Budget',
      monthlyBudget: 'Maandelijks Budget',
      remainingBudget: 'Resterend Budget',
      hourlyRateLabel: 'Standaard PGB Uurtarief',
      svbSyncedActive: 'SVB Trekkingsrecht: Live Gekoppeld',
      svbClientNumber: 'SVB Cliëntnummer',
      timesheetsReadySign: 'Urenstaten klaar voor SVB Accordering',
      approveSvbTimesheet: '1-Klik Goedkeuren & Naar SVB Sturen',
      exportSvbDeclaration: 'SVB Declaratieoverzicht Exporteren',

      // Unique Moat Modules
      tabDigitalShadowing: 'Digitaal Schaduwen & AI-Twin',
      tabPgbForecaster: 'PGB Burn-Rate & DBA Contracten',
      tabNightWatchSentinel: 'NightWatch™ Telemetrie Sentinel',
      tabStandbyRetainer: 'Standby Retainer Pool',
      tabRespiteCoOp: 'Respite Buurt Co-Op',
      tabAacCommunicator: 'AAC Pictogrammen & Mijn Dag',
      tabCibgVault: 'CIBG BIG & NEN 7513 Vault',
      tabWetDbaScorer: 'Wet DBA Safe Harbor & Zorgkantoor',
      tabEmergencyInterceptor: '8-Minuten Spoed Interceptor',

      // Digital Shadowing
      digitalShadowHeader: 'Stille Kennis & Video Micro-Overdracht',
      digitalShadowSub: 'Korte video-instructies opgenomen door Sanne. Invallers doorlopen voor aankomst een 60-seconden verificatie van kindspecifieke signalen.',
      watchMicroGuideBtn: 'Bekijk Protocol Video',
      takeTacitQuizBtn: 'Doe Kennisverificatie',
      verifiedByNursesLabel: 'zorgverleners geslaagd voor deze gids',
      quizModalTitle: 'Verificatie Stille Kennis & Handelingen',
      quizPassScoreNotice: 'Verplicht voor alle standby-zorgverleners alvorens de woning te betreden.',
      submitQuizAnswer: 'Antwoord Indienen & Vrijgeven',
      quizCorrectAlert: 'Verificatie Geslaagd! Zorgverlener is bevoegd verklaard voor dit kindspecifieke protocol.',
      quizIncorrectAlert: 'Helaas onjuist. Bekijk de videohandleiding van de ouder opnieuw voordat je verdergaat.',

      // PGB Forecaster & Contracts
      burnRateHeader: 'PGB Burn-Rate AI Prognose & Seizoensplanning',
      burnRateSub: 'Voorspelt budgetuitputting op basis van schoolweken en vakantiepieken, waardoor onverwachte tekorten worden voorkomen.',
      projectedYearEndBalance: 'Geprojecteerd Jaar-Einde Overschot',
      burnRateOnTrackBadge: 'BUDGETVERLOOP: OPTIMAAL',
      burnRateSurgeWarning: 'ZOMERVAKANTIE-PIEK MEEBEREKEND',
      contractGenHeader: 'Wet DBA & Belastingdienst Zorgovereenkomsten',
      contractGenSub: 'Genereert automatisch goedgekeurde modelcontracten van opdracht en voorkomt risico op schijnzelfstandigheid.',
      generateWetDbaContractBtn: 'Genereer Model Zorgovereenkomst',
      downloadContractPdfBtn: 'Download Ondertekend SVB Contract (JSON/PDF)',
      wetDbaCompliantBadge: 'WET DBA VRIJSTELLING GECERTIFICEERD',

      // NightWatch Telemetry Sentinel
      nightWatchHeader: 'NightWatch™ Live Epilepsie & Vitale Telemetrie',
      nightWatchSub: 'Real-time sensorstream vanaf Lars’s NightWatch epilepsie-armband en saturatiemeter voor onbezorgde nachtrespite.',
      telemetryLiveBadge: 'IOT SENSORSTREAM ACTIEF (0.2s VERTRAGING)',
      heartRateLabel: 'Hartslag (BPM)',
      spO2Label: 'Zuurstofsaturatie (SpO2)',
      motionScoreLabel: 'Beweging / Schokken Index',
      batteryLabel: 'Sensor Accu',
      triggerEpilepsyAlarmSim: '⚡ Simuleer Nachtelijke Epilepsieaanval',
      resetTelemetrySim: 'Herstel naar Normale Rusttoestand',
      epilepsyAlarmActiveTitle: '🚨 SPOED: NACHTELIJKE AANVAL GEDETECTEERD DOOR NIGHTWATCH SENSOR',

      // Standby Pool Retainer
      standbyRetainerHeader: 'Betaalde Standby Retainer Micro-Economie',
      standbyRetainerSub: 'Reserveer een klein PGB-beschikbaarheidstarief (€3.50-€4.00/uur) voor 2-3 kinderverpleegkundigen in de buurt voor een gegarandeerde 15-minuten SLA.',
      activateRetainerBtn: 'Activeer Standby Retainer (€4.00/uur)',
      deactivateRetainerBtn: 'Pauzeer Retainer',
      guaranteedSlaArrival: 'Gegarandeerde Spoed-SLA',
      hourlyStandbyCost: 'PGB Retainer Vergoeding',

      // Respite Co-Op Matcher
      respiteCoOpHeader: 'Buurt Respite Co-Ops & Gedeelde Zorg',
      respiteCoOpSub: 'Vind gelijkgestemde gezinnen in de buurt met compatibele kinderen om samen gespecialiseerde zorg in te huren en PGB-kosten te halveren.',
      compatibleFamilyBadge: '98% COMPATIBILITEITS-MATCH',
      proposeSharedSessionBtn: 'Stel Gedeelde Zorgsessie Voor',
      sharedPgbSavingsBadge: '50% PGB KOSTENBESPARING PER GEZIN',
    },
    facility: {
      portalBadge: 'Portaal Zorginstelling',
      idLabel: 'Instellings-ID',
      coordinatorLabel: 'Dienstdoend Coördinator: Dr. M. de Boer',
      broadcastUrgentBtn: 'Spoedoproep Plaatsen',
      pendingRequests: 'Reacties op Diensten',
      applicantsLabel: 'Geverifieerde kandidaten',
      instantApprovalReady: 'Direct met 1 klik goedkeuren',
      timesheetsSignoff: 'Urenstaten te Accorderen',
      pendingLabel: 'Wacht op handtekening coördinator',
      multiBankReady: 'Triggert directe SEPA-uitbetaling',
      avgTimeToFill: 'Gemiddelde Vervullingstijd',
      minutesLabel: 'min',
      vsTraditional: 'vs 48 uur traditioneel uitzendbureau',
      complianceRate: 'Bevoegdheidsgraad Personeel',
      verified100: '100% Geverifieerd',
      auditCleared: 'BIG & VOG controle akkoord',
      applicantsQueueTab: 'Kandidatenoverzicht',
      postBroadcastTab: 'Spoeddienst Uitzenden',
      liveRosterTab: 'Aanwezigheidsrooster',
      timesheetsTab: 'Digitale Accordering Uren',
      shiftClaimsTitle: 'Binnengekomen Reacties van Zorgverleners',
      shiftClaimsDesc: 'Beoordeel en accordeer vooraf gescreende verpleegkundigen met een actieve CIBG BIG-registratie.',
      pendingActions: 'Te Verwerken',
      allHandledTitle: 'Alle Reacties Verwerkt',
      allHandledDesc: 'Geen openstaande reacties op dit moment. Je kunt op ieder gewenst moment een nieuwe spoedoproep plaatsen.',
      matchScore: 'Specialisme Match',
      appliedAt: 'Aangemeld op',
      declineBtn: 'Afwijzen',
      instantApproveBtn: '1-Klik Goedkeuren & Boeken',
      broadcastTitle: 'Nieuwe Spoedoproep Uitzenden',
      broadcastDesc: 'Stuur direct een pushbericht naar alle direct oproepbare verpleegkundigen en zorgassistenten in jouw regio.',
      shiftTitleLabel: 'Functie & Titel Dienst',
      departmentLabel: 'Afdeling / Zorgeenheid',
      shiftDateLabel: 'Datum van Dienst',
      startTimeLabel: 'Aanvangstijd',
      endTimeLabel: 'Eindtijd',
      hourlyBaseRateLabel: 'Basis Uurtarief (€)',
      urgentBonusLabel: 'Acute Spoedtoeslag (€)',
      patientRatioLabel: 'Patiënt-Zorgverlener Ratio',
      protocolDescLabel: 'Afdelingsinstructies & Bijzonderheden',
      calculatedPayout: 'Berekende Bruto Vergoeding Dienst',
      broadcastAlertSubmit: '🚀 Spoedoproep Direct Uitzenden',
      rosterTitle: 'Live Aanwezigheidsrooster Zorglocatie',
      rosterDesc: 'Real-time overzicht van freelance zorgprofessionals die momenteel op locatie ingeklokt en geverifieerd zijn.',
      liveRosterActive: 'Aanwezigheidsrooster Actief',
      assignedAssistant: 'Toegewezen Zorgprofessional',
      awaitingMatch: 'Wacht op Beschikbare Zorgverlener',
      shiftValue: 'Dienstwaarde',
      timesheetSignoffTitle: 'Digitale Urenregistratie & Directe Uitbetaling',
      timesheetSignoffDesc: 'Door een voltooide dienst digitaal te accorderen, wordt automatisch de SEPA Instant uitbetaling naar de bankrekeningen van de zorgverlener uitgevoerd.',
      waitingSignoff: 'Wacht op Accordering',
      noPendingTimesheets: 'Geen urenstaten die wachten op beoordeling.',
      clockOutsAppear: 'Zodra een zorgverlener uitklokt op locatie, verschijnt de urenstaat hier direct ter ondertekening.',
      awaitingSignature: 'Wacht op Handtekening Coördinator',
      grossRemittance: 'Bruto Vergoeding',
      signExecutePayrollBtn: 'Accorderen & SEPA Vrijgeven',
    },
    admin: {
      adminBadge: 'Platformbeheer & Kwaliteitsbewaking',
      regulatoryStandards: 'ISO 27001 • HIPAA • AVG / GDPR Art. 20 • Wkkgz',
      opsTitle: 'Beheer Zorgcapaciteit & Multi-Bank Uitbetalingsmotor',
      opsDesc: 'Monitor bezettingsgraden van ziekenhuizen, beheer geautomatiseerde SEPA-transacties en bekijk onveranderlijke auditlogs.',
      exportAuditBundle: 'Exporteer Compliance Auditbundel (AVG/HIPAA)',
      overallFillRate: 'Algemene Vervullingsgraad',
      fillRateSub: '+14% ten opzichte van vorig kwartaal',
      urgentTimeToFill: 'Gem. Tijd tot Spoedvervulling',
      timeToFillSub: 'Snelste in netwerk: 4 min',
      totalSettledPayroll: 'Totaal Afgewikkeld Honorarium',
      settledPayrollSub: '100% geautomatiseerde SEPA-splitsing',
      agencyCostReduction: 'Besparing op Uitzendbureaus',
      savedAmount: '€142.850 bespaard',
      agencyCostSub: 'Tussenmarges van bureaus geëlimineerd',
      analyticsTab: 'Bezettingsstatistieken',
      payrollTab: 'Multi-Bank Uitbetalingsmotor',
      complianceTab: 'BIG- & Kwaliteitscontrole',
      securityTab: 'Audit- & Beveiligingslog',
      fillRatesTitle: 'Bezettingsgraad Ziekenhuizen & Zorginstellingen',
      fillRatesDesc: 'Aangevraagde versus succesvol ingevulde diensten per medische afdeling',
      networkAvg: 'Netwerkgemiddelde: 96,4%',
      requestedVacancies: 'Aangevraagde Diensten',
      filledViaCarePulse: 'Vervuld via CarePulse',
      pushSpeedTitle: 'Responssnelheid op Spoedoproepen',
      pushSpeedDesc: 'Verdeling van de reactietijd van zorgverleners na het versturen van een spoedpushbericht',
      within30Mins: '88% ingevuld binnen 30 minuten',
      weeklyGrowthTitle: 'Wekelijks Dienstenvolume & Groei',
      weeklyGrowthDesc: 'Totaal aantal voltooide diensten binnen het zorgnetwerk',
      completedShifts: 'Voltooide Diensten',
      payrollEngineTitle: 'Multi-Bank Geautomatiseerde SEPA Uitbetalingsmotor',
      payrollEngineDesc: 'Directe honorariumuitbetaling zonder vertraging, direct gesplitst naar zakelijke- en belastingrekeningen na accordering.',
      sepaConnected: 'SEPA Instant API: Verbonden',
      settledBadge: 'UITBETAALD & VERWERKT',
      batchId: 'SEPA Batch',
      grossPayout: 'Bruto Vergoeding',
      viewRemittance: 'Specificatie Bekijken',
      complianceHeaderTitle: 'Controle Kwalificaties & BIG-Registratie',
      complianceHeaderDesc: 'Geautomatiseerde verificatie met het CIBG BIG-register, Ministerie van VWS en Justis VOG-register.',
      compliance100: '100% Wet- en Regelgeving Conform',
      seal: 'Zegel',
      flagRevoke: 'Markeren / Intrekken',
      verifySeal: 'Zegel Verifiëren',
      auditStreamTitle: 'Onveranderlijke Beveiligings- & AVG-Auditlog',
      auditStreamDesc: 'Elke autorisatie, oproep, kwalificatieverificatie en SEPA-transactie wordt cryptografisch ondertekend en gelogd.',
      searchAuditPlaceholder: 'Doorzoek auditlog op gebruiker, actie of zegel...',
      timestampCol: 'Tijdstempel (UTC)',
      actorRoleCol: 'Gebruiker & Rol',
      actionTypeCol: 'Type Handeling',
      auditDetailsCol: 'Auditdetails',
      cryptographicSealCol: 'Cryptografisch Zegel',
    },
    invoice: {
      slipTitle: 'Geautomatiseerde Specificatie Zorgdienst & Honorarium',
      printSlip: 'Specificatie Afdrukken',
      automatedNode: 'Geautomatiseerd Knooppunt Medische Facturatie & Settlement',
      caregiverContractor: 'Zorgprofessional (ZZP Opdrachtnemer)',
      sepaPaidBadge: 'SEPA Instant Uitbetaald',
      invoiceNum: 'Factuurnummer',
      sepaBatch: 'SEPA Batch-ID',
      paymentDate: 'Uitbetalingsdatum',
      clientFacility: 'Opdrachtgevende Zorginstelling',
      deptDispatch: 'Afdeling: Acute Zorg & Spoeddispatch',
      timesheetRef: 'Urenstaat Referentie',
      signoffDoctor: 'Geaccordeerd door: Dr. M. de Boer',
      itemDescription: 'Omschrijving Medische Werkzaamheden',
      hours: 'Uren',
      rate: 'Tarief',
      total: 'Totaal',
      clinicalShiftItem: 'Verpleegkundige dienst conform goedgekeurde urenregistratie',
      urgentPremiumItem: 'Acute Spoed- & Onregelmatigheidstoeslag',
      flashIncentiveItem: 'Toeslag voor acute personeelstekorten & spoedoproep',
      bonusLabel: 'Vaste Toeslag',
      totalNetPayout: 'Totale Netto Vergoeding (0% Btw-vrijstelling Medische Zorg)',
      multiBankDisbursement: 'Verdeling Multi-Bank Geautomatiseerde Uitbetaling',
      complianceNote: 'AVG Artikel 20 Gecertificeerd | Wkkgz Conform | Versleutelde SEPA XML Export',
    },
  },
};
