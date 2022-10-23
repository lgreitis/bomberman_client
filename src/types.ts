export interface Payload {
  CommandId: string;
  Data: any;
}

export interface ResponsePayload {
  ResponseId: string;
  Data: any;
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

export type MoveDirection =
  | "ArrowRight"
  | "ArrowLeft"
  | "ArrowUp"
  | "ArrowDown";

export interface Lobby {
  lobbyId: number;
  isFull: boolean;
}

export interface Tile {
  MapTileType: number;
  Position: { X: number; Y: number };
}
