import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ConnectWallet from '../components/connect-wallet';

export const WalletPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Card sx={{ width: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Connect Your Wallet
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Use your Web3 wallet (e.g., MetaMask) to connect and manage certificates.
          </Typography>
          <Box mt={2}>
            <ConnectWallet />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WalletPage;
