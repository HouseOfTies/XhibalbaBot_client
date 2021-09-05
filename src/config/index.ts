import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

export default {
    botToken: process.env.BOT_TOKEN,
    openWeather: null,
    multimedia: {
       youtube: null,
       bingImages: null,
    }
}
