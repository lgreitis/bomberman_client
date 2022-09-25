import Player from "./player";
import * as PIXI from "pixi.js";
import Input from "./input";
import SocketHandler from "./socketHandler";
import { PlayerData, ResponsePayload } from "../../types";

class Game {
  app: PIXI.Application;
  container: PIXI.Container;
  socket: SocketHandler;
  appWidth: number;
  appHeight: number;
  players: Player[];
  currentPlayerName: string;
  input: Input;

  constructor(
    width: number,
    height: number,
    socket: WebSocket,
    username: string
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
    this.app.stage.addChild(this.container);
    this.players = [];
    this.socket = new SocketHandler(socket, username);
    this.input = new Input(this.socket);

    this.socket.sendConnectCommand();

    this.socket.socket.addEventListener("message", (event) => {
      const data: ResponsePayload = JSON.parse(event.data);
      console.log(data);
      switch (data.ResponseId) {
        case "GameUpdate":
          console.log("GameUpdate");
          this.updatePlayers(data.Data.Players);
          break;
      }
    });

    // this.app.ticker.add((delta) => {
    //   // rotate the container!
    //   // use delta to create frame-independent transform
    //   // this.container.rotation -= 0.01 * delta;
    // });
  }

  updatePlayers = (players: PlayerData[]) => {
    this.players = [];

    this.container = new PIXI.Container();
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;
    this.app.stage.removeChildren();
    this.app.stage.addChild(this.container);

    players.forEach((element) => {
      // const player = this.players.find((x) => x.name === element.Username);
      // if (!player) {
      this.addPlayer(element.Username, element.LocationX, element.LocationY);
      //   } else {
      //     player.move(player.x, player.y);
      //   }
    });

    // this.app.stage.removeChildren();
    // this.container.();
  };

  addPlayer = (name: string, x: number, y: number) => {
    const player = new Player(name, x, y, this.container);
    this.players.push(player);
  };

  removePlayers = () => {
    this.players = [];
    this.app.stage.removeChildren();
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
  };
}

export default Game;