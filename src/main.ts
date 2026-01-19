import { Application, Assets, Sprite } from "pixi.js";


import { globalAsset } from "./loader/globalAssets";
import { LoadingScene } from "./ui/LoadingScreen";

import { AssetLoader } from "./loader/AssetLoader";

import { GameScreen } from "./ui/GameScreen";





class Game{

  assetloader !: AssetLoader;
  app!:Application
  loadingScreen !: LoadingScene
  gameScreen !:GameScreen

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


  showGameScreen(){
    this.gameScreen = new GameScreen(this.app);
    this.app.stage.addChild(this.gameScreen)
  } 


  
}


const game = new Game();
game.init();



