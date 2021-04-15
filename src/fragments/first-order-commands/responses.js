export default {
    start : "Empieza usando uno de mis comandos, la manera correcta de escribirlos es con /comando [argumento]\nEjemplo: /clima santo domingo",
    heya : "Pendiente a todas las ordenes & lista para recibir un comando.",
    help : "Saludos, viajero. Soy *Xhibalba*, poseedora de las ruinas del inframundo. Por lo que veo, no sabes bien como funcionan estas cosas asi que dejame explicarte brevemente.\nPresiona el caracter / para acceder a mi menu de comandos.\nMuchos de mis comandos para poder ser ejecutados requieren de un argumento [arg] el cual puede ser numerico o de letras segun el comando que ejecutes, *ejemplo:*\n/weather santiago o /dice 2\n\nSi necesitas ayuda o has encontrado algun bug 🐞o usuario que manche mi pureza, puedes escribirle a mi creador [ZeroSeven](https://t.me/ZeroSeventty) Haciendo click sobre su nombre.\n\nComo tambien puedes mandar un reporte al buzon haciendo uso del comando /report tu reporte.",
    say : function(value){return value[1]},
    options : function(message){return {
		parse_mode: 'Markdown',
		reply_to_message_id: message.message_id,
    }},
    dictionaryCard : function(word, definition, example){return `📖 He encontrado en el diccionario:\n\n*Word:* ${word}\n*Definition:* ${definition}\n*Example:* ${example}`},

    GHTemplate : function(info){const { name, login, node_id, avatar_url, type, html_url, bio, public_repos, followers, following, location, company, created_at, updated_at} = info.data;
      return `_GitHub Profile_ 😺\n
*Name:* ${name}

------ Primary info
*User:* ${login}
*User ID:* ${node_id}
*Pic:* ${avatar_url}.jpg
*Type:* ${type}
*Url:* ${html_url}
*Bio:* ${bio}
*Public repos:* ${public_repos}

------ Secondary info
*Followers:* ${followers}
*Following:* ${following}
*location:* ${location}
*company:* ${company}

------ Others
*Created at:* ${created_at}
*Last update:* ${updated_at}
      `},

    ipTemplate : function(info) {

      const { type, 
          area: { code, geonameid, name},
          asn: { number, organisation },
          location:{  latitude, longitude },
          city: { cityName = name, population},
          country: { capital, phone_code },
          currency: { currencyCode = code, currencyName = name},
          continent: { continentName = name },
          security: { is_crawler, is_proxy, is_thread, is_tor }
      } = info.data;

      return `
🕵🏻‍♀️ He encontrado algo.\n
------ Info ------
--- Area ---
*Codigo*: ${code}
*Geonombre id*: ${geonameid}
*Nombre*: ${name}

--- ASN ---
*Numero*: ${number}
*Organizacion*: ${organisation}

--- Region --
*Latitud/Longitud*: ${latitude} / ${longitude}
*Ciudad*: ${cityName}
*Poblacion*: ${population}
*Capital*: ${capital}
*Codigo telefonico* ${phone_code}
*Moneda*: ${currencyCode} | ${currencyName}
*Contienente*: ${continentName}

--- Seguridad ---
*Es crawler*: ${is_crawler}
*Es proxy*: ${is_proxy}
*Es thread*:${is_thread}
*Es tor*: ${is_tor}

--- Tipo ---
${type}`}
      

}





