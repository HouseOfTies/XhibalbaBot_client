export default {
    start : "Empieza usando uno de mis comandos, la manera correcta de escribirlos es con /comando [argumento]\nEjemplo: /clima santo domingo",
    heya : "Pendiente a todas las ordenes & lista para recibir un comando.",
    help : "Saludos, viajero. Soy *Xhibalba*, poseedora de las ruinas del inframundo. Por lo que veo, no sabes bien como funcionan estas cosas asi que dejame explicarte brevemente.\nPresiona el caracter / para acceder a mi menu de comandos.\nMuchos de mis comandos para poder ser ejecutados requieren de un argumento [arg] el cual puede ser numerico o de letras segun el comando que ejecutes, *ejemplo:*\n/clima santiago o /dado 2\n\nSi necesitas ayuda o has encontrado algun bug 🐞o usuario que manche mi pureza, puedes escribirle a mi creador [ZeroSeven](https://t.me/ZeroSeventty) Haciendo click sobre su nombre.\n\nComo tambien puedes mandar un reporte al buzon haciendo uso del comando /report tu reporte.",
    say : function(value){return value[1]},
    options : function(message){return {
		parse_mode: 'Markdown',
		reply_to_message_id: message.message_id,
	  }}
}
