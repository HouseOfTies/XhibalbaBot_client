import githubService from "@/services/githubService";

export default async function githubWorker(
  user: string,
  repository: any = null
) {
  try {
    const requestedObject = await githubService(user);
    const {
      login,
      name,
      avatar_url,
      company,
      blog,
      location,
      email,
      bio,
      twitter_username,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at
    } = requestedObject.data;
    return requestedObject;
  } catch (workerError) {
    return "No he podido encontrar la ciudad especificada, intenta otro nombre o escribirlo correcto.";
  }
}
