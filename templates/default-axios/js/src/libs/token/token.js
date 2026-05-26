class Token {
  getToken(key) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split("=");
      if (cookieKey === key) {
        return decodeURIComponent(cookieValue);
      }
    }
    return undefined;
  }

  setToken(key, value) {
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/`;
    return document.cookie;
  }

  clearToken() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieKey] = cookie.split("=");
      if (cookieKey) {
        document.cookie = `${cookieKey}=; path=/; max-age=0`;
      }
    }
  }
}

export default new Token();
