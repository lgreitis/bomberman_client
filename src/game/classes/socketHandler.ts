import { MoveDirection, Payload } from "../../types";

class SocketHandler {
  socket: WebSocket;
  token: string;

  constructor(socket: WebSocket, token: string) {
    this.socket = socket;
    this.token = token;
  }

  sendConnectCommand = () => {
    const payload: Payload = {
      CommandId: "CONNECT",
      Data: {
        Token: this.token,
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
}

export default SocketHandler;
