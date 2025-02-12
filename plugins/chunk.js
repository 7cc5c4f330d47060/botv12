import { default as c_loader } from 'prismarine-chunk';
const c = c_loader("1.18")
import { default as w_loader }  from 'prismarine-world';
const w = w_loader()
const rd = 4;


//Chunk data parsing placeholder, for core
export default function load (b) {
    
    b.worlds={}
    b._client.on("map_chunk", payload => {
        //console.log(payload);
        //b._chunk = new c();
        //b._chunk.load(payload.chunkData)
    })
}
