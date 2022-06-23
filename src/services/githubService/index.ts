import axios from "axios";

export default function githubService(user: string, repository: string = null) {
  if (repository == null) {
    const userQuery: string = `https://api.github.com/users/${user}`;
    const payload = axios.get(userQuery);
    return payload;
  }else{
    const repositoryQuery: string = `https://api.github.com/repos/${user}/${repository}`;
    const payload = axios.get(repositoryQuery);
    return payload;
  }
}
