import * as PIXI from "pixi.js";

const texture = PIXI.Texture.from("bomberman-sprite-sheet.png");

class Player {
  name: string;
  sprite: PIXI.Sprite;
  x: number;
  y: number;

  constructor(name: string, x: number, y: number, container: PIXI.Container) {
    const playerSprite = new PIXI.Sprite(texture);

    const nameText = new PIXI.Text(name);
    nameText.x = -nameText.width / 2;
    nameText.y = -100;

    playerSprite.anchor.set(0.5);
    playerSprite.x = x;
    playerSprite.y = y;
    playerSprite.addChild(nameText);

    container.addChild(playerSprite);

    this.sprite = playerSprite;
    this.name = name;
    this.x = x;
    this.y = y;
  }

  move = (x: number, y: number) => {
    this.sprite.x = x;
    this.sprite.y = y;
  };
}

export default Player;
