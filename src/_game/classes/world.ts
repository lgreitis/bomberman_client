import { Tile } from '../../types';
import * as PIXI from 'pixi.js';
import { SCALE } from '../../constants';

const grass = PIXI.Texture.from('grass.jpg');
const cobblestone = PIXI.Texture.from('cobblestone.png');
const wood = PIXI.Texture.from('wood.png');
const bedrock = PIXI.Texture.from('bedrock.png');
const ice = PIXI.Texture.from('ice.png');
const sand = PIXI.Texture.from('sand.jpg');
const water = PIXI.Texture.from('water.png');

class World {
  tileData: Tile[];
  container: PIXI.Container<PIXI.DisplayObject>;

  constructor(container: PIXI.Container<PIXI.DisplayObject>) {
    this.tileData = [];
    this.container = container;
  }

  generate = (tileData: Tile[]) => {
    const size = SCALE;

    tileData.forEach((el) => {
      const sprite = this.getTile(el.MapTileType);

      sprite.height = size;
      sprite.width = size;

      sprite.x = el.Position.X * sprite.height;
      sprite.y = el.Position.Y * sprite.width;

      this.container.addChild(sprite);
    });
  };

  /**
   * 
   * @param tileId Grass = 1,
        Cobblestone = 2,
        Wood = 3,
        Bedrock = 4,
        Ice = 5,
        Sand = 6,
        Water = 7,
   * @returns 
   */
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
