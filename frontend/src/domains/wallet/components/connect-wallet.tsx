import { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Typography } from '@mui/material';

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } else {
        alert('MetaMask not detected');
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" fullWidth onClick={connectWallet}>
        Connect Wallet
      </Button>
      {account && (
        <Typography variant="body2" mt={2} color="success.main">
          Connected: {account}
        </Typography>
      )}
    </div>
  );
}
