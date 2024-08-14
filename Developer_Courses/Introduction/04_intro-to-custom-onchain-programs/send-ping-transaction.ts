import * as web3 from "@solana/web3.js";
import "dotenv/config";
import { airdropIfRequired } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";
 
const payer = getKeyPair();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    0.5 * web3.LAMPORTS_PER_SOL,
  );

const PING_PROGRAM_ADDRESS = new web3.PublicKey(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);
 
// Create the instruction
const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: pingProgramDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
  programId,
});

// Add the instruction to the transaction
transaction.add(instruction);
 
// Send and confirm the transaction
const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer],
);
 
console.log(`✅ Transaction completed! Signature is ${signature}`);
console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );

function getKeyPair(): Keypair {
    // Get the secret key from the environment variable
    const secretKey = process.env.SECRET_KEY;
  
    if (!secretKey) {
      throw new Error("Secret key not found in the environment variables");
    }
  
    // Convert the secret key string to an array
    const secretKeyArray = secretKey.split(",").map((num) => parseInt(num, 10));
  
    // Validate the length of the secret key
    if (secretKeyArray.length !== 64) {
      throw new Error(
        `Bad secret key size: expected 64, got ${secretKeyArray.length}`
      );
    }
  
    // Create the keypair from the secret key array
    return Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
  }