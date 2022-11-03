import * as PIXI from "pixi.js";
import { PlayerData } from "../../types";
import Player from "./player";

class Debug {
  app: PIXI.Application;
  positionText: PIXI.Text;
  positionTextOverlay: PIXI.Graphics;

  constructor(app: PIXI.Application) {
    this.app = app;
    const container = new PIXI.Container();
    this.positionText = new PIXI.Text("", { fontSize: 12, fill: "0xffffff" });

    this.positionTextOverlay = new PIXI.Graphics();

    container.addChild(this.positionTextOverlay);
    container.addChild(this.positionText);
    this.app.stage.addChild(container);
  }

  updateData = (players: PlayerData[], currentPlayerName: string) => {
    const player = players.find((el) => el.Username === currentPlayerName);

    if (!player) {
      return;
    }

    this.positionTextOverlay.clear();
    this.positionTextOverlay.beginFill(0x000000);
    this.positionTextOverlay.alpha = 0.5;
    this.positionTextOverlay.drawRect(
      0,
      0,
      this.positionText.width,
      this.positionText.height
    );

    this.positionText.text = `X: ${player.X} Y: ${player.Y}`;
  };
}

export default Debug;
