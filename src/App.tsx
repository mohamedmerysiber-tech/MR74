import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhotoTransformationShowcase } from './components/PhotoTransformationShowcase';
import { StudioCreator } from './components/StudioCreator';
import { PricingCatalog } from './components/PricingCatalog';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppCollabPanel } from './components/WhatsAppCollabPanel';
import { AdminDashboard } from './components/AdminDashboard';
import { WorldStudioSpotlight } from './components/WorldStudioSpotlight';
import { FamousStudioPipeline } from './components/FamousStudioPipeline';
import { Footer } from './components/Footer';

import {
  CurrencyCode,
  GeolocationData,
  PlanTier,
  UserSubscription,
  CharacterItem,
  LandscapeItem,
  ChatMessage,
  Collaborator,
  PaymentTransaction,
  AdminWithdrawal,
  AdminTransfer,
  StudioStyle,
  TargetAudience,
  SupernaturalMotion,
} from './types';

import { PRESET_COUNTRIES } from './utils/currency';
import { SUBSCRIPTION_PLANS } from './data/plans';
import {
  INITIAL_CHARACTERS,
  INITIAL_LANDSCAPES,
  INITIAL_COLLABORATORS,
  INITIAL_MESSAGES,
  INITIAL_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_TRANSFERS,
} from './data/initialData';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'marketing' | 'studio' | 'pricing' | 'admin'>('marketing');

  // Geolocation & Multi-currency state
  // Default to Côte d'Ivoire (Zone Franc CFA) as requested in specs
  const [currentGeo, setCurrentGeo] = useState<GeolocationData>(PRESET_COUNTRIES.CI);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('XOF');

  // User subscription state: starts with 3 Free Trial credits, watermark enabled
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    tierId: 'free-trial',
    tierName: 'Essai Gratuit',
    freeTrialCredits: 3,
    isPaid: false,
    watermarkEnabled: true,
    startedAt: 'Aujourd\'hui',
    expiresAt: 'Dans 30 jours',
    monthsRemaining: 1,
    autoRechargeActive: false,
  });

  // Current active plan if paid
  const [currentPlan, setCurrentPlan] = useState<PlanTier | null>(null);

  // Studio Entities
  const [characters, setCharacters] = useState<CharacterItem[]>(INITIAL_CHARACTERS);
  const [landscapes, setLandscapes] = useState<LandscapeItem[]>(INITIAL_LANDSCAPES);
  const [activeLandscape, setActiveLandscape] = useState<LandscapeItem | null>(INITIAL_LANDSCAPES[0]);

  // WhatsApp Collaborative Messenger
  const [isCollabChatOpen, setIsCollabChatOpen] = useState<boolean>(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(INITIAL_COLLABORATORS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [unreadChatCount, setUnreadChatCount] = useState<number>(1);

  // Financial transactions & Admin state
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [withdrawals, setWithdrawals] = useState<AdminWithdrawal[]>(INITIAL_WITHDRAWALS);
  const [transfers, setTransfers] = useState<AdminTransfer[]>(INITIAL_TRANSFERS);

  // Checkout modal
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanTier | null>(null);

  // Handler for Geolocation change
  const handleSelectCountry = (geo: GeolocationData) => {
    setCurrentGeo(geo);
    setSelectedCurrency(geo.currency);
  };

  // Handler for Free Trial start
  const handleStartFreeTrial = () => {
    setActiveTab('studio');
  };

  // Handler for selecting plan in pricing
  const handleSelectPlan = (plan: PlanTier) => {
    setSelectedPlanForCheckout(plan);
  };

  // Handler for successful payment deposit
  const handlePaymentSuccess = (transaction: PaymentTransaction) => {
    // 1. Add deposit to transactions list for admin
    setTransactions((prev) => [transaction, ...prev]);

    // 2. Locate plan
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === transaction.planId);
    if (plan) {
      setCurrentPlan(plan);
      setUserSubscription({
        tierId: plan.id,
        tierName: plan.name,
        freeTrialCredits: 999,
        isPaid: true,
        watermarkEnabled: false, // Watermark totally removed on paid subscription
        startedAt: 'Aujourd\'hui',
        expiresAt: `Dans ${plan.billingMonths} mois`,
        monthsRemaining: plan.billingMonths,
        autoRechargeActive: plan.autoRecharge,
      });
    }

    // 3. Close checkout modal
    setSelectedPlanForCheckout(null);

    // 4. Redirect to Studio 4K with watermark-free celebration
    setActiveTab('studio');
  };

  // Collaborative chat send message
  const handleSendMessage = (content: string, type: 'text' | 'script' | 'audio' = 'text') => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: 'Vous (Réalisateur)',
      senderRole: 'Vous',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      status: 'read',
    };
    setMessages((prev) => [...prev, newMsg]);

    // Auto simulated reply from Kenji Tanaka (Tokyo Director) after 1.8s
    setTimeout(() => {
      const replies = [
        'Parfaitement reçu ! J\'ai ajusté le cadrage dynamique en 4K. La fluidité des mouvements est superbe.',
        'Excellente suggestion de script. Le doublage japonais synchronise parfaitement la réplique.',
        'La colorimétrie crépusculaire de Shinkai est bien calibrée. Prêt pour l\'export final !',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: 'collab-1',
        senderName: 'Kenji Tanaka',
        senderRole: 'Directeur d\'Animation',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        content: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        status: 'read',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1800);
  };

  // Add collaborator
  const handleAddCollaborator = (name: string, role: string) => {
    const newCollab: Collaborator = {
      id: `collab-${Date.now()}`,
      name,
      role,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      status: 'online',
    };
    setCollaborators((prev) => [...prev, newCollab]);

    // System welcome message
    const sysMsg: ChatMessage = {
      id: `msg-sys-${Date.now()}`,
      senderId: newCollab.id,
      senderName: newCollab.name,
      senderRole: newCollab.role,
      avatar: newCollab.avatar,
      content: `Bonjour à tous ! Ravi de rejoindre le studio de production Kamui sur ce projet d'animé.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'read',
    };
    setMessages((prev) => [...prev, sysMsg]);
  };

  // Execute withdrawal (0% fees)
  const handleExecuteWithdrawal = (withdrawal: AdminWithdrawal) => {
    setWithdrawals((prev) => [withdrawal, ...prev]);
  };

  // Execute transfer (0% fees)
  const handleExecuteTransfer = (transfer: AdminTransfer) => {
    setTransfers((prev) => [transfer, ...prev]);
  };

  // Selected Studio Style (Saitama, Miraculous, Bizarre Creatures, Donghua)
  const [selectedStudioStyle, setSelectedStudioStyle] = useState<StudioStyle>('japanese_saitama');

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-rose-600 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentGeo={currentGeo}
        onSelectCountry={handleSelectCountry}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userSubscription={userSubscription}
        onOpenCollabChat={() => {
          setIsCollabChatOpen(true);
          setUnreadChatCount(0);
        }}
        unreadChatCount={unreadChatCount}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'marketing' && (
          <>
            <HeroSection
              onStartFreeTrial={handleStartFreeTrial}
              onExploreStudio={() => setActiveTab('studio')}
              onOpenPricing={() => setActiveTab('pricing')}
            />

            {/* Spotlight Showcase / Présentation Pub Animée Mondiale 52K */}
            <WorldStudioSpotlight
              onSelectStudioStyle={(style) => setSelectedStudioStyle(style)}
              onOpenStudio={() => setActiveTab('studio')}
            />

            {/* Pipeline de Production des Studios Célèbres (Disney, Ghibli, Ufotable, Light Chaser) */}
            <FamousStudioPipeline
              onApplyPipelinePreset={(preset) => {
                setSelectedStudioStyle(preset.studioStyle);
              }}
              onOpenStudio={() => setActiveTab('studio')}
            />

            <PhotoTransformationShowcase
              onOpenStudioWithPhoto={() => setActiveTab('studio')}
            />

            <PricingCatalog
              currentGeo={currentGeo}
              onSelectCountry={handleSelectCountry}
              selectedCurrency={selectedCurrency}
              onSelectCurrency={setSelectedCurrency}
              onSelectPlan={handleSelectPlan}
              userSubscription={userSubscription}
            />
          </>
        )}

        {activeTab === 'studio' && (
          <StudioCreator
            characters={characters}
            setCharacters={setCharacters}
            landscapes={landscapes}
            setLandscapes={setLandscapes}
            activeLandscape={activeLandscape}
            setActiveLandscape={setActiveLandscape}
            userSubscription={userSubscription}
            currentPlan={currentPlan}
            onUpgradePrompt={() => setActiveTab('pricing')}
            selectedStudioStyle={selectedStudioStyle}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingCatalog
            currentGeo={currentGeo}
            onSelectCountry={handleSelectCountry}
            selectedCurrency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
            onSelectPlan={handleSelectPlan}
            userSubscription={userSubscription}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            transactions={transactions}
            withdrawals={withdrawals}
            transfers={transfers}
            onExecuteWithdrawal={handleExecuteWithdrawal}
            onExecuteTransfer={handleExecuteTransfer}
          />
        )}
      </main>

      {/* WhatsApp Collaborative Chat Drawer */}
      <WhatsAppCollabPanel
        isOpen={isCollabChatOpen}
        onClose={() => setIsCollabChatOpen(false)}
        collaborators={collaborators}
        messages={messages}
        onSendMessage={handleSendMessage}
        onAddCollaborator={handleAddCollaborator}
      />

      {/* Automated Deposit & Checkout Modal */}
      {selectedPlanForCheckout && (
        <CheckoutModal
          plan={selectedPlanForCheckout}
          selectedCurrency={selectedCurrency}
          onClose={() => setSelectedPlanForCheckout(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Global Footer */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}
