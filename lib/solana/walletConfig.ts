import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { SOLANA_CONFIG } from '../constants';

export function getWalletAdapters() {
  return [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new BackpackWalletAdapter(),
  ];
}

export function getSolanaNetwork(): WalletAdapterNetwork {
  return SOLANA_CONFIG.network === 'mainnet-beta'
    ? WalletAdapterNetwork.Mainnet
    : WalletAdapterNetwork.Devnet;
}

export function getRpcEndpoint(): string {
  return SOLANA_CONFIG.rpcUrl || clusterApiUrl(getSolanaNetwork());
}
