'use client';

import React, { useState } from 'react';
import { Keypair, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';

const connection = new Connection(clusterApiUrl('devnet'));
const newKeypair = Keypair.generate();

const Tools = () => {
  const [keypair, setKeypair] = useState(null);
  const [balance, setBalance] = useState(null);
  const [airdropMessage, setAirdropMessage] = useState('');
  const [txHash, setTxHash] = useState('');

  const createWallet = async () => {
    const publicKey = new PublicKey(newKeypair.publicKey);
    
    const walletInfo = {
      publicKey: newKeypair.publicKey.toString(),
      secretKey: newKeypair.secretKey.toString(),
      secretKeyBase58: bs58.encode(newKeypair.secretKey)
    };
    
    setKeypair(walletInfo);
    
    const walletBalance = await connection.getBalance(publicKey);
    setBalance(walletBalance / LAMPORTS_PER_SOL);
  };

  const updateBalance = async () => {
    if (keypair) {
      const publicKey = new PublicKey(keypair.publicKey);
      const walletBalance = await connection.getBalance(publicKey);
      setBalance(walletBalance / LAMPORTS_PER_SOL);
    }
  };
  
  const requestAirdrop = async () => {
    if (keypair) {
      const publicKey = new PublicKey(keypair.publicKey);
      try {
        const tx = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
        await updateBalance();
        setAirdropMessage('Airdrop Successful!');
        setTxHash(tx);
      } catch (error) {
        console.error('Airdrop failed:', error);
        const errorMessage = error || 'An unexpected error occurred.';
        setAirdropMessage(`⚠️ Airdrop Unsuccessful: ${errorMessage}`);
        setTxHash('');
      }
    }
  };


  return (
    <div>
      <button onClick={createWallet}>Create Wallet</button>
      {keypair && (
        <div>
          <h2><strong>New Wallet Generated!</strong></h2>
          <p><strong>Public Key:</strong> {keypair.publicKey}</p>
          <p><strong>Secret Key:</strong> {keypair.secretKey}</p>
          <p><strong>Secret Key (Base58):</strong> {keypair.secretKeyBase58}</p>
          <p><strong>Balance:</strong> {balance} $SOL</p>
          <button onClick={updateBalance}>Update Balance</button>
          <h2>Request Airdrop!</h2>
          <button onClick={requestAirdrop}>Request Airdrop</button>
          {airdropMessage && (
            <div>
              <p>{airdropMessage}</p>
              {txHash && (
                <p>
                  <strong>Transaction Hash:</strong>{' '}
                  <a href={`https://solscan.io/tx/${txHash}?cluster=devnet`} target="_blank" rel="noopener noreferrer">
                    {txHash}
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tools;
