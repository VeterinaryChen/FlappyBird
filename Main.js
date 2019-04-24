import {
    ResourceLoader
} from "./js/commonUtils/ResourceLoader.js";
import {
    Background
} from "./js/runtime/Background.js";
import {
    DataStore
} from "./js/commonUtils/DataStore.js";
import {
    Director
} from "./Director.js";
import { Land } from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const Loader = ResourceLoader.create();
        Loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }
    
    onResourceFirstLoaded(map) {
      this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        //判断游戏是否结束
        this.director.isGameOver = false;

        this.dataStore.put('background', Background)
            .put('land',Land)
            .put('pencils',[])
            .put('birds',Birds)
            .put('startButton',StartButton)
            .put('score',Score);
        this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }

    // 注册事件
    registerEvent(){
      wx.onTouchStart(() => {
        if (this.director.isGameOver) {
          console.log('游戏开始');
          this.init();
        } else {
          this.director.birdsEvent();
        }
      });
    }


}