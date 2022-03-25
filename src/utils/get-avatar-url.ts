import { google } from "googleapis";
import axios from "axios";

export async function getAvatarUrl(accessToken: string, loginWebsite: string) {
  if (loginWebsite === "google") {
    const googleDataUrl = `${process.env.GOOGLE_GET_DATA_URL}${accessToken}`;

    const { data } = await axios.get(googleDataUrl);

    return data.picture;
  }
}
