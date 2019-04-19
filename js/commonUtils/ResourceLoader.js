import {Resources} from "./Resources.js";

export class ResourceLoader{
    
    constructor(){
        this.map = new map(Resources);
        for (let [key,value] of this.map){
            const image = new image();
            image.src = value;
            this.map.set(key,image);
        }
    }

    onLoaded(callback){
        let loadedCount = 0;
        for (let value of this.map.values()){
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size){
                    callback(this.map);
                }
            }
        }
    }

}