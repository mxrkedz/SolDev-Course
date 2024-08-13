import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
// Constant public key
// const publicKey = new PublicKey("GAzRE5drJaY3GTTLxE5wF628hUUiCkiAAn3j4RWQXPCB");
 
// Read balance of an account
// Command: npx esrun check-balance.ts (some wallet address)
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
 
const publicKey = new PublicKey(suppliedPublicKey);

const balanceInLamports = await connection.getBalance(publicKey);
 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `The balance for the wallet at address ${publicKey} is ${balanceInSOL} $SOL!`,
);