# Intro to Writing Data Notes
## Trsaction Instruction
``` ts
const transaction = new Transaction();
 
const sendSolInstruction = SystemProgram.transfer({ //SystemProgram.transfer helper function that transfer SOL
  fromPubkey: sender, //Sender's public key
  toPubkey: recipient, //Recipient's public key
  lamports: LAMPORTS_PER_SOL * amount, //Amount of SOL to transfer
});
 
transaction.add(sendSolInstruction); //Add the instruction to the transaction
```

## Sign and send the transaction
``` ts
const signature = sendAndConfirmTransaction(connection, transaction, [
  senderKeypair, //Sender's Keypair (Signer)
]);
```

## If keypair has not been funded, request airdrop
``` ts
await airdropIfRequired(
  connection,
  keypair.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL,
);
```