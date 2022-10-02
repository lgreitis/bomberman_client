import { GAME_WS_URL, LOBBY_WS_URL } from "../../constants";
import { MoveDirection, Payload, ResponsePayload } from "../../types";

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

  sendMoveCommand = (dir: MoveDirection) => {
    const payload: Payload = {
      CommandId: "MOVE",
      Data: {
        Token: this.token,
        PositiveX: dir === "ArrowRight",
        NegativeX: dir === "ArrowLeft",
        PositiveY: dir === "ArrowDown",
        NegativeY: dir === "ArrowUp",
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  onStart = (cb: (lobbyId: number) => void) => {
    this.socket.addEventListener("message", (event) => {
      const data: ResponsePayload = JSON.parse(event.data);
      console.log(data);
      if (data.ResponseId === "StartGame") {
        cb(data.Data.LobbyId);
      }
    });
  };
}

export default SocketHandler;
