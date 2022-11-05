import axios from 'axios';
import { API_URL } from '../../constants';
import { Lobby } from '../../types';

interface GetLobbyResult {
  lobbies: Lobby[];
}

const getLobbies = () => {
  return axios.get<GetLobbyResult>(`${API_URL}/Lobby`);
};

interface CreateLobbyResult {
  lobbyId: number;
}

const createLobby = () => {
  return axios.post<CreateLobbyResult>(`${API_URL}/Lobby`);
};

export const lobbyService = { getLobbies, createLobby };
