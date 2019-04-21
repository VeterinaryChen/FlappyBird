//小鸟类,循环渲染三只鸟
import {Sprite} from "../commonUtils/Sprite.js";

export class Birds extends Sprite{

    constructor(){
        const image = Sprite.getImage('birds');
        super(image,0,0);
    }
}