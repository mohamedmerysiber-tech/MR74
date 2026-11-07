import React, { useState } from 'react';
import { PlanTier, CurrencyCode, PaymentTransaction } from '../types';
import { CURRENCIES, formatCurrency, convertAmount } from '../utils/currency';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

interface CheckoutModalProps {
  plan: PlanTier;
  selectedCurrency: CurrencyCode;
  onClose: () => void;
  onSuccess: (transaction: PaymentTransaction) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  plan,
  selectedCurrency,
  onClose,
  onSuccess,
}) => {
  const [paymentTab, setPaymentTab] = useState<'mobile_money' | 'card'>('mobile_money');
  const [mobileOperator, setMobileOperator] = useState<'Wave' | 'Orange Money' | 'MTN MoMo' | 'Moov'>('Wave');
  const [phoneNumber, setPhoneNumber] = useState('+225 07 48 92 10 33');
  const [clientName, setClientName] = useState('Jean-Philippe Kouamé');
  const [clientEmail, setClientEmail] = useState('jp.kouame@animestudio.ci');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const convertedPrice = convertAmount(plan.priceXOF, selectedCurrency);
  const formattedPrice = formatCurrency(plan.priceXOF, selectedCurrency);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const newTx: PaymentTransaction = {
        id: `TX-KM-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: `usr-${Date.now().toString().slice(-4)}`,
        userName: clientName,
        userEmail: clientEmail,
        planId: plan.id,
        planName: plan.name,
        amountXOF: plan.priceXOF,
        paidAmount: convertedPrice,
        paidCurrency: selectedCurrency,
        paymentMethod: paymentTab === 'mobile_money' ? mobileOperator : 'Stripe',
        gateway: paymentTab === 'mobile_money' ? 'CinetPay' : 'Stripe',
        country: selectedCurrency === 'XOF' ? "Côte d'Ivoire" : selectedCurrency === 'XAF' ? 'Cameroun' : 'International',
        date: 'À l\'instant',
        status: 'Encaissé',
        fee: 0,
      };

      setTimeout(() => {
        onSuccess(newTx);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0e121c] border border-white/15 shadow-2xl p-6 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">
              Paiement Validé & Forfait Activé !
            </h3>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Votre souscription au <strong>{plan.name}</strong> ({plan.periodLabel}) est opérationnelle. Le filigrane Kamui Studio est immédiatement supprimé de vos vidéos.
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-400 font-mono">
              Montant déposé avec succès : {formattedPrice} (0% frais de transaction)
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ENCAISSEMENT AUTOMATISÉ · ACTIVATION INSTANTANÉE</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Souscrire au {plan.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-white font-mono">
                  {formattedPrice}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  / {plan.periodLabel}
                </span>
              </div>
            </div>

            {/* Payment Method Selector (Mobile Money vs Card) */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-white/10 mb-5">
              <button
                type="button"
                onClick={() => setPaymentTab('mobile_money')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentTab === 'mobile_money'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Money (Afrique)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('card')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentTab === 'card'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Carte Bancaire / Stripe</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleProcessPayment} className="space-y-4">
              
              {paymentTab === 'mobile_money' ? (
                <>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                      Sélectionnez l'opérateur Mobile Money (CinetPay / FedaPay)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'Wave', label: 'Wave', color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300' },
                        { id: 'Orange Money', label: 'Orange', color: 'border-orange-500/50 bg-orange-950/20 text-orange-300' },
                        { id: 'MTN MoMo', label: 'MTN', color: 'border-yellow-500/50 bg-yellow-950/20 text-yellow-300' },
                        { id: 'Moov', label: 'Moov', color: 'border-blue-500/50 bg-blue-950/20 text-blue-300' },
                      ].map((op) => (
                        <button
                          key={op.id}
                          type="button"
                          onClick={() => setMobileOperator(op.id as any)}
                          className={`p-2 rounded-lg border text-center text-xs font-bold transition-all cursor-pointer ${
                            mobileOperator === op.id
                              ? `${op.color} ring-1 ring-white/30`
                              : 'border-white/10 bg-black/30 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Numéro de téléphone Mobile Money
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                      placeholder="+225 07 XX XX XX XX"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Numéro de carte Visa / Mastercard
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Expiration</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">CVC</label>
                      <input
                        type="password"
                        defaultValue="842"
                        className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email de réception</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Traitement sécurisé du webhook...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Payer {formattedPrice} et activer immédiatement</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paiement chiffré 256-bit · 0% de frais prélevés sur votre paiement</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
