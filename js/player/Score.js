import {DataStore} from "../commonUtils/DataStore.js";

export class Score{

    // scoreNumber为页面上实际分数
    constructor(){
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
    //   加分只加一次
        this.isScore = true;
    }

    draw(){
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcbeb';
        this.ctx.fillText(this.scoreNumber , DataStore.getInstance().canvas.width/2 , DataStore.getInstance().canvas.height/14 ,1000 );
    }
}