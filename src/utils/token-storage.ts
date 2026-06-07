const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenStorage = {
  getAccessToken: () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken: (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  clear: () => {
    localStorage.clear();
  },
};
