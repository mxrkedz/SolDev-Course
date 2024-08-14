# Intro to Custom Onchain Programs
Solana has multiple onchain programs you can use. Instructions that use these programs have data in a custom format determined by the specific function being invoked in the onchain program.
## Create instructions with the 'TransactionInstruction' constructor

``` ts
const instruction = new TransactionInstruction({
  programId: PublicKey; // Public Key
  keys: [ // Array of accounts
    {
      pubkey: Pubkey, // Public Key of the Account
      isSigner: boolean, // Whether or not the account is a signer on the transaction
      isWritable: boolean, // whether or not the account is written during transaction
    },
  ],
  data?: Buffer; 
});
```
## Add the instruction to the transaction
``` ts
const transaction = new web3.Transaction().add(instruction);
 
const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer],
);
 
console.log(`✅ Success! Transaction signature is: ${signature}`);
```
## Ping Program
``` ts
// The public key of the Ping program. It tells your code where the Ping program is located on the blockchain.
const PING_PROGRAM_ADDRESS = new web3.PublicKey(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
// The public key of the account where the Ping program writes data. 
// The program needs to know where to send or receive data, and this address provides that information.
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);
```
