import githubService from "@/services/githubService";

export default async function githubWorker(
  user: string,
  repository: string = null
) {
  try {
    const requestedObject = await githubService(user, repository);
    const {
      login,
      name,
      avatar_url,
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
      updated_at
    } = requestedObject.data;

    const response = `
Usuario de GitHub 😸:
Usuario: ${login}
Nombre: ${name}
Foto: ${avatar_url}
Compañia: ${company}
Blog: ${blog}
Locacion: ${location}
Email: ${email}
Biografia: ${bio}
Repositorios publicos: ${public_repos}
Gists publicos: ${public_gists}
Seguidores: ${followers}
Siguiendo: ${following}
Fecha de creacion: ${created_at}
Fcha de actualizacion: ${updated_at}
    `.replace("null", "Campo vacio");

    return response;
  } catch (workerError) {
    return "No he podido encontrar la ciudad especificada, intenta otro nombre o escribirlo correcto.";
  }
}
