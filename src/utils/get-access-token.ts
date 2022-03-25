import axios from "axios";

export async function getAccessToken(refreshToken: string, loginWebsite: string) {
  if (loginWebsite === "google") {
    const { data } = await axios.post(`${process.env.GOOGLE_GET_ACCESS_TOKEN_URL}`,{
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });

    return data.access_token;
  }
}