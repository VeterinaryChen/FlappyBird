import { Sprite } from "../commonUtils/Sprite.js";

//背景
export class Background extends Sprite{
    constructor(){
        
        const image = Sprite.getImage('background');

        super(image,
            0,0,
            image.width,image.height,
            window.innerWidth,window.innerHeight);
    }
}   