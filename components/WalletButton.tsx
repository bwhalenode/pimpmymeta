'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { shortenAddress } from '@/lib/utils';

const WalletButton: FC = () => {
  const { publicKey } = useWallet();

  return (
    <div className="wallet-button-wrapper">
      <WalletMultiButton>
        {publicKey ? shortenAddress(publicKey.toString()) : 'Connect Wallet'}
      </WalletMultiButton>
    </div>
  );
};

export default WalletButton;
