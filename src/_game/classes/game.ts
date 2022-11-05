import Player from './player';
import * as PIXI from 'pixi.js';
import Input from './input';
import SocketHandler from './socketHandler';
import { PlayerData, ResponsePayload } from '../../types';
import World from './world';
import { SCALE } from '../../constants';
import Debug from './debug';

interface GameData {
  Players: {
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
  world: World;
  debug: Debug;

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
    this.world = new World(worldContainer);
    this.app.stage.addChild(worldContainer);
    this.app.stage.addChild(this.container);

    this.socket.sendConnectCommand();
    this.startEventListener();

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.debug = new Debug(this.app);

    this.app.ticker.add(this.gameLoop);
  }

  destroy = () => {
    this.stopEventListener();
    this.app.destroy();
    this.input.destroy();
  };

  gameLoop = () => {
    if (!this.gameData) {
      return;
    }

    this.updatePlayers(this.gameData.Players);
    this.debug.updateData(this.gameData.Players, this.currentPlayerName);
  };

  updatePlayers = (players: PlayerData[]) => {
    players.forEach((player) => {
      this.updatePlayer(player);
    });
  };

  updatePlayer = (player: PlayerData) => {
    const fplayer = this.players.findIndex((x) => x.name === player.Username);

    if (fplayer === -1) {
      this.addPlayer(player.Username, player.X * SCALE, player.Y * SCALE);
    } else {
      this.players[fplayer].move(player.X * SCALE, player.Y * SCALE);
    }
  };

  addPlayer = (name: string, x: number, y: number) => {
    const player = new Player(name, x, y, this.container);
    this.players.push(player);
  };

  startEventListener = () => {
    this.socket.socket.addEventListener('message', this.eventListener);
  };

  stopEventListener = () => {
    this.socket.socket.removeEventListener('message', this.eventListener);
  };

  eventListener = (event: MessageEvent<unknown>) => {
    const data: ResponsePayload = JSON.parse(event.data as string);

    switch (data.ResponseId) {
      case 'Players': {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.gameData = { Players: data.Data };
        break;
      }
      case 'Map': {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.world.generate(data.Data.Map);
        break;
      }
    }
  };
}

export default Game;
