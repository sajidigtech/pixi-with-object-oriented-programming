import { Sprite } from "pixi.js";

export interface FishType extends Sprite{

    direction : number,
    speed:number ,
    turnSpeed : number
}

// this means koi sprite jo type define krega khud ko as "FishTypec" -> that will be a sprite but with extra properties like : direction, speed, turnspeed