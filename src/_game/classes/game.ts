import Player from "./player";
import * as PIXI from "pixi.js";
import Input from "./input";
import SocketHandler from "./socketHandler";
import { PlayerData, ResponsePayload, Tile } from "../../types";
import World from "./world";
import worldJson from "./world.json";

interface GameData {
  // LobbyId: number;
  Players: {
    // IsConnected: boolean;
    X: number;
    Y: number;
    Token: string;
    UserId: string;
    Username: string;
  }[];
}

class Game {
  app: PIXI.Application;
  container: PIXI.Container;
  socket: SocketHandler;
  appWidth: number;
  appHeight: number;
  players: Player[];
  currentPlayerName: string;
  input: Input;
  lobbyId: number;
  gameData: GameData | null;
  worldData: Tile[];

  constructor(
    width: number,
    height: number,
    username: string,
    socketHandler: SocketHandler,
    lobbyId: number
  ) {
    this.app = new PIXI.Application({
      width,
      height,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });

    this.worldData = [];

    this.currentPlayerName = username;
    this.appWidth = width;
    this.appHeight = height;
    this.container = new PIXI.Container();
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;
    this.players = [];
    this.socket = socketHandler;
    this.input = new Input(this.socket);
    this.lobbyId = lobbyId;
    this.gameData = null;

    const worldContainer = new PIXI.Container();
    const world = new World(worldContainer);
    this.app.stage.addChild(worldContainer);

    this.app.stage.addChild(this.container);

    this.socket.sendConnectCommand();

    this.socket.socket.addEventListener("message", (event) => {
      const data: ResponsePayload = JSON.parse(event.data);

      switch (data.ResponseId) {
        case "Players": {
          this.gameData = { Players: data.Data };
          break;
        }
        case "Map": {
          this.worldData = data.Data.Map;
          world.generate(data.Data.Map);

          break;
        }
      }
    });

    this.container = new PIXI.Container();
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.container);

    this.app.ticker.add(this.gameLoop);
  }

  gameLoop = () => {
    if (!this.gameData) {
      return;
    }

    this.updatePlayers(this.gameData.Players);
  };

  updatePlayers = (players: PlayerData[]) => {
    players.forEach((player) => {
      this.updatePlayer(player);
    });
  };

  updatePlayer = (player: PlayerData) => {
    const fplayer = this.players.findIndex((x) => x.name === player.Username);

    if (fplayer === -1) {
      this.addPlayer(player.Username, player.X, player.Y);
    } else {
      this.players[fplayer].move(player.X, player.Y);
    }
  };

  addPlayer = (name: string, x: number, y: number) => {
    const player = new Player(name, x, y, this.container);
    this.players.push(player);
  };
}

export default Game;
