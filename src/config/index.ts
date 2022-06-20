import dotenv from 'dotenv';

if(process.env.NODE_ENV !== "production"){
  const envFound = dotenv.config();
  if (envFound.error) {
  }
}

export default {
  port: parseInt(process.env.PORT, 10),
  bot: process.env.BOT_TOKEN,
  multimedia: {
    openWeather: process.env.OPENWEATHER,
    youtube: process.env.YOUTUBE,
    rapidapi: null,
  },
  ownerShip: {
    owner: process.env.OWNERID,
    home: process.env.HOMEID,
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  databaseURL: process.env.MONGODB_URI,
};
