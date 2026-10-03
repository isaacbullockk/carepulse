import React from 'react';
import { PaymentPayout, NurseProfile } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, Building, Landmark, ShieldCheck, FileText } from 'lucide-react';

interface InvoiceModalProps {
  payout: PaymentPayout;
  nurse: NurseProfile;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ payout, nurse, onClose }) => {
  const { t } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header toolbar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-wide">{t.invoice.slipTitle}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{t.invoice.printSlip}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-emerald-700 font-black text-xl tracking-tight">CarePulse MedDispatch</span>
              <p className="text-xs text-slate-500 mt-1">{t.invoice.automatedNode}</p>
              <div className="mt-3 text-xs text-slate-600 space-y-0.5">
                <p className="font-semibold text-slate-800">{t.invoice.caregiverContractor}:</p>
                <p>{nurse.name}</p>
                <p className="font-mono text-slate-500">BIG-Register: BIG-89943210982</p>
                <p className="text-slate-500">KVK: 84920194 | VAT ID: NL002498192B01</p>
              </div>
            </div>

            <div className="sm:text-right text-xs space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.invoice.sepaPaidBadge}</span>
              </div>
              <p className="text-slate-500 pt-2">{t.invoice.invoiceNum}: <span className="font-mono font-semibold text-slate-800">{payout.invoiceNumber}</span></p>
              <p className="text-slate-500">{t.invoice.sepaBatch}: <span className="font-mono text-slate-700">{payout.sepaBatchId}</span></p>
              <p className="text-slate-500">{t.invoice.paymentDate}: <span className="font-semibold text-slate-800">{payout.payoutDate}</span></p>
            </div>
          </div>

          {/* Facility Billed */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">{t.invoice.clientFacility}</p>
              <p className="font-bold text-slate-800 mt-0.5 text-sm">{payout.facilityName}</p>
              <p className="text-slate-600">{t.invoice.deptDispatch}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">{t.invoice.timesheetRef}</p>
              <p className="font-mono font-semibold text-slate-800 mt-0.5">{payout.timesheetId}</p>
              <p className="text-slate-600">{t.invoice.signoffDoctor}</p>
            </div>
          </div>

          {/* Shift Details Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 uppercase text-[10px] tracking-wider">
                <th className="py-2.5">{t.invoice.itemDescription}</th>
                <th className="py-2.5 text-right">{t.invoice.hours}</th>
                <th className="py-2.5 text-right">{t.invoice.rate}</th>
                <th className="py-2.5 text-right">{t.invoice.total}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3">
                  <p className="font-semibold text-slate-800">{payout.shiftTitle}</p>
                  <p className="text-[11px] text-slate-500">{t.invoice.clinicalShiftItem}</p>
                </td>
                <td className="py-3 text-right">8.5 hrs</td>
                <td className="py-3 text-right">€68.50/hr</td>
                <td className="py-3 text-right font-medium">€582.25</td>
              </tr>
              <tr>
                <td className="py-3">
                  <p className="font-semibold text-slate-800">{t.invoice.urgentPremiumItem}</p>
                  <p className="text-[11px] text-slate-500">{t.invoice.flashIncentiveItem}</p>
                </td>
                <td className="py-3 text-right">1</td>
                <td className="py-3 text-right">{t.invoice.bonusLabel}</td>
                <td className="py-3 text-right font-medium">€{Math.max(0, payout.totalAmount - 582.25).toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900 text-sm font-bold text-slate-900">
                <td colSpan={3} className="py-3 text-right">{t.invoice.totalNetPayout}:</td>
                <td className="py-3 text-right text-emerald-700 text-base">€{payout.totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Multi-Bank Account Routing Breakdown */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold mb-2">
              <Landmark className="w-4 h-4 text-emerald-700" />
              <span>{t.invoice.multiBankDisbursement}</span>
            </div>
            <div className="space-y-2">
              {payout.splitBreakdown.map((split, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-emerald-100">
                  <div>
                    <span className="font-bold text-slate-800">{split.bankName}</span>
                    <span className="text-[11px] text-slate-500 ml-2">({split.accountType})</span>
                    <p className="font-mono text-[11px] text-slate-500">{split.iban}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {split.percentage}% {t.nurse.splitLabel}
                    </span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">€{split.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory & HIPAA Compliance Statement */}
          <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.invoice.complianceNote}</span>
            </div>
            <span>Ref: {payout.payoutReference}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
