import { Sprite } from "../commonUtils/Sprite.js";
import { Director } from "../../Director.js";

export class Land extends Sprite{
    
    constructor() {
        const image = Sprite.getImage('land');
        super(image,0,0,
            image.width,image.height,
            0,window.innerHeight - image.height,
            image.width,image.height);
        // 地板的变化坐标与移动速度
        this.landX = 0;
        this.landSpeed = Director.getInstance().moveSpeed;
    }

    draw(){
        if (this.landX > (this.img.width - window.innerWidth)){
            this.landX = 0;
        }
        this.landX = this.landX + this.landSpeed;
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            -this.srcX,
            this.srcY,
            this.width,
            this.height)
    }
}