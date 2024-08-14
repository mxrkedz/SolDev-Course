import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const suppliedToPubkey = process.argv[2] || null;
if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeyPair();
console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);

// Request for airdrop if the balance is less than 1 SOL
await airdropIfRequired(
  connection,
  senderKeypair.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL
);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000; // 0.000005 $SOL

// Create the instruction
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

// Add the instruction to the transaction
transaction.add(sendSolInstruction);

// Send and confirm the transaction
const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}.`
);
console.log(`Transaction signature is ${signature}!`);

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
async function airdropIfRequired(
  connection: Connection,
  publicKey: PublicKey,
  minimumBalance: number,
  airdropAmount: number
) {
  const balance = await connection.getBalance(publicKey);
  if (balance < minimumBalance) {
    console.log(`Current balance (${balance}) is less than the required minimum balance (${minimumBalance}). Airdropping ${airdropAmount} lamports.`);
    const signature = await connection.requestAirdrop(publicKey, airdropAmount);
    await connection.confirmTransaction(signature);
    console.log(`Airdropped ${airdropAmount} lamports to ${publicKey.toBase58()}.`);
  } else {
    console.log(`Current balance (${balance}) is sufficient.`);
  }
}