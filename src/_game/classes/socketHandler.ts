import { GAME_WS_URL, LOBBY_WS_URL } from '../../constants';
import { Payload, ResponsePayload } from '../../types';
import { Inputs } from './input';

export enum SocketType {
  Lobby,
  Game,
}

class SocketHandler {
  socket: WebSocket;
  token: string;
  lobbyId: number;
  socketType: SocketType;

  constructor(token: string, toGameWs?: boolean) {
    if (toGameWs) {
      this.socket = new WebSocket(GAME_WS_URL);
      this.socketType = SocketType.Game;
    } else {
      this.socket = new WebSocket(LOBBY_WS_URL);
      this.socketType = SocketType.Lobby;
    }
    this.token = token;
    this.lobbyId = -1;
  }

  connectToGameWs = async () => {
    return new Promise((resolve) => {
      this.socket.close();
      this.socket = new WebSocket(GAME_WS_URL);
      this.socketType = SocketType.Game;

      this.socket.addEventListener('open', () => {
        resolve(undefined);
      });
    });
  };

  sendConnectCommand = () => {
    const payload: Payload = {
      CommandId: 'CONNECT',
      Data: {
        Token: this.token,
        LobbyId: this.lobbyId,
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  sendJoinCommand = (lobbyId: number, token: string) => {
    const payload: Payload = {
      CommandId: 'JOIN_LOBBY',
      Data: {
        lobbyId: lobbyId,
        Token: token,
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  sendMoveCommand = (inputs: Inputs) => {
    const payload: Payload = {
      CommandId: 'MOVE',
      Data: {
        PositiveX: inputs.ArrowRight,
        NegativeX: inputs.ArrowLeft,
        PositiveY: inputs.ArrowDown,
        NegativeY: inputs.ArrowUp,
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  sendBombCommand = () => {
    const payload: Payload = {
      CommandId: 'USE_BOMB',
    };

    this.socket.send(JSON.stringify(payload));
  };

  sendUndoCommand = () => {
    const payload: Payload = {
      CommandId: 'UNDO_BOMB',
    };

    this.socket.send(JSON.stringify(payload));
  };

  sendConsoleCommand = (text: string) => {
    const payload: Payload = {
      CommandId: 'EXECUTE_COMMAND',
      Data: {
        CommandText: text,
      },
    };

    this.socket.send(JSON.stringify(payload));
  };

  onStart = (cb: (lobbyId: number) => void) => {
    this.socket.addEventListener('message', (event) => {
      const data: ResponsePayload = JSON.parse(event.data);
      if (data.ResponseId === 'StartGame') {
        const Data = data.Data as { LobbyId: number };
        cb(Data.LobbyId);
      }
    });
  };
}

export default SocketHandler;
