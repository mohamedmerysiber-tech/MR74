import React, { useState } from 'react';
import {
  PaymentTransaction,
  AdminWithdrawal,
  AdminTransfer,
  CurrencyCode,
} from '../types';
import { CURRENCIES, formatCurrency, convertAmount, convertAnyCurrency } from '../utils/currency';
import {
  ShieldCheck,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  Lock,
  Wallet,
  Users,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  transactions: PaymentTransaction[];
  withdrawals: AdminWithdrawal[];
  transfers: AdminTransfer[];
  onExecuteWithdrawal: (withdrawal: AdminWithdrawal) => void;
  onExecuteTransfer: (transfer: AdminTransfer) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  transactions,
  withdrawals,
  transfers,
  onExecuteWithdrawal,
  onExecuteTransfer,
}) => {
  // Financial balance state
  const [adminCurrency, setAdminCurrency] = useState<CurrencyCode>('XOF');
  const [activeTab, setActiveTab] = useState<'deposits' | 'withdrawals' | 'transfers' | 'subscribers' | 'converter'>('deposits');

  // Country & Search filters
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals for 0% fee actions
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState<boolean>(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(500000);
  const [withdrawalTargetCur, setWithdrawalTargetCur] = useState<CurrencyCode>('XOF');
  const [withdrawalDestination, setWithdrawalDestination] = useState<string>('Compte Bancaire Tokyo Chase (0% de frais)');

  const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);
  const [transferAmount, setTransferAmount] = useState<number>(200000);
  const [transferTargetCur, setTransferTargetCur] = useState<CurrencyCode>('USD');
  const [transferRecipient, setTransferRecipient] = useState<string>('Kenji Tanaka (Tokyo Animation Lab)');
  const [transferBeneficiaryType, setTransferBeneficiaryType] = useState<any>('Animateur Tokyo');

  // Calculator / Converter widget state
  const [calcAmount, setCalcAmount] = useState<number>(500000);
  const [calcFromCur, setCalcFromCur] = useState<CurrencyCode>('XOF');
  const [calcToCur, setCalcToCur] = useState<CurrencyCode>('USD');

  // Calculate totals
  const totalDepositsXOF = transactions.reduce((acc, t) => acc + t.amountXOF, 0);
  const totalWithdrawalsXOF = withdrawals.reduce((acc, w) => acc + w.amountXOF, 0);
  const totalTransfersXOF = transfers.reduce((acc, tr) => acc + tr.amountXOF, 0);
  const availableBalanceXOF = Math.max(0, totalDepositsXOF - totalWithdrawalsXOF - totalTransfersXOF);

  // Filtered deposits
  const filteredTransactions = transactions.filter((tx) => {
    const matchesCountry = countryFilter === 'all' || tx.country === countryFilter;
    const matchesSearch =
      tx.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawalAmount <= 0) return;

    const newWithdrawal: AdminWithdrawal = {
      id: `WDR-${Math.floor(100 + Math.random() * 900)}`,
      amountXOF: withdrawalAmount,
      targetAmount: convertAmount(withdrawalAmount, withdrawalTargetCur),
      targetCurrency: withdrawalTargetCur,
      destination: withdrawalDestination,
      recipientName: 'Directeur Fondateur Kamui SAS',
      date: 'À l\'instant',
      status: 'Exécuté',
      feePercent: 0,
    };

    onExecuteWithdrawal(newWithdrawal);
    setIsWithdrawalModalOpen(false);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferAmount <= 0) return;

    const newTransfer: AdminTransfer = {
      id: `TRF-${Math.floor(100 + Math.random() * 900)}`,
      amountXOF: transferAmount,
      targetAmount: convertAmount(transferAmount, transferTargetCur),
      targetCurrency: transferTargetCur,
      recipient: transferRecipient,
      beneficiaryType: transferBeneficiaryType,
      date: 'À l\'instant',
      reference: `AUTO-TRANSFER-${Date.now().toString().slice(-6)}-0%FEES`,
      status: 'Instantané',
      feePercent: 0,
    };

    onExecuteTransfer(newTransfer);
    setIsTransferModalOpen(false);
  };

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner with Owner Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>ESPACE PROPRIÉTAIRE HAUTEMENT SÉCURISÉ · 0% DE FRAIS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tableau de Bord Financier Administrateur
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Encaissements automatisés par webhooks, retraits directs 0% et transferts internationaux instantanés sans aucun frais.
          </p>
        </div>

        {/* Currency Switcher for Entire Admin Dashboard */}
        <div className="flex items-center gap-2 bg-[#121624] p-1.5 rounded-xl border border-white/15">
          <span className="text-xs text-slate-400 font-medium px-2">Devise d'affichage :</span>
          {(['XOF', 'USD', 'EUR', 'JPY', 'NGN'] as CurrencyCode[]).map((cur) => (
            <button
              key={cur}
              onClick={() => setAdminCurrency(cur)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                adminCurrency === cur
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Available Balance */}
        <div className="p-5 rounded-2xl bg-[#0f1424] border border-indigo-500/30 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Solde Disponible</span>
            <Wallet className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums mb-1">
            {formatCurrency(availableBalanceXOF, adminCurrency)}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <span>0% frais retenus · 100% encaissé</span>
          </div>
        </div>

        {/* Total Participant Deposits */}
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Dépôts des Participants</span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums mb-1">
            {formatCurrency(totalDepositsXOF, adminCurrency)}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {transactions.length} transactions webhooks traitées
          </div>
        </div>

        {/* Total Withdrawals */}
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Total Retraits Effectués</span>
            <ArrowUpRight className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums mb-1">
            {formatCurrency(totalWithdrawalsXOF, adminCurrency)}
          </div>
          <div className="text-[11px] text-indigo-300 font-mono">
            0% de commission bancaire
          </div>
        </div>

        {/* Total Automated Transfers */}
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Transferts Automatiques (0% Frais)</span>
            <RefreshCw className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums mb-1">
            {formatCurrency(totalTransfersXOF, adminCurrency)}
          </div>
          <div className="text-[11px] text-amber-300 font-mono">
            Instantané vers studios partenaires
          </div>
        </div>

      </div>

      {/* Action Strip: Retraits 0% Frais, Transferts Automatiques 0% Frais & Convertisseur */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#101422] border border-white/10 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Actions Financières Immédiates :
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsWithdrawalModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Effectuer un Retrait (0 % de frais)</span>
          </button>

          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Exécuter un Transfert Automatique (0 % de frais)</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('deposits')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'deposits'
              ? 'bg-white text-slate-900 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Dépôts des Participants ({transactions.length})
        </button>

        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'withdrawals'
              ? 'bg-white text-slate-900 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Historique des Retraits (0% Frais)
        </button>

        <button
          onClick={() => setActiveTab('transfers')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'transfers'
              ? 'bg-white text-slate-900 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Transferts Automatiques (0% Frais)
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'subscribers'
              ? 'bg-white text-slate-900 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gestion des Abonnés & Durées Bonus
        </button>

        <button
          onClick={() => setActiveTab('converter')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'converter'
              ? 'bg-white text-slate-900 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Convertisseur Universel Intégré
        </button>
      </div>

      {/* Tab 1: Dépôts des participants with search & country filter */}
      {activeTab === 'deposits' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="p-3.5 rounded-xl bg-[#0e121c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, email, plan ou réf transaction..."
                className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-400">Filtrer par pays :</span>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="all">Tous les pays</option>
                <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                <option value="Sénégal">Sénégal</option>
                <option value="Mali">Mali</option>
                <option value="France">France</option>
                <option value="États-Unis">États-Unis</option>
                <option value="Japon">Japon</option>
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>
          </div>

          {/* Deposits Table */}
          <div className="rounded-xl border border-white/10 bg-[#0e121c] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/40 border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="py-3 px-4">Transaction / Date</th>
                    <th className="py-3 px-4">Client / Utilisateur</th>
                    <th className="py-3 px-4">Formule Souscrite</th>
                    <th className="py-3 px-4">Passerelle & Méthode</th>
                    <th className="py-3 px-4">Pays</th>
                    <th className="py-3 px-4 text-right">Montant Encaissé</th>
                    <th className="py-3 px-4 text-center">Frais</th>
                    <th className="py-3 px-4 text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-white">{tx.id}</div>
                        <div className="text-[10px] text-slate-400">{tx.date}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{tx.userName}</div>
                        <div className="text-[10px] text-slate-400">{tx.userEmail}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-rose-300">{tx.planName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[10px] text-slate-200">
                          {tx.gateway} · {tx.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {tx.country}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                        <div>{formatCurrency(tx.amountXOF, adminCurrency)}</div>
                        {adminCurrency !== tx.paidCurrency && (
                          <div className="text-[10px] text-slate-400 font-normal">
                            Origine : {tx.paidAmount.toLocaleString()} {tx.paidCurrency}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-emerald-400 font-bold">
                        0 %
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Historique des Retraits */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Historique des Retraits sans Frais (0 % de commission)
            </h3>
            <button
              onClick={() => setIsWithdrawalModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Nouveau Retrait 0%
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0e121c] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Réf Retrait</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Bénéficiaire & Destination</th>
                  <th className="py-3 px-4 text-right">Montant Retiré</th>
                  <th className="py-3 px-4 text-center">Frais Prélevés</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td className="py-3 px-4 font-mono font-bold text-white">{w.id}</td>
                    <td className="py-3 px-4 text-slate-400">{w.date}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{w.recipientName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{w.destination}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                      {formatCurrency(w.amountXOF, adminCurrency)}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                      0 % (Sans Frais)
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Transferts Automatiques */}
      {activeTab === 'transfers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Transferts d'Argent Automatiques sans Frais vers Partenaires
            </h3>
            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Nouveau Transfert 0%
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0e121c] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Référence</th>
                  <th className="py-3 px-4">Destinataire</th>
                  <th className="py-3 px-4">Catégorie</th>
                  <th className="py-3 px-4 text-right">Montant Débité</th>
                  <th className="py-3 px-4 text-right">Montant Reçu (Converti)</th>
                  <th className="py-3 px-4 text-center">Frais de Transfert</th>
                  <th className="py-3 px-4 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {transfers.map((tr) => (
                  <tr key={tr.id}>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      <div>{tr.id}</div>
                      <div className="text-[10px] text-slate-400">{tr.reference}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">{tr.recipient}</td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px]">
                        {tr.beneficiaryType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                      {formatCurrency(tr.amountXOF, adminCurrency)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-indigo-300 tabular-nums">
                      {tr.targetAmount.toLocaleString()} {tr.targetCurrency}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                      0 % (Gratuit)
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                        {tr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Subscribers Management */}
      {activeTab === 'subscribers' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0e121c] border border-white/10 text-xs text-slate-300">
            <h4 className="font-bold text-white mb-1">Règles d'Attribution & Durées Bonus Appliquées</h4>
            <p className="leading-relaxed">
              • <strong>Packs Découverte à Avancé :</strong> Validité 1 mois simple.<br />
              • <strong>Packs Pro & Expert (100 000 & 200 000 FCFA) :</strong> <strong>3 mois d'utilisation</strong> inclus.<br />
              • <strong>Pack Studio Ultime (500 000 FCFA) :</strong> <strong>4 mois d'utilisation avec rechargement automatique sans repayer</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0e121c] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Créateur</th>
                  <th className="py-3 px-4">Pack Souscrit</th>
                  <th className="py-3 px-4">Durée Attribuée</th>
                  <th className="py-3 px-4">Rechargement Auto</th>
                  <th className="py-3 px-4">Filigrane</th>
                  <th className="py-3 px-4 text-center">État</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">Koffi Jean-Eudes</div>
                    <div className="text-[10px] text-slate-400">Côte d'Ivoire · Wave</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-amber-300">Pack Studio Ultime</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">4 mois inclus</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                      Actif (0 FCFA requis)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Totalement Supprimé</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                      Actif
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">Amadou Fall</div>
                    <div className="text-[10px] text-slate-400">Sénégal · Orange Money</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-rose-300">Pack Expert</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">3 mois inclus</td>
                  <td className="py-3 px-4 text-slate-400">Renouvellement manuel</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Totalement Supprimé</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                      Actif
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">Liam Vance</div>
                    <div className="text-[10px] text-slate-400">USA · Stripe USD</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-amber-300">Pack Studio Ultime</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">4 mois inclus</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                      Actif (0$ requis)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Totalement Supprimé</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                      Actif
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Convertisseur universel intégré */}
      {activeTab === 'converter' && (
        <div className="p-6 rounded-2xl bg-[#0e121c] border border-white/10 max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
            <RefreshCw className="w-4 h-4" />
            <span>MOTEUR DE CONVERSION MULTI-DEVISES UNIVERSEL</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Convertisseur de devises mondial en temps réel
          </h3>
          <p className="text-xs text-slate-300 mb-6">
            Convertissez instantanément n'importe quel montant vers n'importe quelle devise mondiale pour vos encaissements et retraits 0% de frais.
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Montant initial</label>
              <input
                type="number"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-lg font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Devise source</label>
                <select
                  value={calcFromCur}
                  onChange={(e) => setCalcFromCur(e.target.value as CurrencyCode)}
                  className="w-full p-2.5 rounded-xl bg-[#141a29] border border-white/10 text-white font-mono"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>
                      {CURRENCIES[c as CurrencyCode].flag} {c} — {CURRENCIES[c as CurrencyCode].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Devise cible</label>
                <select
                  value={calcToCur}
                  onChange={(e) => setCalcToCur(e.target.value as CurrencyCode)}
                  className="w-full p-2.5 rounded-xl bg-[#141a29] border border-white/10 text-white font-mono"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>
                      {CURRENCIES[c as CurrencyCode].flag} {c} — {CURRENCIES[c as CurrencyCode].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conversion Result Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/50 border border-indigo-500/40 text-center">
              <div className="text-[11px] text-indigo-300 font-mono mb-1">
                Résultat exact converti
              </div>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {convertAnyCurrency(calcAmount, calcFromCur, calcToCur).toLocaleString()} {CURRENCIES[calcToCur].symbol}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-2">
                Taux garanti sans frais de change cachés
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Effectuer un Retrait 0% Frais */}
      {isWithdrawalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#0f1424] border border-emerald-500/30 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
              <span>Effectuer un Retrait sans Frais (0%)</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Transférez les fonds de votre solde disponible vers votre compte bancaire ou compte Mobile Money sans aucune déduction de frais.
            </p>

            <form onSubmit={handleWithdrawalSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Montant à retirer (en FCFA)</label>
                <input
                  type="number"
                  max={availableBalanceXOF}
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white font-mono font-bold"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Solde max disponible : {availableBalanceXOF.toLocaleString()} FCFA
                </span>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Convertir dans la devise de réception</label>
                <select
                  value={withdrawalTargetCur}
                  onChange={(e) => setWithdrawalTargetCur(e.target.value as CurrencyCode)}
                  className="w-full p-2.5 rounded-lg bg-[#141a29] border border-white/10 text-white font-mono"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>
                      {c} ({CURRENCIES[c as CurrencyCode].name})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">
                  Montant net reçu : {convertAmount(withdrawalAmount, withdrawalTargetCur).toLocaleString()} {withdrawalTargetCur} (0% frais)
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Destination du virement</label>
                <input
                  type="text"
                  value={withdrawalDestination}
                  onChange={(e) => setWithdrawalDestination(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWithdrawalModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Valider le Retrait 0%
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Exécuter un Transfert Automatique 0% Frais */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#0f1424] border border-indigo-500/30 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-indigo-400" />
              <span>Transfert Automatique sans Frais (0%)</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Envoyez des fonds instantanément à un animateur, sound designer ou studio partenaire avec conversion automatique.
            </p>

            <form onSubmit={handleTransferSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Montant du transfert (en FCFA)</label>
                <input
                  type="number"
                  max={availableBalanceXOF}
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                  required
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Devise de destination</label>
                <select
                  value={transferTargetCur}
                  onChange={(e) => setTransferTargetCur(e.target.value as CurrencyCode)}
                  className="w-full p-2.5 rounded-lg bg-[#141a29] border border-white/10 text-white font-mono"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>
                      {c} ({CURRENCIES[c as CurrencyCode].name})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-indigo-300 font-mono mt-1">
                  Reçu par le bénéficiaire : {convertAmount(transferAmount, transferTargetCur).toLocaleString()} {transferTargetCur}
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Destinataire / Partenaire</label>
                <input
                  type="text"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Catégorie de prestation</label>
                <select
                  value={transferBeneficiaryType}
                  onChange={(e) => setTransferBeneficiaryType(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#141a29] border border-white/10 text-white"
                >
                  <option value="Animateur Tokyo">Animateur Tokyo</option>
                  <option value="Studio Partenaire">Studio Partenaire</option>
                  <option value="Sound Designer">Sound Designer</option>
                  <option value="Co-producteur">Co-producteur</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  Exécuter le Transfert 0%
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
