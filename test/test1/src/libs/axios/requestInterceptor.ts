import { InternalAxiosRequestConfig } from "axios";
import token from "../token/token";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, REQUEST_TOKEN_KEY } from "../../constants/token.constants";

const requestInterceptor = (config: InternalAxiosRequestConfig, url: string): InternalAxiosRequestConfig => {
  if (typeof window !== "undefined") {
    const accessToken = token.getToken(ACCESS_TOKEN_KEY);
    const refreshToken = token.getToken(REFRESH_TOKEN_KEY);

    if (!accessToken || !refreshToken) {
      console.error("Access token or refresh token not found.");
      window.location.href = url;
    } else {
      config.headers[REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`;
    }
  }
  return config;
};

export default requestInterceptor;
