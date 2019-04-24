import {
  DataStore
} from "./js/commonUtils/DataStore.js";
import {UpPencil} from "./js/runtime/UpPencil.js";
import {DownPencil} from "./js/runtime/DownPencil.js";

// 单例导演类，控制整个游戏的逻辑
export class Director{
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor(){
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 1;
    }

    //创建pencil
    createPencil(){
        const minTop = window.innerHeight/8;
        const maxTop = window.innerHeight/2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    // 小鸟逻辑
    birdsEvent(){
        for(let i=0 ; i<3 ; i++){
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    // 小鸟是否和铅笔撞击
    static isStrike(bird,pencil){
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right){
            s = true;
        }
        return !s;
    }
    // 判断小鸟是否撞击地板与铅笔
    check(){
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        //  地板撞击判断
        if( birds.birdsY[0] + birds.birdsHeight[0] >= land.y){
            this.isGameOver = true;
            return;
        }
        //  小鸟的边框模型
        const birdsBorder = {
            top:birds.y[0],
            bottom:birds.birdsY[0] + birds.birdsHeight[0],
            left:birds.birdsX[0],
            right:birds.birdsX[0] + birds.birdsWidth[0]
        };
        const length = pencils.length;
        // 循环判断撞击,若边框值相等时则视为撞击
        for (let i=0 ; i<length ; i++){
            const pencil = pencils[i];
            // 铅笔的边框模型
            const pencilBorder = {
                top:pencil.y,
                bottom:pencil.height + pencil.y,
                left:pencil.x,
                right:pencil.x + pencil.width
            };
            if(Director.isStrike(birdsBorder,pencilBorder)){
                this.isGameOver = true;
                return;
            }
        }

        //  加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore){
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    run(){
        this.check();
        //判断游戏是否结束
        if (!this.isGameOver){
            //加载背景
            this.dataStore.get('background').draw();

            //加载铅笔，处理绘制与销毁逻辑
            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4){
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').isScore = true;

            }
          if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) /2 && pencils.length === 2){
                this.createPencil();
            }
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            })

            //加载地面
            this.dataStore.get('land').draw();

            //加载分数
            this.dataStore.get('score').draw();

            //加载鸟
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run())
            this.dataStore.put('timer',timer);

        }
        else{
            console.log("游戏结束！");
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
          //触发微信小游戏垃圾回收
            wx.triggerGC();
        }
    }
}