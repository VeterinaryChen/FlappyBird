import { Pencil } from "./Pencil.js";

export class DownPencil extends Pencil{
    
    constructor(top){
        const image = Sprite.getImage('pencilDown');
        super();
    }

    draw(){
        // 两根铅笔之间的间隙，设置为屏幕高度的1/5
        let gap = window.innerHeight / 5;
        this.y = this.top + gap;
        super.draw();
    }
}