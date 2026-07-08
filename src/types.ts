export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string | null;
  loading: boolean;
}

export type ModalType = 'none' | 'explore' | 'whitepaper' | 'wallet' | 'chart';

export interface EcosystemFeature {
  id: string;
  titleZh: string;
  titleEn: string;
  description: string;
  details: string;
  iconName: string;
}

export interface Proposal {
  id: number;
  title: string;
  status: 'active' | 'passed' | 'defeated';
  votesFor: number;
  votesAgainst: number;
  endTime: string;
  voted?: 'for' | 'against';
}
