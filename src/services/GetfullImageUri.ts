const API_BASE = "http://192.168.1.84:8456"; // твой сервер (без / в конце)

export const getFullImageUrl = (path: string) =>
  path.startsWith("http") ? path : `${API_BASE}${path}`;