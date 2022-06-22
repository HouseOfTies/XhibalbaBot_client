import axios from "axios";

export default function githubService(user: string, repository: string = null) {
  const userQuery: string = `https://api.github.com/users/${user}`;
  const payload = axios.get(userQuery);
  return payload;
}
