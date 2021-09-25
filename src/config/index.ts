import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export default {
  botToken: process.env.BOT_TOKENno,
  openWeather: null,
  multimedia: {
    youtube: null,
    bingImages: null,
  },
}
