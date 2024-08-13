import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
 
// Connect to the Network
// Clusters: mainnet, devnet, testnet
const connection = new Connection(clusterApiUrl("devnet"));
// console.log(`✅ Connected!`);
 
// Read balance of an account
const address = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;
 
console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);

// console.log(`✅ Finished!`);