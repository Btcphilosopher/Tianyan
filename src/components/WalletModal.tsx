import { useState } from 'react';
import { WalletState } from '../types';
import { X, Shield, Lock, Cpu, Sparkles, CheckCircle, RefreshCw } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectSuccess: (wallet: WalletState) => void;
}

export default function WalletModal({ isOpen, onClose, onConnectSuccess }: WalletModalProps) {
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('');

  if (!isOpen) return null;

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask Wallet',
      subtitle: 'Connect via browser extension',
      icon: Cpu,
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      subtitle: 'Scan with mobile or hardware device',
      icon: Sparkles,
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      subtitle: 'Connect via Coinbase Secure Link',
      icon: Shield,
    },
    {
      id: 'tianyan_core',
      name: 'Tianyan Ledger Core',
      subtitle: 'Decrypt via secure local keyfile',
      icon: Lock,
    },
  ];

  const handleConnect = (id: string) => {
    setConnectingId(id);
    const steps = [
      'Synchronizing node structures...',
      'Decrypting regional keyrings...',
      'Validating state proofs on-chain...',
      'Connected successfully!'
    ];

    let currentStep = 0;
    setLoadingStep(steps[currentStep]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        // Completed connection
        onConnectSuccess({
          connected: true,
          address: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('').slice(0, 4)}...${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('').slice(-4)}`,
          balance: (88.45 + Math.random() * 10).toFixed(2),
          loading: false,
        });
        setConnectingId(null);
        onClose();
      }
    }, 700);
  };

  return (
    <div id="wallet-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div
        id="wallet-modal-container"
        className="relative w-full max-w-md overflow-hidden bg-[#0A0A0A] border border-[#262626] rounded shadow-2xl p-6"
      >
        {/* Background glow lines */}
        <div className="absolute inset-0 bg-radial-gradient from-[#C2A87E]/4 to-transparent pointer-events-none" />
        <div className="scanline" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10 border-b border-[#262626] pb-4">
          <div>
            <h3 className="font-serif text-lg tracking-[0.2em] text-[#C2A87E] uppercase">Connect Ledger</h3>
            <p className="text-xs text-[#A3A3A3] mt-0.5">Choose your path to enter the ecosystem</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-[#C2A87E] transition-colors rounded hover:bg-[#1A1A1A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-3">
          {connectingId ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-2 border-[#C2A87E]/10 border-t-2 border-t-[#C2A87E] rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-[#C2A87E] animate-pulse" />
                </div>
              </div>
              <p className="font-mono text-xs text-[#C2A87E] tracking-widest uppercase animate-pulse">
                {loadingStep}
              </p>
              <p className="text-[11px] text-[#666666] mt-2 font-sans">
                Please confirm the signature request in your wallet client.
              </p>
            </div>
          ) : (
            <>
              {walletOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleConnect(option.id)}
                    className="flex items-center w-full p-3.5 text-left border border-[#262626] bg-[#111111]/40 hover:bg-[#1A1A1A] hover:border-[#C2A87E]/40 transition-all rounded group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-[#0A0A0A] border border-[#262626] rounded text-gray-500 group-hover:text-[#C2A87E] group-hover:border-[#C2A87E]/30 transition-all mr-4 shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs uppercase tracking-wider text-[#E5E5E5] group-hover:text-white transition-colors">
                        {option.name}
                      </div>
                      <div className="text-[11px] text-[#A3A3A3] truncate mt-0.5">
                        {option.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
              <div className="mt-4 pt-4 border-t border-[#262626] text-center">
                <span className="text-[9px] font-mono text-[#666666] tracking-widest uppercase">
                  Secured by Tianyan consensus layer
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
