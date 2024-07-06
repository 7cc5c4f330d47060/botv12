const {processNbtMessage} = require("prismarine-chat");
const parse=function(data){
    if(typeof data.type=="string"){
        return JSON.parse(processNbtMessage(data));
    } else {
        return data;
    }
}
module.exports = parse
