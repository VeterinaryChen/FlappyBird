import { Sprite } from "../commonUtils/Sprite.js";
import {DataStore} from "../commonUtils/DataStore.js";
//背景
export class Background extends Sprite{
    constructor(){
        
        const image = Sprite.getImage('background');

        super(image,
            0,0,
            image.width,image.height,
            0,0,
          DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
    }
}   