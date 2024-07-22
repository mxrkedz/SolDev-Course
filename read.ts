import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

//mainnet, devnet, testnet
const url = clusterApiUrl('devnet');

console.log('url', url);

const connection = new Connection(clusterApiUrl('devnet'));

// dv3qDFk1DTF36Z62bNvrCXe9sKATA6xvVy6A798xxAS
const wallet = new PublicKey('dv3qDFk1DTF36Z62bNvrCXe9sKATA6xvVy6A798xxAS');
connection.getBalance(wallet)

async function main() {
    const balance = await connection.getBalance(wallet)
    console.log('balance', balance / LAMPORTS_PER_SOL);
    
}

main()