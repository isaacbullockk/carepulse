import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { NurseDashboard } from './components/nurse/NurseDashboard';
import { FacilityDashboard } from './components/facility/FacilityDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { PushNotificationToast } from './components/common/PushNotificationToast';
import { MobileNurseQuickDock } from './components/common/MobileNurseQuickDock';
import { ShieldCheck, HeartPulse, Activity, Zap } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRole, isSimulatingDevice } = useApp();

  const renderDashboard = () => {
    switch (currentRole) {
      case 'nurse':
        return <NurseDashboard />;
      case 'facility':
        return <FacilityDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <NurseDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
        {isSimulatingDevice ? (
          /* Mobile Device Frame Container */
          <div className="flex justify-center items-center py-4">
            <div className="w-full max-w-md bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 ring-8 ring-slate-900/10">
              {/* Dynamic Island / Speaker Bar */}
              <div className="w-28 h-4 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
                <div className="w-8 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Mobile Viewport Screen */}
              <div className="bg-slate-100 rounded-[32px] overflow-hidden max-h-[780px] overflow-y-auto p-3 text-slate-900 scrollbar-thin">
                {renderDashboard()}
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-3 mb-1" />
            </div>
          </div>
        ) : (
          /* Standard Fluid View */
          renderDashboard()
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <HeartPulse className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800">CarePulse Medical Dispatch</span>
            <span>— Healthcare Freelance Marketplace</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>CIBG BIG Register Sync</span>
            </span>
            <span>•</span>
            <span>Multi-Bank SEPA Automated Payroll</span>
            <span>•</span>
            <span>HIPAA & GDPR Art. 20 Compliant</span>
          </div>
        </div>
      </footer>

      {/* Real-time Push Notification Floating Toast */}
      <PushNotificationToast />

      {/* Floating Tactical Nurse & Caregiver Quick-Shift Dock */}
      <MobileNurseQuickDock />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
