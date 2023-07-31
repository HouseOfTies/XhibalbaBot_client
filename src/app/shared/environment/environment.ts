import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  MONGODB_URI: process.env.MONGODB_URI
}
