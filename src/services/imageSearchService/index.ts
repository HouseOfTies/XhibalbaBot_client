import axios from "axios";
import config from "@/config";

export default function imageSearchService(query: any) {
  const request: any = {
    method: "GET",
    url: "https://bing-image-search1.p.rapidapi.com/images/search",
    params: { q: query, count: "100" },
    headers: {
      "x-rapidapi-key": config.multimedia.rapidapi,
      "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
    },
  };

  const payload = axios.request(request);
  return payload;
}
