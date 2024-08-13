import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import dotenv from "dotenv";
dotenv.config();

const keyPair = await getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);
