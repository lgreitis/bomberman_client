import * as PIXI from 'pixi.js';
import { SCALE } from '../../constants';

const texture = PIXI.Texture.from('bomberman-sprite-sheet.png');

class Player {
  name: string;
  token: string;
  sprite: PIXI.Sprite;
  hp: number;
  x: number;
  y: number;

  constructor(
    name: string,
    token: string,
    x: number,
    y: number,
    container: PIXI.Container,
    hp: number
  ) {
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
    this.token = token;
    this.hp = hp;
    this.x = x;
    this.y = y;
  }

  updatePlayer = (x: number, y: number, hp: number) => {
    this.sprite.x = x;
    this.sprite.y = y;

    // this.sprite.tint = `0x${}`
    switch (hp) {
      case 3:
        this.sprite.tint = 0xffffff;
        break;
      case 2:
        this.sprite.tint = 0xfcba03;
        break;
      case 1:
        this.sprite.tint = 0xff0000;
        break;
      default:
        this.sprite.tint = 0x969090;
        this.sprite.alpha = 0.5;
        break;
    }
  };
}

export default Player;
