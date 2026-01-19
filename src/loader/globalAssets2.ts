
import {Texture, Spritesheet} from "pixi.js"

export interface AssetStore {
  textures: Record<string, Texture>;
  sheets: Record<string, Spritesheet>;
  json: Record<string, unknown>;
  audio: Record<string, HTMLAudioElement | AudioBuffer>;
}

export const globalAsset: AssetStore = {
  textures: {},
  sheets: {},
  json: {},
  audio: {},
};