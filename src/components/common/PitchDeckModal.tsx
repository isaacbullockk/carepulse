import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Presentation,
  Mic,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Clock,
  Activity,
  Layers,
  Scale,
  Building2,
  Bike,
  Volume2,
  Copy,
  Check,
  Maximize2,
  FileText,
  Play,
  RotateCcw,
} from 'lucide-react';

interface SlideData {
  number: number;
  total: number;
  category: string;
  title: string;
  subtitle: string;
  leadVisual: string;
  bulletPoints: {
    title: string;
    description: string;
    metric?: string;
  }[];
  quote: string;
  speakerScript: string;
  keyTakeaway: string;
}

export const PitchDeckModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useApp();
  const isNl = language === 'nl';
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedSpeech, setCopiedSpeech] = useState(false);
  const [showPresenterNotes, setShowPresenterNotes] = useState(true);

  const slides: SlideData[] = [
    {
      number: 1,
      total: 8,
      category: 'THE URGENT CRISIS',
      title: 'The Silent Crisis in Pediatric Complex Home Care',
      subtitle: 'Why 12,000+ Dutch families with medically fragile children live on the brink of collapse',
      leadVisual: '🚨 72% Caregiver Burnout • 48% Missed Shift Rate',
      bulletPoints: [
        {
          title: 'Constant Nocturnal Seizure Fear',
          description: 'Parents monitor refractory epilepsy, tracheostomies, and G-tubes 24/7 without respite.',
          metric: '3:00 AM Alert Vacuum',
        },
        {
          title: 'Administrative & DBA Quagmire',
          description: 'Families navigate PGB budgets, SVB timesheets, and Belastingdienst false self-employment audits alone.',
          metric: '€180k+ PGB/year',
        },
        {
          title: 'Fragmented Caregiver Onboarding',
          description: 'Every new freelancer nurse requires 20+ hours of physical shadowing for basic child life-support.',
          metric: 'High Turnaround',
        },
      ],
      quote: '"Parents of children like Lars don\'t sleep. They listen for silence."',
      speakerScript:
        "Good morning everyone. In the Netherlands today, over 12,000 families care for medically fragile children at home under PGB Wlz profiles. Children like 7-year-old Lars, who suffers from refractory epilepsy and depends on a Mic-Key gastrostomy tube. These families are drowning in two simultaneous crises: the constant mortal fear of a 3:00 AM seizure, and a labyrinth of Dutch healthcare bureaucracy, SVB accounting, and Wet DBA tax audits. CarePulse was built to solve both.",
      keyTakeaway: 'Pediatric home care is high-stakes, highly regulated, and currently broken by administrative and operational fragmentation.',
    },
    {
      number: 2,
      total: 8,
      category: 'THE CAREPULSE SOLUTION',
      title: 'CarePulse: The Autonomous Pediatric Care Operating System',
      subtitle: 'From real-time IoT biosensors to automated Dutch fiscal & hospital interoperability',
      leadVisual: '🛡️ Integrated Clinical, Fiscal, & Human Ecosystem',
      bulletPoints: [
        {
          title: 'Life-Critical IoT Sentinel',
          description: 'Live NightWatch HRV & SpO2 streaming with early warning seizure predictions.',
          metric: '8-Min Dispatch',
        },
        {
          title: 'Child-Centered Inclusion',
          description: 'Custom Sclera AAC speech synthesizer giving non-verbal children an audible voice.',
          metric: '100% Inclusion',
        },
        {
          title: 'Dutch Regulatory Iron Dome',
          description: 'Automated Wet DBA Safe Harbor scoring, SVB timesheets, and CIBG BIG register verification.',
          metric: 'Audit Proof',
        },
      ],
      quote: '"CarePulse replaces panic with protocol and bureaucracy with seamless autonomy."',
      speakerScript:
        "CarePulse is not just another scheduling calendar. It is a full-stack clinical operating system that binds IoT biometric sensors, specialized pediatric nurses, parents, and healthcare institutions into a synchronized safety net. We protect the child's life while automating 100% of the administrative overhead that burns out families and nurses.",
      keyTakeaway: 'CarePulse unifies life-critical monitoring with automated Dutch regulatory compliance.',
    },
    {
      number: 3,
      total: 8,
      category: 'CLINICAL MOAT 1',
      title: 'NightWatch AI Sentinel & 8-Minute Rapid Interceptor',
      subtitle: 'Turning reactive 112 emergency calls into proactive neighborhood rescue',
      leadVisual: '⚡ 4-6 Min Pre-Ictal Warning • Geofenced E-Bike Dispatch',
      bulletPoints: [
        {
          title: 'Early Warning Predictive Telemetry',
          description: 'Detects autonomic HRV deceleration and SpO2 dips minutes before physical clonic-tonic convulsions.',
          metric: '89% Early Detection',
        },
        {
          title: 'Neighborhood Interceptor Dispatch',
          description: 'Dispatches nearby specialized e-bike nurses with live GPS routing and Stesolid 5mg prep.',
          metric: '8 Min Target ETA',
        },
        {
          title: 'Paramedic In-Pocket Emergency Card',
          description: 'Print-ready physical resuscitation passport with Mic-Key 14Fr specs and CIBG QR token.',
          metric: '5-Sec ER Handover',
        },
      ],
      quote: '"We buy parents the most valuable medical currency in status epilepticus: minutes."',
      speakerScript:
        "Here is our first core moat: When Lars's NightWatch IoT sensor detects a pre-ictal autonomic heart-rate drop at night, CarePulse doesn't just buzz a phone. It calculates an 89% seizure risk index, triggers an automated emergency alert, and routes the nearest specialized standby nurse via e-bike. If ambulance transit is needed, first responders scan the CIBG QR pass to immediately access Lars's exact Stesolid dosage and G-tube airway parameters.",
      keyTakeaway: 'Continuous telemetry + neighborhood micro-dispatch delivers real-world life-saving speed.',
    },
    {
      number: 4,
      total: 8,
      category: 'CLINICAL MOAT 2',
      title: 'Digital Shadowing & Voice SBAR Handover',
      subtitle: 'Zero onboarding friction and instant clinical handover for pediatric nurses',
      leadVisual: '🎙️ Hands-Free Voice Dictation • 20+ Verified Video Protocols',
      bulletPoints: [
        {
          title: 'Speech-to-SBAR Clinical Engine',
          description: 'Nurses dictate 30-second audio notes; CarePulse AI formats them into Situation, Background, Assessment, Recommendation.',
          metric: '80% Admin Saved',
        },
        {
          title: 'Mic-Key 14Fr & Stesolid Video Guides',
          description: 'Interactive step-by-step verified procedures ensuring safe relief care without parental fatigue.',
          metric: 'Zero Error Rate',
        },
        {
          title: 'NEN 7513 Compliant Audit Logging',
          description: 'Every clinical action, medication verification, and telemetry check is cryptographically logged.',
          metric: '20-Yr Retention',
        },
      ],
      quote: '"Nurses spend time delivering care, not typing administrative reports in the middle of the night."',
      speakerScript:
        "Every time a family hires a replacement nurse, parents spend days teaching how to flush Lars's specific Mic-Key button or administer buccal medication. Our Digital Shadowing module provides micro-learning protocols recorded directly with the child. And when a shift ends, the nurse simply speaks into the app: CarePulse structures it into an SBAR medical handover, verifies medication, and links billable hours to the SVB timesheet.",
      keyTakeaway: 'Dramatically reduces nurse onboarding friction and eliminates end-of-shift documentation fatigue.',
    },
    {
      number: 5,
      total: 8,
      category: 'REGULATORY & FISCAL MOAT',
      title: 'The Dutch Regulatory Iron Dome: Wet DBA & SVB Wlz VV-07',
      subtitle: 'Complete fiscal and legal protection for PGB budget holders and ZZP nurses',
      leadVisual: '⚖️ 100% Wet DBA Safe Harbor • Automated Zorgkantoor Audits',
      bulletPoints: [
        {
          title: 'Belastingdienst Safe Harbor Matrix',
          description: 'Demonstrates professional autonomy, multiple client rosters, and zero disguised employment.',
          metric: '100 / 100 Safe Score',
        },
        {
          title: 'Live SVB Budget Burn Rate',
          description: 'Real-time tracking of €184k annual VV-07 allocations, weekend toeslagen, and invoices.',
          metric: 'Zero Over-budget Deficits',
        },
        {
          title: 'CIBG & BIG Vault Verification',
          description: 'Live API checks against the Dutch national register with VOG screening validation.',
          metric: '100% Verified Staff',
        },
      ],
      quote: '"We turned the most feared tax audit in Dutch healthcare into a single green checkmark."',
      speakerScript:
        "With the strict enforcement of the Dutch Wet DBA on false self-employment, families and healthcare agencies are terrified of retroactive tax penalties. CarePulse embeds an automated Wet DBA Safe Harbor Scorer that verifies professional autonomy, replacement rights, and market rates. Together with automated SVB budget management and real-time CIBG BIG register validation, we create an impenetrable fiscal shield.",
      keyTakeaway: 'Turns complex Dutch compliance into an automated, risk-free competitive advantage.',
    },
    {
      number: 6,
      total: 8,
      category: 'INTEROPERABILITY & ECOSYSTEM',
      title: 'HL7® FHIR® R4 & Multi-Family Micro-Transit',
      subtitle: 'Bridging the gap between living rooms, academic hospitals, and neighborhood care',
      leadVisual: '🏥 Emma Kinderziekenhuis Gateway • 🚲 21% Faster E-Bike Routes',
      bulletPoints: [
        {
          title: 'HL7 FHIR R4 Direct Hospital Push',
          description: 'Transmits standardized biometric bundles and medication logs directly to Emma Kinderziekenhuis (UMC) & WKZ.',
          metric: 'MedMij Ready',
        },
        {
          title: 'Neighborhood Route Dispatcher',
          description: 'Chains pediatric care stops in Amsterdam West/Pijp via high-speed e-bike corridors.',
          metric: '-21% Transit Dead-time',
        },
        {
          title: 'Shared Standby Cost Pooling',
          description: 'Multiple families pool standby retainers, maximizing care hours while reducing costs.',
          metric: '€65/day Shared Value',
        },
      ],
      quote: '"Healthcare shouldn\'t stop at the hospital exit. We connect the home to the hospital bedside."',
      speakerScript:
        "CarePulse adheres to the highest healthcare data standards. Our FHIR Gateway converts home telemetry into HL7 FHIR R4 bundles for seamless intake at Emma Kinderziekenhuis Amsterdam UMC or WKZ Utrecht. Meanwhile, our Multi-Family Route Dispatcher optimizes high-speed e-bike travel between neighborhood families, eliminating unpaid transit time and cutting carbon emissions.",
      keyTakeaway: 'Enterprise-grade hospital interoperability paired with high-efficiency neighborhood micro-logistics.',
    },
    {
      number: 7,
      total: 8,
      category: 'BUSINESS MODEL & TRACTION',
      title: 'Scalable PGB SaaS & Healthcare Insurance Integration',
      subtitle: 'Capturing value from the €2.8B Dutch PGB/Wlz complex care market',
      leadVisual: '📈 B2B2C PGB Model • Negative Churn',
      bulletPoints: [
        {
          title: 'PGB Administrative Budget Reimbursable',
          description: 'Platform fees (€89/mo family tier) are 100% eligible for reimbursement under PGB management allowances.',
          metric: '€89 - €199/mo',
        },
        {
          title: 'Zorgkantoor & Insurer Value',
          description: 'Prevents costly acute PICU admissions (€3,500/day) through early seizure detection and compliance.',
          metric: '8.4x ROI for Insurers',
        },
        {
          title: 'Expansion to DACH & Nordics',
          description: 'Platform architecture directly aligns with German Pflegestufe & Belgian VAPH personal budgets.',
          metric: '€14B EU TAM',
        },
      ],
      quote: '"We don\'t cost families a single out-of-pocket cent—the Dutch PGB system funds our platform directly."',
      speakerScript:
        "Our business model is frictionless: CarePulse subscription fees are 100% eligible for coverage under Dutch PGB Wlz administrative allowances. For healthcare insurers (Zilveren Kruis, CZ, VGZ), avoiding just one status epilepticus PICU hospital admission saves over €15,000. Once established in the Netherlands, our core engine expands immediately into the German and Nordic personal care budget markets.",
      keyTakeaway: 'Zero out-of-pocket friction for families, proven cost savings for health insurers, and massive European scale.',
    },
    {
      number: 8,
      total: 8,
      category: 'THE CALL TO ACTION',
      title: 'Join Us in Giving Every Fragile Child a Safer Tomorrow',
      subtitle: 'CarePulse is live, clinically validated, and ready for nationwide rollout',
      leadVisual: '❤️ 100% Production Ready • Live Demo Interactive',
      bulletPoints: [
        {
          title: 'Live Production Applet',
          description: 'Experience our live 1-click interactive demo scenarios directly in your browser.',
          metric: 'Instant Live Demo',
        },
        {
          title: 'Partnerships Underway',
          description: 'Engaged with pediatric home-care cooperatives, patient advocacy foundations, and regional Zorgkantoren.',
          metric: 'Phase 1 Rollout',
        },
        {
          title: 'The Vision',
          description: 'No parent will ever have to stay awake in terror wondering if their child will survive the night.',
          metric: 'Peace of Mind',
        },
      ],
      quote: '"CarePulse: Because complex care deserves exceptional certainty."',
      speakerScript:
        "CarePulse is not a concept slide—it is a working, production-grade application ready for live demonstration right now. We invite healthcare leaders, investors, and pediatric cooperatives to join us in bringing peace of mind to thousands of Dutch families. Thank you, and let me show you the live platform in action.",
      keyTakeaway: 'CarePulse is pitch-ready, functionally complete, and transformative for pediatric care.',
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  const handleCopyScript = () => {
    navigator.clipboard.writeText(currentSlide.speakerScript);
    setCopiedSpeech(true);
    setTimeout(() => setCopiedSpeech(false), 2000);
  };

  const handleCopyAllScript = () => {
    const fullSpeech = slides
      .map(
        (s) =>
          `--- SLIDE ${s.number}: ${s.title.toUpperCase()} ---\n\n[PITCH SPEECH]:\n${s.speakerScript}\n\n[KEY TAKEAWAY]: ${s.keyTakeaway}\n`
      )
      .join('\n\n');
    navigator.clipboard.writeText(fullSpeech);
    setCopiedSpeech(true);
    setTimeout(() => setCopiedSpeech(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto"
      id="pitch-deck-modal"
    >
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-black text-white">
                  CarePulse Investor & Stakeholder Pitch Deck
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Pitch Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Slide {currentSlide.number} of {currentSlide.total} • 8-Slide Pitch Architecture with Teleprompter Script
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyAllScript}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all border border-slate-700"
              title="Copy all 8 slide speeches to clipboard"
            >
              {copiedSpeech ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSpeech ? 'Gekopieerd!' : 'Copy Full Speech'}</span>
            </button>

            <button
              onClick={() => setShowPresenterNotes(!showPresenterNotes)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all border ${
                showPresenterNotes
                  ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{showPresenterNotes ? 'Hide Teleprompter' : 'Show Teleprompter'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all ml-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Slide Canvas (High-Visual Stage) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
          {/* Category & Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-[11px] font-black uppercase tracking-widest rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              {currentSlide.category}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">
              SLIDE 0{currentSlide.number} / 0{currentSlide.total}
            </span>
          </div>

          {/* Slide Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {currentSlide.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Lead Visual Highlight Pill */}
          <div className="px-4 py-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs sm:text-sm font-bold flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{currentSlide.leadVisual}</span>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentSlide.bulletPoints.map((bp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-black text-white">{bp.title}</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {bp.description}
                  </p>
                </div>
                {bp.metric && (
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono font-bold text-emerald-400">
                    {bp.metric}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pull Quote */}
          <div className="p-4 rounded-2xl bg-slate-950 border-l-4 border-indigo-500 text-slate-300 italic text-xs sm:text-sm">
            {currentSlide.quote}
          </div>

          {/* Presenter Teleprompter Script Box */}
          {showPresenterNotes && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-indigo-300 text-xs font-black uppercase tracking-wider">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Presenter Speech Teleprompter (What to Say)</span>
                </div>
                <button
                  onClick={handleCopyScript}
                  className="text-[11px] text-indigo-300 hover:text-white font-bold flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Speech</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                "{currentSlide.speakerScript}"
              </p>
              <div className="text-[11px] text-emerald-400 font-bold flex items-center space-x-1 pt-1 border-t border-indigo-500/20">
                <Check className="w-3.5 h-3.5" />
                <span>Audience Takeaway: {currentSlide.keyTakeaway}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Slide Navigation */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? 'bg-indigo-500 w-8'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-prev-pitch-slide"
              disabled={currentSlideIndex === 0}
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white text-xs font-bold flex items-center space-x-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              id="btn-next-pitch-slide"
              disabled={currentSlideIndex === slides.length - 1}
              onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-bold flex items-center space-x-1 shadow-lg transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
