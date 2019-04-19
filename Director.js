
// 导演类，控制整个游戏的逻辑
export class Director{
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor(){
        this.datastore = DataStore.getInstance();
    }

    run(){
        const backgroundSprite = this.datastore.get('background');
        backgroundSprite.draw();
    }
}