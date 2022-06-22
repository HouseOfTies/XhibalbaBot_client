import axios from "axios";

export default function githubService(user: string) {
  const userQuery: string = `https://api.github.com/users/${user}`;
  const payload = axios.get(userQuery);
  return payload;
}
