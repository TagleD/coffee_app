// const API_BASE = "https://coffebeam.duckdns.org"; // твой сервер (без / в конце)
const API_BASE = "http://192.168.1.165:8456";

export const getFullImageUrl = (path: string) =>
  path.startsWith("http") ? path : `${API_BASE}${path}`;