import { Pencil } from "./Pencil.js";
import { Sprite } from "../commonUtils/Sprite.js";
import {
  DataStore
} from "../commonUtils/DataStore.js";

export class DownPencil extends Pencil{
    
  constructor(top) {
    const image = Sprite.getImage('pencilDown');
    super(image, top);
  }

  draw() {
    let gap = DataStore.getInstance().canvas.height / 5;
    this.y = this.top + gap;
    super.draw();
  }
}