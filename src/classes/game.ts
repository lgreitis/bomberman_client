import Player from "./player";
import * as PIXI from "pixi.js";
import { getRandomArbitrary } from "../utils/random";

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

  addPlayer = (name: string) => {
    const player = new Player(
      name,
      getRandomArbitrary(100, this.appWidth - 100),
      getRandomArbitrary(100, this.appHeight - 100),
      this.container
    );
    this.players.push(player);
  };
}

export default Game;
