# CarePulse (CarePulse Pediatric Dispatch & Clinical Operations)

> **Autonomous On-Demand Pediatric Healthcare Marketplace, Clinical Handover & Emergency Dispatch Platform.**
> Engineered for complex pediatric home care under Dutch regulatory frameworks (**Wlz, PGB, SVB, Wet BIG, Wet DBA, NEN 7510/7513, and MedMij HL7 FHIR**).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38b2ac.svg)](https://tailwindcss.com/)
[![Standards](https://img.shields.io/badge/Standards-NEN%207513%20%7C%20HL7%20FHIR%20R4%20%7C%20Wet%20BIG-emerald.svg)](#security--compliance-architecture)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 🌟 Executive Overview

Families caring for children with intensive medical needs (such as refractory epilepsy, G-tube nutrition dependency, and severe developmental disabilities) face an acute structural crisis: unpredictable caregiver cancellations, fragmented communication, complex PGB/SVB administrative overhead, and life-threatening delays during nocturnal seizures or airway complications.

**CarePulse** is a specialized clinical operations platform that unifies families, registered pediatric nurses (ZZP/BIG), care agencies, and hospital ERs into a real-time, coordinated network:

- **15-Minute Emergency SLA**: Neighborhood standby pool and e-bike rapid interceptors.
- **Fail-Safe Clinical Handover**: AI-powered SBAR voice dictation structured into clinical situation, background, assessment, and recommendation.
- **First Responder In-Pocket Card**: High-contrast printable emergency card and CIBG QR pass for ambulance paramedics.
- **Hospital ER Interoperability**: Instant 1-click HL7® FHIR® R4 document export direct to Academic Pediatric Centers (Emma Kinderziekenhuis, Wilhelmina Kinderziekenhuis, Sophia Kinderziekenhuis).
- **Regulatory Iron Dome**: NEN 7513 cryptographic audit vault with SHA-256 seals, live CIBG BIG validator, and Belastingdienst Wet DBA Safe Harbor risk scoring.

---

## 🚀 Key Moat Features

### 1. 🚑 Emergency Route Interceptor & Standby Retainer
- Live neighborhood radius dispatch for certified pediatric nurses (BIG Art. 3).
- Rapid response via e-bike speed pedelec, EV, or foot with guaranteed 15-minute arrival window.
- Real-time GPS/street interception tracking for acute pre-ictal alarms and seizure clusters.

### 2. 🎙️ AI SBAR Clinical Voice Handover Generator
- Voice dictation and speech-to-text recording tailored for bedside shift transfers.
- Automatically organizes unstructured verbal notes into **Situation**, **Background**, **Assessment**, and **Recommendation** (SBAR).
- Auto-extracts medication administration timestamps, G-tube bolus delivery, and generates billable SVB care hours.

### 3. 🎫 Paramedic "In-Pocket" Printable Card & CIBG QR Token
- Dual-mode card formatted for mobile screens and physical `@media print` laminated cards (for wheelchair/backpack).
- Provides ambulance crews with immediate specifications:
  - Mic-Key button size (`14Fr / 1.5cm`)
  - Suction limits (`max -120 mmHg`)
  - Stesolid (5mg/10mg rectiole) & Buccolam protocol
  - Treating pediatric neurologist pager and direct contacts.
- Scannable 112/SEH QR token linking directly to verified CIBG credentials.

### 4. 🏥 MedMij & HL7 FHIR R4 Pediatric Hospital Gateway
- Conforms to Dutch Nictiz MedMij specifications and HL7 FHIR R4 document bundle schemas.
- Exports structured medication statements, allergy profiles, active conditions, and NightWatch vitals.
- Secure transmission simulation to:
  - **Emma Kinderziekenhuis (Amsterdam UMC)**
  - **Wilhelmina Kinderziekenhuis (UMC Utrecht / WKZ)**
  - **Erasmus MC Sophia Kinderziekenhuis (Rotterdam)**

### 5. 🛡️ NEN 7513 Cryptographic Audit Vault & CIBG BIG Gateway
- Tracks all health data accesses in accordance with **NEN 7513** (Logging in Electronic Patient Records).
- Records actor identity, timestamp, purpose of use (*Dienstoverdracht, Spoedinterventie, Medicatie Controle, SVB Verantwoording*), and cryptographic SHA-256 integrity hash.
- Real-time CIBG gateway simulator validating reserved medical competencies (*Voorbehouden handelingen* under Art. 36 Wet BIG).
- 1-click JSON export ready for Dutch Healthcare Inspectorate (**IGJ**) audits.

### 6. ⚖️ Wet DBA Safe Harbor Scorer & PGB / SVB Forecaster
- Algorithmic analysis of ZZP nurse contracts to eliminate *schijnzelfstandigheid* (bogus self-employment) risks.
- Validates model agreements (*Zorgovereenkomst van Opdracht*), substitution clauses, hourly rate thresholds, and absence of employer hierarchy.
- Tracks annual PGB budget consumption across Wlz indicaties and forecasts seasonal surpluses/deficits.

### 7. 🗣️ AAC Pictogram Communicator ("Mijn Dag in Beeld")
- Augmentative and Alternative Communication (AAC) board for non-verbal children.
- Categories covering basic needs, emotions, medical pain, and epilepsy alerts.
- Bilingual speech synthesis (`nl-NL` / `en-US`) with auditory feedback.

### 8. 🌙 NightWatch Epilepsy Telemetry & Early Seizure Predictor
- Live telemetry stream monitoring heart rate (HRV drop analysis), SpO2 desaturations, and motion intensity.
- Early warning heuristic detector providing pre-ictal risk scores and audible threshold alarms.

---

## 🛡️ Security & Compliance Architecture

| Standard | Category | CarePulse Implementation |
| :--- | :--- | :--- |
| **AVG / GDPR** | Privacy by Design | Masked BSN (`bsnMasked`), data minimization, exportable compliance bundles. |
| **NEN 7510** | Info Security in Care | Access control segregation, role-based boundaries (Parent, Nurse, Facility, Admin). |
| **NEN 7513** | Audit Logging | SHA-256 sealed access logging with statutory purpose-of-use tracking. |
| **Wet BIG** | Medical Licensing | Art. 3 registry verification and Art. 36 reserved procedure certification tracking. |
| **MedMij / HL7 FHIR**| Interoperability | Nictiz-compliant R4 document bundles with digital digest verification. |
| **WGBO** | Patient Rights | Break-glass emergency protocols balanced with immediate parent notification. |

---

## 💻 Tech Stack

- **Frontend Core**: React 19, TypeScript 5.8, Vite 6.2
- **Styling**: Tailwind CSS 4.1, Lucide React Icons
- **Animation & Visuals**: Motion, Canvas Confetti
- **Data Visualization**: Recharts (PGB burn-down charts, telemetry graphs, dispatch response distributions)
- **Audio & Accessibility**: Web Speech Synthesis API, responsive mobile-first touch UI

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ or 22+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/isaacbullockk/carepulse.git
cd carepulse

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will run at `http://localhost:3000`.

### Scripts

- `npm run dev`: Launch the Vite development server on port 3000.
- `npm run build`: Compile TypeScript and bundle assets for production into `/dist`.
- `npm run lint`: Run `tsc --noEmit` to validate TypeScript typing and syntax.
- `npm run preview`: Preview the compiled production build locally.

---

## 📊 Live Pitch Deck & Teleprompter

CarePulse includes an integrated, interactive **8-Slide Pitch Deck & Verbatim Presenter Teleprompter**:
1. Launch the app and select **Parent Dashboard** or click **"📊 Pitch Deck & Speech"** in the top navigation bar.
2. Step through the 8-slide stakeholder presentation with slide-by-slide speaker scripts, financial unit economics, and pilot traction milestones.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
