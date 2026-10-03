import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import {
  Activity,
  Bell,
  ShieldCheck,
  Smartphone,
  Monitor,
  Zap,
  CheckCircle2,
  X,
  AlertTriangle,
  FileCheck,
  CreditCard,
  User,
  Building2,
  Lock,
  Globe,
  HeartHandshake,
  LifeBuoy
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    currentRole,
    setCurrentRole,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    isSimulatingDevice,
    toggleSimulatingDevice,
    triggerEmergencyAlertSimulation,
    triggerLateCallOffSimulation,
    lateCallOffIncident,
    nurseProfile,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-teal-500/20">
              <Activity className="w-5 h-5 text-slate-950 font-black" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">{t.common.appName}</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t.common.tagline}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                {t.common.subTagline}
              </p>
            </div>
          </div>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 overflow-x-auto">
            <button
              id="role-btn-nurse"
              onClick={() => setCurrentRole('nurse')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentRole === 'nurse'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.common.roleNurse}</span>
              <span className="lg:hidden">{t.common.roleNurseShort}</span>
              {nurseProfile.onCallAvailableNow && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}
            </button>

            <button
              id="role-btn-facility"
              onClick={() => setCurrentRole('facility')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentRole === 'facility'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.common.roleFacility}</span>
              <span className="lg:hidden">{t.common.roleFacilityShort}</span>
            </button>

            <button
              id="role-btn-parent"
              onClick={() => setCurrentRole('parent')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentRole === 'parent'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.common.roleParent}</span>
              <span className="lg:hidden">{t.common.roleParentShort}</span>
              {lateCallOffIncident && (
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping ml-0.5" />
              )}
            </button>

            <button
              id="role-btn-admin"
              onClick={() => setCurrentRole('admin')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentRole === 'admin'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.common.roleAdmin}</span>
              <span className="lg:hidden">{t.common.roleAdminShort}</span>
            </button>
          </div>

          {/* Right Action Tools & Language Switcher */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Simulation SOS / Late Call-Off */}
            <button
              id="btn-simulate-late-calloff"
              onClick={() => {
                setCurrentRole('parent');
                triggerLateCallOffSimulation();
              }}
              title={t.common.simulateLateCallOff}
              className="flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-colors shadow-xs"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="hidden xl:inline">{t.common.simulateLateCallOff}</span>
            </button>

            {/* Language Switcher (EN / NL) */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all flex items-center space-x-1 ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="English"
              >
                <span>🇬🇧</span>
                <span className="hidden sm:inline">EN</span>
              </button>
              <button
                id="btn-lang-nl"
                onClick={() => setLanguage('nl')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all flex items-center space-x-1 ${
                  language === 'nl'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Nederlands"
              >
                <span>🇳🇱</span>
                <span className="hidden sm:inline">NL</span>
              </button>
            </div>

            {/* Quick Test Alert Simulation */}
            <button
              id="btn-simulate-alert"
              onClick={triggerEmergencyAlertSimulation}
              title={t.common.simulateUrgentPush}
              className="flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span className="hidden xl:inline">{t.common.simulateUrgentPush}</span>
            </button>

            {/* Mobile / Responsive Frame Toggle */}
            <button
              id="btn-toggle-device"
              onClick={toggleSimulatingDevice}
              title={isSimulatingDevice ? t.common.desktopView : t.common.mobileView}
              className={`p-1.5 sm:p-2 rounded-lg text-xs font-medium border transition-colors ${
                isSimulatingDevice
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isSimulatingDevice ? (
                <div className="flex items-center space-x-1">
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">{t.common.desktopView}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Smartphone className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">{t.common.mobileView}</span>
                </div>
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                id="btn-notifications-bell"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 sm:p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-white">{t.common.pushAlertStream}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          {t.common.markAllRead}
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto divide-y divide-slate-800">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        {t.common.noNotifications}
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-800/60 ${
                            !n.read ? 'bg-slate-800/30' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-2.5">
                            {n.type === 'URGENT_SHIFT' ? (
                              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 mt-0.5">
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                            ) : n.type === 'PAYMENT_SENT' ? (
                              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5">
                                <CreditCard className="w-4 h-4" />
                              </div>
                            ) : n.type === 'APPLICATION_APPROVED' ? (
                              <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 mt-0.5">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 mt-0.5">
                                <FileCheck className="w-4 h-4" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-slate-200 truncate">{n.title}</p>
                                <span className="text-[10px] text-slate-400 ml-2 shrink-0">{n.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center space-x-1.5 text-emerald-400">
                      <Lock className="w-3 h-3" />
                      <span>{t.common.encryptedRealTime}</span>
                    </div>
                    <span>{t.common.hipaaGdprMode}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
