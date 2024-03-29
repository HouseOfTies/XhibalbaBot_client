import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  MONGODB_URI: process.env.MONGODB_URI,
  OWNER_ID: process.env.OWNER_ID,
  API_URL: process.env.API_URL,
}
