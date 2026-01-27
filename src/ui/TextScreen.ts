import { Application, BitmapText, Container } from "pixi.js";
import { globalAsset } from "../loader/globalAssets";

export class TextData extends Container {

    app!: Application;
    scoreText !: BitmapText;

    constructor(app: Application) {
        super();
        this.app = app;

        this.createText()

    }

    createText() {
        this.scoreText = new BitmapText({
            text: "Fishkill: 0",
            style: {
                fontFamily: "Desyrel",   // 👈 bitmap font family name (from XML)
                fontSize: 48,
                align: "left",
            },
        })

        this.scoreText.position.set(30, 20);
        this.addChild(this.scoreText);
    }


    updateScore(value: number) {
    this.scoreText.text = `Fishkill: ${value}`;
  }
}