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

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        const Loader = ResourceLoader.create();
        Loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        this.dataStore.put('background', Background).put('land',Land);
        Director.getInstance.run();
    }


}