import { useState, useEffect } from 'react';
import {
  Globe,
  Compass,
  FileText,
  MousePointer,
  Cpu,
  Layers,
  Database,
  Vote,
  ExternalLink,
  Wallet,
  Coins,
  TrendingUp,
  Activity
} from 'lucide-react';

// Core imports
import backgroundImage from './assets/images/tianyan_background_1783502172399.jpg';
import scrollPainting from './assets/images/tianyan_scroll_painting_1783502188929.jpg';
import InteractiveChart from './components/InteractiveChart';
import WalletModal from './components/WalletModal';
import ExploreModal from './components/ExploreModal';
import WhitepaperModal from './components/WhitepaperModal';
import { WalletState, ModalType } from './types';

export default function App() {
  // Locale state
  const [isChinese, setIsChinese] = useState<boolean>(false);

  // Modal control states
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [exploreInitialTab, setExploreInitialTab] = useState<string>('decentralized');

  // Wallet state
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: null,
    loading: false,
  });

  // TYN Live Price Simulation
  const [livePrice, setLivePrice] = useState<number>(1.88);
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(6.72);

  // Periodically fluctuate price to simulate a real blockchain ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice(prev => {
        const delta = (Math.random() - 0.45) * 0.02; // Slight upward bias
        const nextPrice = Math.max(1.5, parseFloat((prev + delta).toFixed(2)));
        // Adjust price percentage change correspondingly
        setPriceChangePercent(p => parseFloat((p + (delta * 5)).toFixed(2)));
        return nextPrice;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleWalletConnectSuccess = (connectedWallet: WalletState) => {
    setWallet(connectedWallet);
  };

  const handleDisconnectWallet = () => {
    setWallet({
      connected: false,
      address: null,
      balance: null,
      loading: false,
    });
  };

  const openExploreTab = (tabId: string) => {
    setExploreInitialTab(tabId);
    setActiveModal('explore');
  };

  // Helper translations object
  const t = {
    heritage: isChinese ? '▶ 传承 · 科技 · 未来' : '▶ HERITAGE. TECHNOLOGY. FUTURE.',
    subtitle: isChinese ? '连接过去 · 构建未来 · 共创价值' : 'Connecting the Past · Structuring the Future · Creating Value Together',
    description: isChinese
      ? '天衍是一个根植于东方哲学、由区块链技术驱动的 Web3.0 生态系统。我们致力于融合传统文化遗产与现代分布式账本科技，为所有人构建一个公平、透明且自我演进的数字化未来。'
      : 'Tianyan is a Web3.0 ecosystem rooted in Eastern philosophy and powered by blockchain technology. We build a decentralized future for all, uniting cultural heritage with trustless sovereign ledgers.',
    btnExplore: isChinese ? '探索生态系统 →' : 'EXPLORE ECOSYSTEM →',
    btnWhitepaper: isChinese ? '阅读白皮书' : 'WHITEPAPER',
    scrollText: isChinese ? '从古老的智慧到无限的可能' : 'From ancient wisdom to infinite possibilities.',
    
    // Sidebars
    decentralized: isChinese ? '去中心化' : 'DECENTRALIZED',
    consensus: isChinese ? '开放共识' : 'OPEN CONSENSUS',
    interconnect: isChinese ? '价值互联' : 'VALUE INTERCONNECT',
    scroll: isChinese ? '向下滑动' : 'SCROLL',
    futureIsHere: isChinese ? '未来已来' : 'THE FUTURE IS HERE',

    // Features
    feat1Title: isChinese ? '去中心化' : 'DECENTRALIZED',
    feat1Desc: isChinese ? '由社区驱动，架构安全且透明。' : 'Community-driven and transparent by design.',
    
    feat2Title: isChinese ? '智能合约' : 'SMART CONTRACTS',
    feat2Desc: isChinese ? '安全、高效且不可篡改的链上逻辑。' : 'Secure, efficient and immutable agreements.',
    
    feat3Title: isChinese ? '数字资产' : 'DIGITAL ASSETS',
    feat3Desc: isChinese ? '创建、交易和管理代币化的物理遗产。' : 'Create, trade and manage tokenized assets.',
    
    feat4Title: isChinese ? '共识治理' : 'DAO GOVERNANCE',
    feat4Desc: isChinese ? '持有者治理投票，自主决定技术升级。' : 'Community votes shape the future of Tianyan.',

    // Token Card
    tokenTitle: isChinese ? '天衍代币' : 'TIANYAN TOKEN',
    statsVol: isChinese ? '24小时交易量' : '24H VOLUME',
    statsCap: isChinese ? '总市值' : 'MARKET CAP',
    viewChart: isChinese ? '查看交互图表 →' : 'VIEW CHART →',
  };

  return (
    <div
      id="tianyan-app-root"
      className="relative min-h-screen text-[#E5E5E5] font-sans bg-[#0A0A0A] overflow-x-hidden flex flex-col justify-between"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.98) 100%), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay scanning line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C2A87E]/[0.01] to-transparent pointer-events-none" />
      <div className="scanline" />

      {/* ==================== HEADER ==================== */}
      <header id="tianyan-header" className="relative z-30 w-full px-4 lg:px-12 py-4 bg-[#0A0A0A]/60 backdrop-blur-md border-b border-[#262626]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div id="tianyan-logo-group" className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveModal('none')}>
            <div className="relative flex items-center justify-center w-9 h-9">
              {/* Outer spinning ornamental hex border */}
              <div className="absolute inset-0 border border-[#C2A87E]/40 rounded-lg rotate-45 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-0 border border-[#C2A87E]/20 rounded-lg -rotate-12 animate-[spin_18s_linear_infinite_reverse]" />
              {/* Central symbol */}
              <span className="font-serif font-bold text-sm text-[#C2A87E] tracking-widest relative z-10">天</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#C2A87E] via-[#E5E5E5] to-[#8C7654]">
                {isChinese ? '天行' : 'TIANYAN'}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#C2A87E]/50 uppercase leading-none">
                {isChinese ? '天 衍 生 态' : 'ECOSYSTEM'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="tianyan-desktop-nav" className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveModal('none')}
              className="relative text-[10px] font-mono tracking-widest uppercase text-[#C2A87E] hover:text-white transition-colors py-1 group"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C2A87E]" />
            </button>
            <button
              onClick={() => openExploreTab('decentralized')}
              className="text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-[#C2A87E] transition-colors py-1"
            >
              EXPLORE
            </button>
            <button
              onClick={() => openExploreTab('smart-contracts')}
              className="text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-[#C2A87E] transition-colors py-1"
            >
              BUILD
            </button>
            <button
              onClick={() => openExploreTab('dao-governance')}
              className="text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-[#C2A87E] transition-colors py-1"
            >
              DAO
            </button>
            <button
              onClick={() => openExploreTab('digital-assets')}
              className="text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-[#C2A87E] transition-colors py-1"
            >
              MARKET
            </button>
            <button
              onClick={() => setActiveModal('whitepaper')}
              className="text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-[#C2A87E] transition-colors py-1"
            >
              DOCS
            </button>
          </nav>

          {/* Right Controls */}
          <div id="tianyan-header-controls" className="flex items-center space-x-4">
            
            {/* Language Switcher */}
            <button
              onClick={() => setIsChinese(!isChinese)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded border border-[#262626] bg-[#111111]/40 hover:border-[#C2A87E]/30 hover:bg-[#1A1A1A] transition-all text-xs font-medium text-gray-300 hover:text-[#C2A87E]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isChinese ? 'English' : '中文'}</span>
            </button>

            {/* Connect Wallet */}
            {wallet.connected ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-[10px] font-mono text-[#C2A87E]">{wallet.balance} TYN</span>
                  <span className="text-[9px] font-mono text-[#666666]">{wallet.address}</span>
                </div>
                <button
                  onClick={handleDisconnectWallet}
                  className="px-4 py-1.5 bg-[#C2A87E]/10 text-[#C2A87E] border border-[#C2A87E]/30 hover:bg-red-950/20 hover:text-red-400 hover:border-red-950/40 transition-all rounded text-xs font-mono"
                >
                  DISCONNECT
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveModal('wallet')}
                className="relative px-5 py-1.5 bg-transparent border border-[#C2A87E]/50 text-xs font-mono tracking-widest text-[#C2A87E] hover:text-black hover:bg-[#C2A87E] transition-all rounded shadow-lg shadow-[#C2A87E]/5 active:scale-95 group overflow-hidden"
              >
                <span className="relative z-10">CONNECT WALLET</span>
                <span className="absolute inset-0 bg-[#C2A87E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==================== MAIN HERO ==================== */}
      <main id="tianyan-hero" className="relative z-20 flex-1 flex flex-col justify-center px-4 lg:px-12 py-10 lg:py-16 max-w-7xl mx-auto w-full">
        
        {/* Left Side Ornamental Rail (Desktop Only) */}
        <div id="tianyan-left-rail" className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center space-y-12 py-8 px-2 border-r border-[#262626]/40 pointer-events-none">
          <div className="relative w-4 h-4 rounded-full border border-[#C2A87E] flex items-center justify-center animate-pulse">
            <div className="w-1.5 h-1.5 bg-[#C2A87E] rounded-full" />
          </div>
          <div className="flex flex-col space-y-10 text-[9px] font-mono tracking-widest text-[#666666] uppercase rotate-180 [writing-mode:vertical-lr]">
            <span className="hover:text-[#C2A87E] transition-colors">{t.decentralized}</span>
            <span className="hover:text-[#C2A87E] transition-colors">{t.consensus}</span>
            <span className="hover:text-[#C2A87E] transition-colors">{t.interconnect}</span>
          </div>
        </div>

        {/* Right Side Ornamental Rail (Desktop Only) */}
        <div id="tianyan-right-rail" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center space-y-12 py-8 px-2 border-l border-[#262626]/40 pointer-events-none">
          <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-4 h-4 border border-[#262626] flex items-center justify-center rotate-45 hover:border-[#C2A87E]/40 hover:text-[#C2A87E] transition-colors">
                <div className="w-1 h-1 bg-gray-800" />
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-4 text-[9px] font-mono tracking-widest text-[#666666] uppercase [writing-mode:vertical-lr]">
            <span>{t.futureIsHere}</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:pl-12 lg:pr-12 grid grid-cols-1 gap-12">
          
          {/* Top Hero Text */}
          <section id="hero-headlines" className="max-w-2xl space-y-6">
            <span className="text-xs font-mono text-[#C2A87E]/80 tracking-[0.25em] uppercase flex items-center">
              <span className="w-1.5 h-1.5 bg-[#C2A87E] rounded-full mr-2 animate-ping" />
              {t.heritage}
            </span>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#E5E5E5] to-[#C2A87E] drop-shadow-xl select-none leading-none">
              TIANYAN
            </h1>

            <h2 className="font-serif text-lg md:text-xl text-gray-300 tracking-widest font-medium">
              {t.subtitle}
            </h2>

            <p className="text-xs text-[#A3A3A3] font-sans leading-relaxed tracking-wide">
              {t.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveModal('explore')}
                className="px-6 py-3 bg-[#C2A87E] text-black font-semibold text-xs font-mono tracking-widest uppercase hover:bg-[#E5E5E5] transition-all rounded shadow-lg shadow-[#C2A87E]/10 hover:shadow-[#C2A87E]/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                {t.btnExplore}
              </button>
              <button
                onClick={() => setActiveModal('whitepaper')}
                className="px-6 py-3 border border-[#262626] bg-[#111111]/30 hover:border-[#C2A87E]/40 hover:bg-[#1A1A1A] text-xs font-mono tracking-widest text-gray-300 hover:text-[#C2A87E] transition-all rounded flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>{t.btnWhitepaper}</span>
              </button>
            </div>
          </section>

          {/* Bottom Grid Containers */}
          <section id="dashboard-containers" className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-10">
            
            {/* 1. Four Feature Cards (Columns 1-5) */}
            <div id="feature-matrix" className="lg:col-span-5 border border-[#262626]/60 bg-[#0A0A0A]/80 backdrop-blur-md rounded p-6 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#C2A87E]/25 transition-all">
              <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-60 transition-opacity">
                <Compass className="w-4 h-4 text-[#C2A87E]" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                {/* Feature 1 */}
                <div
                  onClick={() => openExploreTab('decentralized')}
                  className="flex flex-col justify-between p-4 border border-[#262626] bg-[#111111]/20 hover:border-[#C2A87E]/30 hover:bg-[#111111]/60 transition-all rounded cursor-pointer group/card"
                >
                  <div>
                    <div className="w-8 h-8 rounded border border-[#262626] group-hover/card:border-[#C2A87E]/30 flex items-center justify-center mb-3">
                      <Cpu className="w-4 h-4 text-gray-400 group-hover/card:text-[#C2A87E] transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono text-[#666666] group-hover/card:text-[#C2A87E]/80 transition-colors uppercase tracking-widest">
                      {isChinese ? '去中心化' : 'DECENTRALIZED'}
                    </span>
                    <h4 className="text-xs font-medium text-gray-300 mt-0.5">{t.feat1Title}</h4>
                  </div>
                  <p className="text-[11px] text-[#A3A3A3] mt-2 leading-relaxed">{t.feat1Desc}</p>
                </div>

                {/* Feature 2 */}
                <div
                  onClick={() => openExploreTab('smart-contracts')}
                  className="flex flex-col justify-between p-4 border border-[#262626] bg-[#111111]/20 hover:border-[#C2A87E]/30 hover:bg-[#111111]/60 transition-all rounded cursor-pointer group/card"
                >
                  <div>
                    <div className="w-8 h-8 rounded border border-[#262626] group-hover/card:border-[#C2A87E]/30 flex items-center justify-center mb-3">
                      <Layers className="w-4 h-4 text-gray-400 group-hover/card:text-[#C2A87E] transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono text-[#666666] group-hover/card:text-[#C2A87E]/80 transition-colors uppercase tracking-widest">
                      {isChinese ? '智能合约' : 'SMART CONTRACTS'}
                    </span>
                    <h4 className="text-xs font-medium text-gray-300 mt-0.5">{t.feat2Title}</h4>
                  </div>
                  <p className="text-[11px] text-[#A3A3A3] mt-2 leading-relaxed">{t.feat2Desc}</p>
                </div>

                {/* Feature 3 */}
                <div
                  onClick={() => openExploreTab('digital-assets')}
                  className="flex flex-col justify-between p-4 border border-[#262626] bg-[#111111]/20 hover:border-[#C2A87E]/30 hover:bg-[#111111]/60 transition-all rounded cursor-pointer group/card"
                >
                  <div>
                    <div className="w-8 h-8 rounded border border-[#262626] group-hover/card:border-[#C2A87E]/30 flex items-center justify-center mb-3">
                      <Database className="w-4 h-4 text-gray-400 group-hover/card:text-[#C2A87E] transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono text-[#666666] group-hover/card:text-[#C2A87E]/80 transition-colors uppercase tracking-widest">
                      {isChinese ? '数字资产' : 'DIGITAL ASSETS'}
                    </span>
                    <h4 className="text-xs font-medium text-gray-300 mt-0.5">{t.feat3Title}</h4>
                  </div>
                  <p className="text-[11px] text-[#A3A3A3] mt-2 leading-relaxed">{t.feat3Desc}</p>
                </div>

                {/* Feature 4 */}
                <div
                  onClick={() => openExploreTab('dao-governance')}
                  className="flex flex-col justify-between p-4 border border-[#262626] bg-[#111111]/20 hover:border-[#C2A87E]/30 hover:bg-[#111111]/60 transition-all rounded cursor-pointer group/card"
                >
                  <div>
                    <div className="w-8 h-8 rounded border border-[#262626] group-hover/card:border-[#C2A87E]/30 flex items-center justify-center mb-3">
                      <Vote className="w-4 h-4 text-gray-400 group-hover/card:text-[#C2A87E] transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono text-[#666666] group-hover/card:text-[#C2A87E]/80 transition-colors uppercase tracking-widest">
                      {isChinese ? '共识治理' : 'DAO GOVERNANCE'}
                    </span>
                    <h4 className="text-xs font-medium text-gray-300 mt-0.5">{t.feat4Title}</h4>
                  </div>
                  <p className="text-[11px] text-[#A3A3A3] mt-2 leading-relaxed">{t.feat4Desc}</p>
                </div>
              </div>
            </div>

            {/* 2. Scroll Landscape Banner (Columns 6-8) */}
            <div
              id="cultural-scroll"
              className="lg:col-span-3 border border-[#262626]/60 bg-[#0A0A0A]/50 backdrop-blur-md rounded overflow-hidden relative flex flex-col justify-between h-[300px] lg:h-auto group cursor-pointer hover:border-[#C2A87E]/25 transition-all"
              onClick={() => setActiveModal('whitepaper')}
            >
              {/* Background painting */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:scale-102 transition-transform duration-700"
                style={{ backgroundImage: `url(${scrollPainting})` }}
              />
              {/* Golden gradient wash overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* Red traditional stamp overlay (top-left) */}
              <div className="absolute top-4 left-4 border border-red-800/80 p-0.5 select-none rotate-6">
                <div className="border border-dashed border-red-800/60 px-1 py-0.5 text-[8px] font-serif text-red-700 tracking-widest [writing-mode:vertical-lr]">
                  {isChinese ? '天行常在' : 'TIANYAN'}
                </div>
              </div>

              {/* Text content bottom aligned */}
              <div className="relative z-10 mt-auto p-5 text-center">
                <p className="text-xs font-serif italic text-[#E5E5E5]/80 tracking-wider">
                  {t.scrollText}
                </p>
                <p className="text-[9px] font-mono tracking-widest uppercase text-[#C2A87E]/80 mt-2 flex items-center justify-center space-x-1">
                  <span>DISCOVER THE GENESIS</span>
                  <span>→</span>
                </p>
              </div>
            </div>

            {/* 3. Tianyan Token Card (Columns 9-12) */}
            <div id="token-card" className="lg:col-span-4 border border-[#262626]/60 bg-[#0A0A0A]/70 backdrop-blur-md rounded p-5 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#C2A87E]/30 transition-all">
              
              {/* Floating animated astrolabe background */}
              <div className="absolute right-3 top-3 w-28 h-28 opacity-5 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 border border-[#C2A87E] rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-2 border border-dashed border-[#C2A87E] rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                <span className="font-serif text-lg text-[#C2A87E]">衍</span>
              </div>

              {/* Title & Static Seal */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#C2A87E]/70 uppercase leading-none">
                    $TYN METRICS
                  </span>
                  <h3 className="font-serif text-base text-white font-semibold mt-0.5 tracking-wider">
                    {t.tokenTitle}
                  </h3>
                </div>

                {/* Rotating "天衍" emblem */}
                <div className="relative w-12 h-12 flex items-center justify-center scale-90 sm:scale-100 select-none">
                  {/* Concentric planetary lines */}
                  <div className="absolute inset-0 border border-[#C2A87E]/40 rounded-full animate-[spin_25s_linear_infinite]" />
                  <div className="absolute inset-1.5 border border-dashed border-[#C2A87E]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  {/* Central seal vertically aligned text */}
                  <div className="absolute inset-2.5 bg-[#C2A87E]/5 border border-[#C2A87E]/20 rounded-full flex flex-col items-center justify-center leading-none text-[#C2A87E] font-serif text-[10px] font-bold">
                    <span>天</span>
                    <span>衍</span>
                  </div>
                </div>
              </div>

              {/* Live Price Row */}
              <div className="my-4">
                <div className="flex items-baseline space-x-2">
                  <span className="font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E5E5] to-[#C2A87E]">
                    ${(displayPrice || livePrice).toFixed(2)}
                  </span>
                  <span className={`text-xs font-mono font-medium flex items-center ${priceChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
                    {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Interactive Sparkline Chart */}
              <div className="w-full h-[80px] my-1 bg-black/40 border border-[#262626] rounded p-1">
                <InteractiveChart
                  onHoverPrice={(hoveredPrice) => setDisplayPrice(hoveredPrice)}
                  currentPrice={livePrice}
                />
              </div>

              {/* Vol & Cap Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#262626] pt-4 mt-2">
                <div>
                  <span className="text-[9px] font-mono text-[#666666] uppercase block">
                    {t.statsVol}
                  </span>
                  <span className="text-xs font-mono font-semibold text-gray-300">
                    12.45M TYN
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[#666666] uppercase block">
                    {t.statsCap}
                  </span>
                  <span className="text-xs font-mono font-semibold text-gray-300">
                    $188.45M
                  </span>
                </div>
              </div>

              {/* View interactive chart button */}
              <button
                onClick={() => openExploreTab('dao-governance')}
                className="mt-4 w-full py-2 border border-[#262626] bg-[#111111]/20 hover:border-[#C2A87E]/40 hover:text-[#C2A87E] hover:bg-[#1A1A1A] transition-all rounded text-[9px] font-mono uppercase tracking-widest"
              >
                {t.viewChart}
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* ==================== FOOTER / SCROLL INDICATOR ==================== */}
      <footer id="tianyan-footer" className="relative z-30 w-full px-4 lg:px-12 py-6 border-t border-[#262626]/20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-[#666666] tracking-wider">
          
          {/* Scroll wheel indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-8 border-2 border-gray-800 rounded-full flex items-start justify-center p-1">
              <div className="w-1.5 h-1.5 bg-[#C2A87E] rounded-full animate-bounce" />
            </div>
            <span className="uppercase">{t.scroll}</span>
          </div>

          <span>© 2026 TIANYAN PROTOCOL • ALL VALUES SECURED ON-CHAIN</span>

          <div className="flex items-center space-x-4">
            <span className="text-[#C2A87E]/60 uppercase">NETWORK: TIANYAN-MAINNET</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </footer>

      {/* ==================== MODALS ==================== */}
      <WalletModal
        isOpen={activeModal === 'wallet'}
        onClose={() => setActiveModal('none')}
        onConnectSuccess={handleWalletConnectSuccess}
      />

      <ExploreModal
        isOpen={activeModal === 'explore'}
        onClose={() => setActiveModal('none')}
        wallet={wallet}
        initialTab={exploreInitialTab}
      />

      <WhitepaperModal
        isOpen={activeModal === 'whitepaper'}
        onClose={() => setActiveModal('none')}
      />
    </div>
  );
}
