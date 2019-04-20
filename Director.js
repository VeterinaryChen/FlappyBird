
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
        this.datastore.get('background').draw();
        this.datastore.get('land').draw();
        let timer = requestAnimationFrame(() => this.run())
        this.datastore.put('timer',timer);
        cancelAnimationFrame(this.datastore.get('timer'));
        
    }
}