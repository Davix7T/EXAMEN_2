// Servicio centralizado para todas las peticiones HTTP
const API_URL = "http://localhost:8080/api";

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const login = async (username: string, password: string) => {
  return apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};
