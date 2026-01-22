import { Application, Assets, Sprite } from "pixi.js";


import { globalAsset } from "./loader/globalAssets";
import { LoadingScene } from "./ui/LoadingScreen";

import { AssetLoader } from "./loader/AssetLoader";

import { GameScreen } from "./ui/GameScreen";
import { Player } from "./ui/PlayerRunningScreen";





class Game{

  assetloader !: AssetLoader;
  // this is the example of composition 
  app!:Application
  loadingScreen !: LoadingScene
  gameScreen !:GameScreen

  playerscreen !:Player

   async init(){

    const pixiContainer = document.getElementById("pixi-container");
    if (!pixiContainer) throw new Error("Pixi container not found");



    this.app = new Application();
    await this.app.init({

      resizeTo:window,
      backgroundColor: 0x464c8c,

    })

    pixiContainer.appendChild(this.app.canvas)
    await this.loadAsset();
    await this.showloadingScene();
    
    this.showAssetDetails();

    this.showGameScreen();

  }

  async showloadingScene(){
    this.loadingScreen = new LoadingScene(this.app);
    this.app.stage.addChild(this.loadingScreen);
    await new Promise((resolve)=>setTimeout(resolve,1500));
    // delay and after delay remove loading screen.
    this.app.stage.removeChild(this.loadingScreen)
  }


  async loadAsset(){
    this.assetloader = new AssetLoader();
    await this.assetloader.loadAll();

  }


  showAssetDetails(){
    console.log("the values of Global Data = >", globalAsset)
  }


  async showGameScreen(){
    this.gameScreen = new GameScreen(this.app);
    this.app.stage.addChild(this.gameScreen);

    // this.playerscreen = new Player(this.app);
    // await this.playerscreen.initPlayer();
    // this.app.stage.addChild(this.playerscreen)

    // below 3 lines do not remove them 

  } 


  
}


const game = new Game();
game.init();



