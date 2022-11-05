import * as PIXI from 'pixi.js';
import { SCALE } from '../../constants';

const texture = PIXI.Texture.from('bomberman-sprite-sheet.png');

class Player {
  name: string;
  sprite: PIXI.Sprite;
  x: number;
  y: number;

  constructor(name: string, x: number, y: number, container: PIXI.Container) {
    const playerSprite = new PIXI.Sprite(texture);

    playerSprite.height = SCALE;
    playerSprite.width = (SCALE * 67) / 118;

    const nameText = new PIXI.Text(name, { fill: '0xffffff', fontSize: 48 });
    nameText.x = -nameText.width / 2;
    nameText.y = -110;

    playerSprite.anchor.set(0.5);
    playerSprite.x = x;
    playerSprite.y = y;

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000);
    graphics.alpha = 0.5;
    const width = nameText.width + 20;
    graphics.drawRect(-width / 2, -115, nameText.width + 20, nameText.height + 10);

    playerSprite.addChild(graphics);
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
