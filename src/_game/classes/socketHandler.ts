import { GAME_WS_URL, LOBBY_WS_URL } from "../../constants";
import { MoveDirection, Payload, ResponsePayload } from "../../types";
import { Inputs } from "./input";

class SocketHandler {
  socket: WebSocket;
  token: string;
  lobbyId: number;

  constructor(token: string) {
    this.socket = new WebSocket(LOBBY_WS_URL);
    this.token = token;
    this.lobbyId = -1;
  }

  connectToGameWs = async () => {
    return new Promise((resolve) => {
      this.socket.close();
      this.socket = new WebSocket(GAME_WS_URL);

      this.socket.addEventListener("open", () => {
        resolve(undefined);
      });
    });
  };

  sendConnectCommand = () => {
    const payload: Payload = {
      CommandId: "CONNECT",
      Data: {
        Token: this.token,
        LobbyId: this.lobbyId,
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  sendJoinCommand = (lobbyId: number, token: string) => {
    const payload: Payload = {
      CommandId: "JOIN_LOBBY",
      Data: {
        lobbyId: lobbyId,
        Token: token,
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  sendMoveCommand = (inputs: Inputs) => {
    const payload: Payload = {
      CommandId: "MOVE",
      Data: {
        Token: this.token,
        PositiveX: inputs.ArrowRight,
        NegativeX: inputs.ArrowLeft,
        PositiveY: inputs.ArrowDown,
        NegativeY: inputs.ArrowUp,
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  onStart = (cb: (lobbyId: number) => void) => {
    this.socket.addEventListener("message", (event) => {
      const data: ResponsePayload = JSON.parse(event.data);
      if (data.ResponseId === "StartGame") {
        cb(data.Data.LobbyId);
      }
    });
  };
}

export default SocketHandler;
