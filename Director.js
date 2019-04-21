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
        this.moveSpeed = 2;
    }

    //创建pencil
    createPencil(){
        const minTop = window.innerHeight/8;
        const maxTop = window.innerHeight/2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    run(){
        //判断游戏是否结束
        if (!isGameOver){
            //加载背景
            this.dataStore.get('background').draw();

            //加载铅笔，处理绘制与销毁逻辑
            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4){
                pencils.shift();
                pencils.shift();
            }
            if (pencils[0].x <= (window.innerWidth - pencils[0].width) /2 && pencils.length === 2){
                this.createPencil();
            }
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            })

            //加载地面
            this.dataStore.get('land').draw();

            //加载鸟
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run())
            this.dataStore.put('timer',timer);

        }
        else{
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }
    }
}