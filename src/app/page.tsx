'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ConnectedAccounts from '@/components/ConnectedAccounts';
import CompetitorBenchmarks from '@/components/CompetitorBenchmarks';
import CompetitorComparison from '@/components/CompetitorComparison';
import EngagementOverview from '@/components/EngagementOverview';
import RecentActivity from '@/components/RecentActivity';
import AddAccountModal from '@/components/AddAccountModal';
import AddCompetitorModal from '@/components/AddCompetitorModal';

export default function Home() {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isAddCompetitorModalOpen, setIsAddCompetitorModalOpen] = useState(false);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <Header 
        onAddAccount={() => setIsAddAccountModalOpen(true)}
        onAddCompetitor={() => setIsAddCompetitorModalOpen(true)}
      />
      
      <div className="container mx-auto py-8 px-4">
        <ConnectedAccounts 
          onAddAccount={() => setIsAddAccountModalOpen(true)}
        />
        <CompetitorBenchmarks 
          onAddCompetitor={() => setIsAddCompetitorModalOpen(true)}
        />
        <CompetitorComparison />
        <EngagementOverview />
        <RecentActivity />
      </div>

      <AddAccountModal 
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
      />
      
      <AddCompetitorModal 
        isOpen={isAddCompetitorModalOpen}
        onClose={() => setIsAddCompetitorModalOpen(false)}
      />
    </main>
  );
}
