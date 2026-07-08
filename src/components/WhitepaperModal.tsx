import { useState } from 'react';
import { X, BookOpen, Hash, ArrowLeft, ArrowRight } from 'lucide-react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhitepaperModal({ isOpen, onClose }: WhitepaperModalProps) {
  const [activeChapter, setActiveChapter] = useState<number>(1);

  if (!isOpen) return null;

  const chapters = [
    {
      id: 1,
      title: 'I. Philosophy & Cosmic Genesis',
      subtitle: '太极生两仪 • The Origin of Order out of Chaos',
      content: `The name TIANYAN (天衍) represents "The Cosmic Expansion" or "Heaven's Evolution." Rooted in classic Eastern metaphysics, we recognize that true decentralized systems must mirror the natural laws of the cosmos. Just as the Tao generates the One, the One generates the Two, and the Two generate the Three, a distributed network propagates state transitions through harmonious multi-signature consensus layers.

By encoding the balancing principles of the Wuxing (Five Elements) and the structural symmetry of the Eight Trigrams (Bagua) into cryptographic parameters, Tianyan builds an absolute, trustless framework where conflict resolves into consensus automatically. This is not merely technology; it is the mathematical translation of cosmic alignment, offering a state machine that scales with absolute stability.`
    },
    {
      id: 2,
      title: 'II. Consensus Layer: Proof-of-Accord',
      subtitle: '万物并育而不相害 • Harmonious Node Cooperation',
      content: `Standard proof-of-work protocols rely on antagonistic computational competition, draining energy and inflating transaction overhead. Standard proof-of-stake systems centralize authority around sheer financial capital.

Tianyan introduces Proof-of-Accord (PoA), a novel Byzantine fault-tolerant consensus engine. In this framework, validation clusters are structured into interlocking circles representing mutual checking rings. Nodes do not race; they coordinate. By establishing a rotating validator sequence inspired by celestial orbits, PoA achieves sub-second deterministic finality while consuming negligible compute cycles. Zero-knowledge recursive SNARKs are continuously woven into block headers, guaranteeing state-privacy and uncompromised scalability.`
    },
    {
      id: 3,
      title: 'III. Dual-Token Tokenomics',
      subtitle: '天行健，君子以自强不息 • Constant Utility & Value Store',
      content: `Tianyan operates on a balanced dual-token architecture to prevent volatility from disrupting network execution:

1. $TYN (Tianyan Gas & Utility Token): The lifeblood of the network. $TYN is utilized to pay for smart contract computation, storage registry updates, and validator rewards. Its circulation is governed by a dynamic algorithm that adjusts burns based on current transaction density, maintaining systemic equilibrium.

2. $TIAN (Sovereign Governance Certificates): Distributed to long-term node delegates and state-anchors, representing voting power within the DAO structure. These certificates are non-transferable assets tied to node performance metrics, ensuring that governance is steered exclusively by active stakeholders with a proven vested interest in the ecosystem's longevity.`
    }
  ];

  const currentCh = chapters.find(c => c.id === activeChapter) || chapters[0];

  return (
    <div id="whitepaper-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
      <div
        id="whitepaper-modal-container"
        className="relative w-full max-w-3xl h-[85vh] flex flex-col bg-[#0A0A0A] border border-[#262626] rounded shadow-2xl overflow-hidden"
      >
        <div className="scanline" />

        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#262626] shrink-0 bg-black/20 relative z-10">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-4 h-4 text-[#C2A87E]" />
            <div>
              <h2 className="font-serif text-lg text-[#C2A87E] tracking-[0.2em] uppercase">TIANYAN WHITEPAPER</h2>
              <p className="text-xs text-[#A3A3A3] mt-0.5">Theoretical and technical foundations of Proof-of-Accord</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-[#C2A87E] transition-colors rounded hover:bg-[#1A1A1A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 font-sans">
          {/* Chapter Selector */}
          <div className="flex justify-center border-b border-[#262626] pb-6 mb-6 gap-2">
            {chapters.map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider border transition-all ${
                  activeChapter === ch.id
                    ? 'bg-[#C2A87E]/10 border-[#C2A87E]/40 text-[#C2A87E]'
                    : 'bg-transparent border-[#262626] text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                Chapter {ch.id}
              </button>
            ))}
          </div>

          {/* Core Text Box styled like a traditional manuscript */}
          <div className="relative border border-[#262626] bg-[#111111]/30 p-6 md:p-8 rounded overflow-hidden">
            {/* Background seal watermarks */}
            <div className="absolute right-4 bottom-4 w-32 h-32 opacity-[0.015] border-4 border-red-500 rounded rotate-12 pointer-events-none" />

            <div className="flex items-center space-x-2 text-[#C2A87E]/60 font-mono text-[9px] uppercase tracking-widest mb-1.5">
              <Hash className="w-3 h-3" />
              <span>Chapter {currentCh.id} Specification</span>
            </div>

            <h3 className="font-serif text-xl text-gray-100 tracking-wide">
              {currentCh.title}
            </h3>
            <h4 className="font-serif text-xs text-[#C2A87E]/80 mt-1 mb-6 italic">
              {currentCh.subtitle}
            </h4>

            {/* Paragraph Text with generous spacing */}
            <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line font-sans antialiased">
              {currentCh.content}
            </p>
          </div>
        </div>

        {/* Footer Navigation bar */}
        <div className="p-4 border-t border-[#262626] shrink-0 bg-black/20 flex items-center justify-between relative z-10">
          <button
            onClick={() => setActiveChapter(prev => Math.max(1, prev - 1))}
            disabled={activeChapter === 1}
            className="flex items-center text-xs font-mono text-gray-400 hover:text-[#C2A87E] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Prev Chapter
          </button>

          <span className="text-[10px] font-mono text-gray-500">
            PAGE {activeChapter} OF {chapters.length}
          </span>

          <button
            onClick={() => setActiveChapter(prev => Math.min(chapters.length, prev + 1))}
            disabled={activeChapter === chapters.length}
            className="flex items-center text-xs font-mono text-gray-400 hover:text-[#C2A87E] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
          >
            Next Chapter
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
