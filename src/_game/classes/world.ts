import { Bomb, Tile } from '../../types';
import * as PIXI from 'pixi.js';
import { SCALE } from '../../constants';

const grass = PIXI.Texture.from('grass.jpg');
const cobblestone = PIXI.Texture.from('cobblestone.png');
const wood = PIXI.Texture.from('wood.png');
const bedrock = PIXI.Texture.from('bedrock.png');
const ice = PIXI.Texture.from('ice.png');
const sand = PIXI.Texture.from('sand.jpg');
const water = PIXI.Texture.from('water.png');

const bomb = PIXI.Texture.from('bomb.png');

class World {
  tileData: Tile[];
  tileContainer: PIXI.Container;
  bombContainer: PIXI.Container;

  constructor(container: PIXI.Container) {
    this.tileData = [];
    this.tileContainer = new PIXI.Container();
    this.bombContainer = new PIXI.Container();

    container.addChild(this.tileContainer);
    container.addChild(this.bombContainer);
  }

  updateBombs = (bombs: Bomb[]) => {
    this.bombContainer.removeChildren();

    bombs.forEach((el) => {
      const sprite = new PIXI.Sprite(bomb);

      sprite.height = SCALE;
      sprite.width = SCALE;

      sprite.x = el.X * sprite.height;
      sprite.y = el.Y * sprite.width;

      this.bombContainer.addChild(sprite);
    });
  };

  generate = (tileData: Tile[]) => {
    this.tileContainer.removeChildren();

    tileData.forEach((el) => {
      const sprite = this.getTile(el.MapTileType);

      sprite.height = SCALE;
      sprite.width = SCALE;

      sprite.x = el.Position.X * sprite.height;
      sprite.y = el.Position.Y * sprite.width;

      this.tileContainer.addChild(sprite);
    });
  };

  getTile = (tileId: number) => {
    switch (tileId) {
      case 1: {
        return new PIXI.Sprite(grass);
      }
      case 2: {
        return new PIXI.Sprite(cobblestone);
      }
      case 3: {
        return new PIXI.Sprite(wood);
      }
      case 4: {
        return new PIXI.Sprite(bedrock);
      }
      case 5: {
        return new PIXI.Sprite(ice);
      }
      case 6: {
        return new PIXI.Sprite(sand);
      }
      case 7: {
        return new PIXI.Sprite(water);
      }
      default: {
        return new PIXI.Sprite(grass);
      }
    }
  };
}

export default World;
