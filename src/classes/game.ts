import Player from "./player";
import * as PIXI from "pixi.js";

class Game {
  app: PIXI.Application;
  container: PIXI.Container;
  appWidth: number;
  appHeight: number;
  players: Player[];

  constructor(width: number, height: number) {
    this.app = new PIXI.Application({
      width,
      height,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });

    this.appWidth = width;
    this.appHeight = height;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.players = [];
  }

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
