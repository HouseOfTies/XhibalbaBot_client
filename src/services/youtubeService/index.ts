import axios from "axios";
import config from "@/config";

export default function youtubeService(videoTitle: string) {
  const APIkey: string = config.multimedia.youtube;
  const part = "snippet";

  // const url: string = decodeURI(`https://www.googleapis.com/youtube/v3/search?part=${part}&maxResults=${}`);
  //https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=algo&type=video&key=AIzaSyCS-MYAmiUs1JGl4RDJJvBlcgUXib7d0z8

}
