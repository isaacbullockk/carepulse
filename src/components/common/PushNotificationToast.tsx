import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle2, CreditCard, X, ArrowRight, Zap, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PushNotificationToast: React.FC = () => {
  const { toastAlert, dismissToast, setCurrentRole } = useApp();

  if (!toastAlert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-md w-full sm:w-96 shadow-2xl rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white p-4 overflow-hidden"
      >
        <div className="flex items-start space-x-3">
          {toastAlert.type === 'URGENT_SHIFT' ? (
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
              <Zap className="w-5 h-5 animate-pulse text-rose-400" />
            </div>
          ) : toastAlert.type === 'PAYMENT_SENT' ? (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
          ) : toastAlert.type === 'APPLICATION_APPROVED' ? (
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
              <BellRing className="w-5 h-5 text-indigo-400" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Push Notification Received
              </span>
              <button
                onClick={dismissToast}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-slate-100 mt-0.5">{toastAlert.title}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toastAlert.message}</p>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-400">Instant Alert Engine</span>
              <button
                onClick={() => {
                  if (toastAlert.type === 'URGENT_SHIFT' || toastAlert.type === 'APPLICATION_APPROVED') {
                    setCurrentRole('nurse');
                  }
                  dismissToast();
                }}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
