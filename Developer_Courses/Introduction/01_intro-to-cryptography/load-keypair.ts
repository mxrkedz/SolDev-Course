import { Keypair } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const keyPair = getKeyPair();
console.log(
    `✅ Finished! We've loaded our secret key securely, using an env file!`
);

function getKeyPair(): Keypair {
    // Get the secret key from the environment variable
    const secretKey = process.env.SECRET_KEY;
  
    if (!secretKey) {
      throw new Error("Secret key not found in the environment variables");
    }
  
    // Convert the secret key string to an array
    const secretKeyArray = secretKey.split(',').map((num) => parseInt(num, 10));
  
    // Validate the length of the secret key
    if (secretKeyArray.length !== 64) {
      throw new Error(`Bad secret key size: expected 64, got ${secretKeyArray.length}`);
    }
  
    // Create the keypair from the secret key array
    return Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
}