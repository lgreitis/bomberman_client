import { Tile } from "../../types";
import * as PIXI from "pixi.js";
import { SCALE } from "../../constants";

const grass = PIXI.Texture.from("grass.jpg");
const cobblestone = PIXI.Texture.from("cobblestone.png");
const wood = PIXI.Texture.from("wood.png");
const bedrock = PIXI.Texture.from("bedrock.png");

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
      //   const { width, height } = this.container;

      const sprite = this.getTile(el.MapTileType);

      // const nameText = new PIXI.Text(`${el.Position.X};${el.Position.Y}`, {
      //   fill: "0xffffff",
      //   fontSize: 126,
      // });

      // nameText.x = size / 2;
      // nameText.y = size / 2;

      sprite.height = size;
      sprite.width = size;

      sprite.x = el.Position.X * sprite.height;
      sprite.y = el.Position.Y * sprite.width;

      // sprite.addChild(nameText);

      this.container.addChild(sprite);
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
      default: {
        return new PIXI.Sprite(grass);
      }
    }
  };
}

export default World;