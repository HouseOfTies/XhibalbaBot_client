export default {
    start : "Empieza usando uno de mis comandos, la manera correcta de escribirlos es con /comando [argumento]\nEjemplo: /clima santo domingo",
    heya : "Pendiente a todas las ordenes & lista para recibir un comando.",
    help : "Saludos, viajero. Soy *Xhibalba*, poseedora de las ruinas del inframundo. Por lo que veo, no sabes bien como funcionan estas cosas asi que dejame explicarte brevemente.\nPresiona el caracter / para acceder a mi menu de comandos.\nMuchos de mis comandos para poder ser ejecutados requieren de un argumento [arg] el cual puede ser numerico o de letras segun el comando que ejecutes, *ejemplo:*\n/clima santiago o /dado 2\n\nSi necesitas ayuda o has encontrado algun bug 🐞o usuario que manche mi pureza, puedes escribirle a mi creador [ZeroSeven](https://t.me/ZeroSeventty) Haciendo click sobre su nombre.\n\nComo tambien puedes mandar un reporte al buzon haciendo uso del comando /report tu reporte.",
    say : function(value){return value[1]},
    options : function(message){return {
		parse_mode: 'Markdown',
		reply_to_message_id: message.message_id,
    }},


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

      dictionaryCard : function(word, definition, example){return `📖 He encontrado en el diccionario:\n\n*Word:* ${word}\n*Definition:* ${definition}\n*Example:* ${example}`}

      

}



/* ``
🕵🏻‍♀️ He encontrado algo.\n
------ Info ------
--- Area ---
*Codigo*: ${info.data.area.code}
*Geonombre id*: ${info.data.area.geonameid}
*Nombre*: ${info.data.area.name}

--- ASN ---
*Numero*: ${info.data.asn.number}
*Organizacion*: ${info.data.asn.organisation}

--- Region --
*Latitud/Longitud*: ${info.data.location.latitude} / ${info.data.location.longitude}
*Ciudad*: ${info.data.city.name}
*Poblacion*: ${info.data.city.population}
*Capital*: ${info.data.country.capital}
*Codigo telefonico* ${info.data.country.phone_code}
*Moneda*: ${info.data.currency.code} | ${info.data.currency.name}
*Contienente*: ${info.data.continent.name}

--- Seguridad ---
*Es crawler*: ${info.data.security.is_crawler}
*Es proxy*: ${info.data.security.is_proxy}
*Es thread*:${info.data.security.is_thread}
*Es tor*: ${info.data.security.is_tor}

--- Tipo ---
${info.data.type}` */

