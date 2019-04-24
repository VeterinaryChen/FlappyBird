//小鸟类,循环渲染三只鸟
import {Sprite} from "../commonUtils/Sprite.js";
import {DataStore} from "../commonUtils/DataStore.js";

export class Birds extends Sprite{

    constructor(){
        const image = Sprite.getImage('birds');
        super(image,0,0,image.width,image.height,
            0,0,image.width,image.height);

        //  鸟的三种状态需要数组去存储
        //  鸟的宽是34，上下边距10，左右边距9
        this.clippingX = [9 , 9+34+18 , 9+34+18+18+34];
        this.clippingY = [10 , 10 , 10 ];
        this.clippingWidth = [34 , 34 , 34];
        this.clippingHeight = [24 , 24, 24];
        //  初始位置
        const birdX = DataStore.getInstance().canvas.width / 4;
        this.birdsX = [birdX,birdX,birdX];
        const birdY = DataStore.getInstance().canvas.height / 2;
        this.birdsY = [birdY,birdY,birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth,birdWidth,birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight,birdHeight,birdHeight];
        this.y = [birdY,birdY,birdY];
        this.time = 0;
        this.index = 0;
        this.count =0;
    }

    draw(){
        //切换小鸟的速度
        const speed = 0.2;
        this.count = this.count + speed;
        if (this.count>=2){
            this.count = 0;
        }
        //减速器
        this.index = Math.floor(this.count);

        // 模拟重力加速度
        const g = 0.98 / 2.6;
        // 向上移动一点位移量
        const offSetUp = 35;
        // 小鸟的位移
        const offSetY = (g * this.time * (this.time - offSetUp)) / 2;

        for (let i=0 ; i<=2 ; i++){
            this.birdsY[i] = this.y[i] + offSetY;
        }
        this.time ++;

        super.draw(
            this.img,
            this.clippingX[this.index],this.clippingY[this.index],
            this.clippingWidth[this.index],this.clippingHeight[this.index],
            this.birdsX[this.index],this.birdsY[this.index],
            this.birdsWidth[this.index],this.birdsHeight[this.index]
        )
    }
}