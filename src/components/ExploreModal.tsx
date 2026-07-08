import { useState } from 'react';
import { X, Shield, Users, Database, Vote, ChevronRight, Check } from 'lucide-react';
import { WalletState, Proposal } from '../types';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  initialTab?: string;
}

export default function ExploreModal({ isOpen, onClose, wallet, initialTab = 'decentralized' }: ExploreModalProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Live DAO proposals tracker
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'TYN-01: Incorporate Eastern Philosophy Principles into Smart Contract Engine',
      status: 'active',
      votesFor: 124500,
      votesAgainst: 42300,
      endTime: '2026-07-20',
    },
    {
      id: 2,
      title: 'TYN-02: Allocate 15% Ecosystem Fund to Digital Cultural Heritage Digitization',
      status: 'active',
      votesFor: 98400,
      votesAgainst: 12100,
      endTime: '2026-07-15',
    },
    {
      id: 3,
      title: 'TYN-03: Transition Consensus Nodes from Proof-of-Stake to Harmony Proof-of-Accord',
      status: 'passed',
      votesFor: 320000,
      votesAgainst: 88000,
      endTime: '2026-06-28',
    }
  ]);

  if (!isOpen) return null;

  const tabs = [
    {
      id: 'decentralized',
      titleZh: '去中心化',
      titleEn: 'Decentralized',
      icon: Users,
    },
    {
      id: 'smart-contracts',
      titleZh: '智能合约',
      titleEn: 'Smart Contracts',
      icon: Shield,
    },
    {
      id: 'digital-assets',
      titleZh: '数字资产',
      titleEn: 'Digital Assets',
      icon: Database,
    },
    {
      id: 'dao-governance',
      titleZh: '共识治理',
      titleEn: 'DAO Governance',
      icon: Vote,
    },
  ];

  const handleVote = (proposalId: number, side: 'for' | 'against') => {
    if (!wallet.connected) return;

    setProposals(prev =>
      prev.map(p => {
        if (p.id !== proposalId || p.voted) return p;
        const weight = Math.round(parseFloat(wallet.balance || '0') * 100);
        return {
          ...p,
          voted: side,
          votesFor: side === 'for' ? p.votesFor + weight : p.votesFor,
          votesAgainst: side === 'against' ? p.votesAgainst + weight : p.votesAgainst,
        };
      })
    );
  };

  return (
    <div id="explore-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
      <div
        id="explore-modal-container"
        className="relative w-full max-w-4xl h-[85vh] flex flex-col bg-[#0A0A0A] border border-[#262626] rounded shadow-2xl overflow-hidden"
      >
        <div className="scanline" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#262626] shrink-0 bg-black/20 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-[#C2A87E]" />
            <div>
              <h2 className="font-serif text-lg text-[#C2A87E] tracking-[0.2em] uppercase">Ecosystem Core</h2>
              <p className="text-xs text-[#A3A3A3] mt-0.5">Explore the pillars of Tianyan technology</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-[#C2A87E] transition-colors rounded hover:bg-[#1A1A1A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content (Split Sidebar & Content) */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-64 border-r border-[#262626] bg-[#111111]/20 flex md:flex-col p-4 gap-2 overflow-x-auto md:overflow-x-visible shrink-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full p-3 text-left rounded transition-all border whitespace-nowrap md:whitespace-normal ${
                    isActive
                      ? 'border-[#C2A87E]/30 bg-[#1A1A1A] text-[#C2A87E]'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-[#111111]/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-[#C2A87E]' : 'text-gray-400'}`} />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-[#C2A87E]/60 uppercase leading-none mb-1">
                      {tab.titleZh}
                    </span>
                    <span className="font-sans text-xs font-medium tracking-wide">
                      {tab.titleEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {activeTab === 'decentralized' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#E5E5E5] tracking-wide">去中心化 • Distributed Consensus</h3>
                  <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
                    Tianyan's peer-to-peer ledger network is anchored in high-density validation clusters spread globally. Following Eastern philosophical alignments of balance and harmony, nodes are organized into natural validation rings to ensure high fault tolerance and resilient uptime.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-[#262626] bg-[#111111]/40 rounded">
                    <h4 className="text-[10px] font-mono text-[#C2A87E] tracking-wider uppercase mb-1">Dual-Tier Verification</h4>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      Utilizes multi-signature regional structures that finalize blocks with sub-second latency before state commits are aggregated.
                    </p>
                  </div>
                  <div className="p-4 border border-[#262626] bg-[#111111]/40 rounded">
                    <h4 className="text-[10px] font-mono text-[#C2A87E] tracking-wider uppercase mb-1">Sovereign Interconnection</h4>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      Cross-chain integration allows nodes to map data seamlessly to other secure networks without exposing client verification details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'smart-contracts' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#E5E5E5] tracking-wide">智能合约 • Deterministic Agreements</h3>
                  <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
                    Deploy secure, high-concurrency logical units into a sandboxed environment. Tianyan Smart Contracts leverage declarative execution pathways, rendering them highly secure against state-reentrancy exploits and recursive drainage vectors.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-[#262626] bg-[#111111]/40 rounded">
                    <h4 className="text-[10px] font-mono text-[#C2A87E] tracking-wider uppercase mb-1">Sandboxed Sandboxing</h4>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      Complete memory boundaries ensure contracts execute with strict, predictable compute costs (Gas) and complete separation from underlying operating parameters.
                    </p>
                  </div>
                  <div className="p-4 border border-[#262626] bg-[#111111]/40 rounded">
                    <h4 className="text-[10px] font-mono text-[#C2A87E] tracking-wider uppercase mb-1">Immutable Audits</h4>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      Compiled bytecodes are stored as root state hashes, allowing continuous cryptographic proofs and zero-knowledge logical verifications.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'digital-assets' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#E5E5E5] tracking-wide">数字资产 • Cultural Tokenization</h3>
                  <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
                    Map historical assets, premium fine arts, and traditional craft legacies into highly liquid, divisible on-chain representations. We connect the physical heritage of the past with the decentralized value architecture of tomorrow.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-[#262626] bg-[#111111]/40 rounded">
                    <h4 className="text-[10px] font-mono text-[#C2A87E] tracking-wider uppercase mb-1">Dual-Token Harmony</h4>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      $TYN fuels smart executions and consensus rewards, while integrated fractional certificates store the underlying backing values of physical real estate and arts.
                    </p>
                  </div>
                  <div className="p-4 border border-[#262626] bg-[#111111]/40 rounded">
                    <h4 className="text-[10px] font-mono text-[#C2A87E] tracking-wider uppercase mb-1">Heritage Registries</h4>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">
                      Authenticity proofs linked to verified physical museums and creators ensure long-term value appreciation and copyright trace integrity.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dao-governance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#E5E5E5] tracking-wide">共识治理 • Democratic Alignment</h3>
                  <p className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
                    Decentralized consensus means the community holds the steering helm. TYN token-holders propose, debate, and vote on system parameters, fee distributions, and developmental initiatives directly on-chain.
                  </p>
                </div>

                {/* Proposals section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono text-[#C2A87E] tracking-widest uppercase border-b border-[#262626] pb-2">
                    Active Governance Proposals
                  </h4>

                  {proposals.map(proposal => {
                    const totalVotes = proposal.votesFor + proposal.votesAgainst;
                    const pctFor = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 50;
                    const pctAgainst = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 50;

                    return (
                      <div
                        key={proposal.id}
                        className="p-4 border border-[#262626] bg-[#111111]/40 rounded flex flex-col space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <h5 className="text-xs font-medium text-[#E5E5E5] max-w-lg leading-snug">
                            {proposal.title}
                          </h5>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded ${
                              proposal.status === 'active'
                                ? 'bg-[#C2A87E]/10 text-[#C2A87E] border border-[#C2A87E]/30'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {proposal.status}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-[#A3A3A3]">
                            <span>For: {proposal.votesFor.toLocaleString()} TYN ({pctFor.toFixed(1)}%)</span>
                            <span>Against: {proposal.votesAgainst.toLocaleString()} TYN ({pctAgainst.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full h-1 bg-black rounded overflow-hidden flex">
                            <div className="h-full bg-[#C2A87E]" style={{ width: `${pctFor}%` }} />
                            <div className="h-full bg-red-900/40" style={{ width: `${pctAgainst}%` }} />
                          </div>
                        </div>

                        {/* Vote Action */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#262626]">
                          <span className="text-[9px] font-mono text-[#666666]">
                            Ends: {proposal.endTime} UTC
                          </span>

                          {proposal.voted ? (
                            <div className="flex items-center text-[10px] font-mono text-emerald-400">
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Voted {proposal.voted === 'for' ? 'FOR' : 'AGAINST'}
                            </div>
                          ) : proposal.status === 'active' ? (
                            wallet.connected ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleVote(proposal.id, 'for')}
                                  className="px-2 py-1 text-[9px] font-mono bg-[#C2A87E]/10 text-[#C2A87E] border border-[#C2A87E]/30 hover:bg-[#C2A87E] hover:text-black transition-all rounded"
                                >
                                  Vote For
                                </button>
                                <button
                                  onClick={() => handleVote(proposal.id, 'against')}
                                  className="px-2 py-1 text-[9px] font-mono bg-red-950/10 text-red-400 border border-red-950/20 hover:bg-red-950 hover:text-white transition-all rounded"
                                >
                                  Vote Against
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-gray-500 italic">
                                Connect wallet to cast vote
                              </span>
                            )
                          ) : (
                            <span className="text-[9px] font-mono text-gray-500 uppercase">
                              Voting closed
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
