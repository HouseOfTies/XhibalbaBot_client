import githubService from "@/services/githubService";

export default async function githubWorker(
  user: string,
  repository: string = null
) {
  try {
    const buttons: any = {
      reply_markup: {
        inline_keyboard: [[{}]],
      },
      parse_mode: "Markdown",
    };

    const buttonsObjectPath: any = buttons.reply_markup.inline_keyboard[0][0];

    if (repository == null) {
      const requestedObject = await githubService(user);
      const {
        login,
        name,
        avatar_url,
        html_url,
        company,
        blog,
        location,
        email,
        bio,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at,
      } = requestedObject.data;

      const response = `
Perfil de GitHub 😸

*Usuario*: ${login} 
*Nombre*: ${name} 
*Foto*: ${avatar_url} 
*Compañia*: ${company} 
*Blog*: ${blog} 
*Locacion*: ${location} 
*Email*: ${email} 
*Biografia*: ${bio} 
*Repositorios publicos*: ${public_repos} 
*Gists publicos*: ${public_gists} 
*Seguidores*: ${followers} 
*Siguiendo*: ${following} 
*Fecha de creacion*: ${new Date(created_at).toLocaleDateString()} 
*Ultima actualizacion*: ${new Date(updated_at).toLocaleDateString()} 
    `.replace(/null/g,"campo vacio");
      (buttonsObjectPath.text = `Visitar la cuenta de ${login}`),
        (buttonsObjectPath.url = html_url);
      return { response, buttons };
    } else {
      const requestedObject = await githubService(user, repository);
      const {
        name,
        full_name,
        clone_url,
        owner: { login },
        html_url,
        description,
        fork,
        size,
        stargazers_count,
        watchers_count,
        subscribers_count,
        language,
        created_at,
        updated_at,
      } = requestedObject.data;
      const response = `
Repositorio de GitHub 📖

*Creador*: ${login}
*Nombre de repo*: ${name}
*Nombre completo*: ${full_name}
*Url para clonar*: ${clone_url}
*Descripcion*: ${description}
*Cantidad de observantes*: ${watchers_count}
*Estrellas*: ${stargazers_count} 🌟
*Tamaño*: ${size} Bytes
*Cantidad de subscriptores*: ${subscribers_count}
*Lenguaje*: ${language}
*Fork*: ${fork ? "es" : "no es"} un repositorio forkeado
*Fecha de creacion*: ${new Date(created_at).toLocaleDateString()} 
*Ultima actualizacion*: ${new Date(updated_at).toLocaleDateString()} 
`;
      (buttonsObjectPath.text = `Ir al repositorio ${name}`),
        (buttonsObjectPath.url = html_url);

      return { response, buttons };
    }
  } catch (workerError) {
    console.log(workerError);
    return "No he podido encontrar al usuario especificado, intenta otro nombre o escribirlo correcto.";
  }
}
