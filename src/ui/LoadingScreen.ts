import { Container, Graphics, Text, Application } from "pixi.js";



export class LoadingScene extends Container {

    bg!: Graphics
    loadingText!: Text
    app! :Application


    constructor(app:Application) {
        super();
        this.app = app;
        this.bg = new Graphics();
        this.bg.fill(0x0a1f44);
        this.bg.rect(0, 0, 200, 40);
        this.bg.fill();
        this.bg.alpha = 0.9;
        this.addChild(this.bg);

        this.pivot.set(this.width/2, this.height/2);

        this.bg.position.set(this.app.screen.width/2,this.app.screen.height/2)

        this.loadingText = new Text({

            text: "Loading...",
            style: {
                fill: 0xffffff,
                fontSize: 32,
                fontFamily: "Arial"
            }

        });
        this.loadingText.anchor.set(0.5);
        this.loadingText.x = this.bg.width / 2;
        this.loadingText.y = this.bg.height / 2;
        // this.addChild(this.loadingText);
        this.bg.addChild(this.loadingText)
    }

}