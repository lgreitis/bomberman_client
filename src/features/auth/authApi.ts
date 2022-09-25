import axios from "axios";
import { API_URL } from "../../constants";

interface RegisterResult {
  success: boolean;
}

const register = (username: string, password: string) => {
  return axios.post<RegisterResult>(`${API_URL}/User/register`, {
    username,
    password,
  });
};

interface LoginResult {
  success: boolean;
  token: string;
}

const login = (username: string, password: string) => {
  return axios.post<LoginResult>(`${API_URL}/User/login`, {
    username,
    password,
  });
};

export const authApi = { login, register };
