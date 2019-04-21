import { Pencil } from "./Pencil.js";
import { Sprite } from "../commonUtils/Sprite.js";

export class UpPencil extends Pencil{
    constructor(){
        const image = Sprite.getImage('pencilUp');
        super(image,top);
    }

    draw(){
        this.y = this.top - this.height;
        super.draw();
    }
}