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
    document.cookie = `${key}=${value}`;
    return document.cookie;
  }

  clearToken() {
    document.cookie = "max-age=0";
  }
}

export default new Token();
