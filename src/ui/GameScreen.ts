import { globalAsset } from "../loader/globalAssets";
import { Application, Container, Graphics, Sprite, Texture, Ticker, TilingSprite } from "pixi.js";

import { FishType } from "../scripts/types";



export class GameScreen extends Container {

    app!: Application
    
    bg !: Graphics

    overlay_texture !: Texture
    overlayTilingSprite!: TilingSprite


    fish1 !: Sprite
    fish2 !: Sprite
    fish3 !: Sprite
    fish4 !: Sprite
    fish5 !: Sprite

    bigFish !: Sprite

    waveOverlay !: Sprite

    displacementMap!: Sprite

    pondBackground !: Sprite




    fishCount !: number
    fishSpriteArray !: Sprite[]

    fishTextures !: Texture[]



    fishes: FishType[] = []




    constructor(app: Application) {

        super();
        this.app = app;

        this.bg = new Graphics();
        this.bg.rect(0, 0, app.screen.width, app.screen.height);
        this.bg.fill(0x1e1e2f); // background color
        this.addChild(this.bg);

        



        this.initiateSprites();

        this.pondBackground.width = app.screen.width;
        this.pondBackground.height = app.screen.height;

        this.pondBackground.position.set(0, 0);

        this.addChild(this.pondBackground);

        this.overlay_texture = globalAsset["wave_overlay.png"];
        this.overlayTilingSprite = new TilingSprite(
            this.overlay_texture,
            this.app.screen.width,
            this.app.screen.height
        );
        // this.addChild(this.overlayTilingSprite);

        // Ticker me sirf move karo
        // this.app.ticker.add(() => {
        //     this.overlayTilingSprite.tilePosition.x -= 1; // horizontally move
        //     this.overlayTilingSprite.tilePosition.y -= 2; // vertically move
        // });

        this.addFishes()


        this.startAnimation();
        this.handleRemoveFish()


    }


    initiateSprites() {
        this.fish1 = Sprite.from(globalAsset["fish1.png"]);
        this.fish2 = Sprite.from(globalAsset["fish2.png"]);
        this.fish3 = Sprite.from(globalAsset["fish3.png"]);
        this.fish4 = Sprite.from(globalAsset["fish4.png"]);
        this.fish5 = Sprite.from(globalAsset["fish5.png"]);
        this.waveOverlay = Sprite.from(globalAsset["wave_overlay.png"]);
        this.displacementMap = Sprite.from(globalAsset["displacement_map.png"]);
        this.pondBackground = Sprite.from(globalAsset["pond_background.jpg"]);

        this.bigFish = Sprite.from(globalAsset["bigfish.png"])
        
    }


    // addFishes() {

    //     this.fishCount = 20;
    //     this.fishSpriteArray = [this.fish1, this.fish2, this.fish3, this.fish4, this.fish5];


    //     for (let i = 0; i < this.fishCount; i++) {
    //         const fish: Sprite = this.fishSpriteArray[i % this.fishSpriteArray.length];

    //         fish.anchor.set(0.5);

    //         fish.direction = Math.random() * Math.PI * 2;
    //         fish.speed = 2 + Math.random() * 2;
    //         fish.turnSpeed = Math.random() - 0.8;

    //         fish.x = Math.random() * this.app.screen.width;
    //         fish.y = Math.random() * this.app.screen.height;

    //         fish.scale.set(0.5 + Math.random() * 0.2);

    //         this.addChild(fish);
    //     }



    // }

    addFishes() {

        // load big fish on screen top left corner 

        // this.addChild(this.bigFish)
        // this.bigFish.anchor.set(0.5)
        // this.bigFish.position.set(50, this.app.screen.height -40)
        this.fishCount = 50;

        this.fishTextures = [
            globalAsset["fish1.png"], // 0
            globalAsset["fish2.png"], // 1
            globalAsset["fish3.png"], // 2
            globalAsset["fish4.png"], // 3
            globalAsset["fish5.png"], // 4
        ];

        for (let i = 0; i < this.fishCount; i++) {
            const fish = Sprite.from(this.fishTextures[i % this.fishTextures.length]) as FishType

            fish.anchor.set(0.5);
            fish.x = Math.random() * this.app.screen.width;
            fish.y = Math.random() * this.app.screen.height;

            fish.label = `fish-${i}`

            fish.direction = Math.random();
            fish.speed = Math.random();
            fish.turnSpeed = Math.random();
            fish.scale.set(0.5 + Math.random() * 0.2);



            this.fishes.push(fish);
            // fishes array me fish sprites sari push hongi 
            this.addChild(fish);
        }
    }

    startAnimation() {
        this.app.ticker.add(this.animateFishes, this)
    }


    animateFishes() {


        const w = this.app.screen.width + 800;
        const h = this.app.screen.height + 800;



        for (const fish of this.fishes) {
            fish.direction += fish.turnSpeed * 0.01;
            fish.x += Math.sin(fish.direction) * fish.speed;
            fish.y += Math.cos(fish.direction) * fish.speed;

            fish.rotation = -fish.direction - Math.PI / 2;


            if (fish.x < -w) {
                fish.x = w;
            }
            if (fish.x > h) {
                fish.x = 0;
            }

            if (fish.y < -h) {
                fish.y = h;
            }
            if (fish.y > h) {
                fish.y = 0;
            }


        }









    }


    handleRemoveFish() {
        for (const fish of this.fishes) {
            fish.eventMode = 'static';
            fish.cursor = "pointer"
            fish.on("mousedown", () => {

                this.removeChild(fish);
                console.log("fish removed : ", fish.label)

            })
        }
    }









}


