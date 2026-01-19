
class LoaderAsset{




    loadAll(){

        const modules = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,json}",{eager:true});

        for(const path in modules){
            
        }

    }
}