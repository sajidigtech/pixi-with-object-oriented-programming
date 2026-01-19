import { Assets } from "pixi.js";
import { globalAsset } from "./globalAssets";

export class AssetLoader {

    // object format 
    async loadAll()  {
        // Import all images + JSON from src/assets
        const modules = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,json}", { eager: true });

        console.log("sabse pehele module dekho ->", modules)

        // Loop through each module and assign to globalAsset
        for (const path in modules) {

            console.log("")
            const fileName = path.split("/").pop()!; // "fish1.png" or "cards.json"
            const mod = modules[path] as any;

            console.log("dekho ab mod kya hai : ", mod.default)
            
            if (fileName.endsWith(".json")) {
                // JSON files → directly assign
                globalAsset[fileName] = mod.default || mod;
            }

            
            
            else {
                const texture = await Assets.load(mod.default);
                globalAsset[fileName] = texture;
                // its like agar json format hai to simply usi json ko dal do nahi to apan png img hua to uska direct texture bana denge,
                // this will convert even spritesheet img to texture, us case me edge case lagana hoga 
            }
        }

        console.log("✅ globalAsset ready:", globalAsset);
    }
}
