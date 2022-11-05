export interface Payload {
  CommandId: string;
  Data: unknown;
}

export interface ResponsePayload {
  ResponseId: string;
  Data: unknown;
}

export interface PlayerData {
  Username: string;
  Token: string;
  X: number;
  Y: number;
}

export interface GameUpdateData {
  Players: PlayerData[];
}

export type MoveDirection = 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown';

export interface Lobby {
  lobbyId: number;
  isFull: boolean;
}

export interface Tile {
  MapTileType: number;
  Position: { X: number; Y: number };
}
