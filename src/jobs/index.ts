import weatherService from "@/services";
const flags = require("./flags.json");
const weatherExtra = require("./weatherExtra.json");

export default async function weatherWorker(requestCountry: string) {
  try {
    const requestedObject = await weatherService(requestCountry);
    const data = requestedObject.data;
    const {
      main: { temp, feels_like, temp_min, temp_max, humidity },
      visibility,
      wind: { speed },
      clouds: { all },
      sys: { country, sunrise, sunset },
      name,
    } = data;

    const { main, description } = data.weather[0];

    const weatherIcon = weatherExtra[main].icon;
    const recommendation = weatherExtra[main].recommendation;

    const countryFlag = flags[country].emoji;

    const sunriseFormatted = new Date(sunrise * 1000).toLocaleTimeString(
      "do-ES"
    );
    const sunsetFormatted = new Date(sunset * 1000).toLocaleTimeString("do-ES");

    const response: string = `
    *${name}* ${countryFlag}
*Clima*: ${description} ${weatherIcon}

🌡 *Temperatura actual*: ${temp}º
♨️ *Sensación térmica*: ${feels_like}º
🔆º *Temperatura Max/Min*: ${temp_max}º⬆️ | ${temp_min}º⬇️
💧 *Humedad*: ${humidity}%
🌬️💨 *Viento*: ${speed} 🪁Km/h
☁️ *Nubes*: ${all}%
👁️ *Visibilidad*: ${visibility / 100}%

🌞 *Amanecer*: ${sunriseFormatted}
🌚 *Anochecer*: ${sunsetFormatted}

*Recomendación*: ${recommendation}
`;

    return response;
  } catch (workerError) {
    console.log(workerError)
    return "No he podido encontrar la ciudad especificada, intenta otro nombre o escribirlo correcto.";
  }
}
