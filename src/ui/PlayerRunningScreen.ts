import { Sprite, Spritesheet, Application, AnimatedSprite, Container } from "pixi.js";
import { globalAsset } from "../loader/globalAssets";


export class Player extends Container {

    app!: Application;
    player !: AnimatedSprite;


    constructor(app: Application) {
        super();

        this.app = app;




    }

    async initPlayer() {
        const sheetTexture = globalAsset["spriteImage.png"];
        const sheetData = globalAsset["player.json"];

        const spritesheet = new Spritesheet(sheetTexture, sheetData as any);
        
        await spritesheet.parse(); // ✅ Ye step sabse important

        this.player = new AnimatedSprite(spritesheet.animations["run"]);
        this.player.anchor.set(0.5);
        this.player.animationSpeed = 0.2;
        this.player.play();

        this.player.x = this.app.screen.width / 2;
        this.player.y = this.app.screen.height / 2;

        this.addChild(this.player);
    }

}