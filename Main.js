import { ResourceLoader } from "./js/commonUtils/ResourceLoader";

export class Main{
    constructor(){
        console.log("Main");
        new ResourceLoader();
    }
}