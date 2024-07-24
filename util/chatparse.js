const _lang = require("minecraft-data")("1.20.2").language;
let lang=Object.create(null); //Without constructor function
for(const i in _lang){
    lang[i]=_lang[i];
}
const consoleColors={
    "dark_red":"\x1B[0m\x1B[38;2;170;0;0m",
    "red":"\x1B[0m\x1B[38;2;255;85;85m",
    "dark_green":"\x1B[0m\x1B[38;2;0;170;0m",
    "green":"\x1B[0m\x1B[38;2;85;255;85m",
    "gold":"\x1B[0m\x1B[38;2;255;170;0m",
    "yellow":"\x1B[0m\x1B[38;2;255;255;85m",
    "dark_blue":"\x1B[0m\x1B[38;2;0;0;170m",
    "blue":"\x1B[0m\x1B[38;2;85;85;255m",
    "dark_purple":"\x1B[0m\x1B[38;2;170;0;170m",
    "light_purple":"\x1B[0m\x1B[38;2;255;85;255m",
    "dark_aqua":"\x1B[0m\x1B[38;2;0;170;170m",
    "aqua":"\x1B[0m\x1B[38;2;85;255;255m",
    "black":"\x1B[0m\x1B[48;2;220;220;220m\x1B[38;2;0;0;0m",
    "gray":"\x1B[0m\x1B[38;2;170;170;170m",
    "dark_gray":"\x1B[0m\x1B[38;2;85;85;85m",
    "white":"\x1B[0m\x1B[38;2;255;255;255m",
    "reset":"\x1B[0m\x1B[38;2;255;255;255m"
}
const hexColorParser=(color)=>{
    let out="\x1B[0m";
    const redChannel=Number("0x"+color.slice(1,3));
    const greenChannel=Number("0x"+color.slice(3,5));
    const blueChannel=Number("0x"+color.slice(5,7));
    if(redChannel < 96 && greenChannel < 96 && blueChannel < 96){
        out+="\x1B[48;2;220;220;220m";
    }
    return out+`\x1B[38;2;${redChannel};${greenChannel};${blueChannel}m`
}
const processColor=(col,rcol)=>{
    let out=["",""]
    if(col=="reset"){
        out[0]=rcol[0]
    } else if (col.startsWith("#")){
        out[0]=hexColorParser(col);
    } else {
        out[0]=consoleColors[col];
    }
    return out;
}
const parse=function(_data, l = 0, resetColor = [consoleColors.reset]){
    if (l >= 12) {
        return ['', '', '']
    }
    let data;
    if(typeof _data == "string"){
        data={text:_data, color: "reset"}
    } else if(typeof _data == "number"){
        data={text:_data+"", color: "reset"}
    } else {
        data=_data;
    }
    let nkt=false;
    const out=["","",""]; //console plain minecraft
    if(data[""]){
        data.text=data[""];
        nkt=true;
    }
    if(data.color){
        if(data.color=="reset"){
            out[0]+=resetColor[0]
        } else if (data.color.startsWith("#")){
            out[0]+=hexColorParser(data.color);
        } else {
            out[0]+=consoleColors[data.color];
        }
    } else {
        out[0]+=resetColor[0]
    }
    if(data.text){
        let _text=data.text;
        if(typeof _text=="number"){
            _text=_text.toString()
        }
        if(nkt){
            out[0]+=resetColor[0];
            out[2]+=resetColor[1];
        }
        out[0]+=_text.replace(/\u001b/g,"").replace(/\u000e/g,""); //Remove escape codes and [SO] from console format
        out[1]+=_text;
        out[2]+=_text;
    }
    if (data.translate) {
        let trans = data.translate.replace(/%%/g, '\ue123').replace(/\u001b/g,""); //Remove escape codes from console format
        let trans2 = data.translate.replace(/%%/g, '\ue123')
        let trans3 = data.translate.replace(/%%/g, '\ue123')
        if (lang[trans] !== undefined) {
            trans = lang[trans].replace(/%%/g, '\ue123')
            trans2 = lang[trans2].replace(/%%/g, '\ue123')
            trans3 = lang[trans3].replace(/%%/g, '\ue123')
        }
        for (const i in data.with) {
            const j2 = parse(data.with[i], l + 1, data.color?processColor(data.color,resetColor):resetColor)
            trans = trans.replace(/%s/, j2[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans2 = trans2.replace(/%s/, j2[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans3 = trans3.replace(/%s/, j2[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans = trans.replaceAll(`%${+i+1}$s`, j2[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans2 = trans2.replaceAll(`%${+i+1}$s`, j2[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans3 = trans3.replaceAll(`%${+i+1}$s`, j2[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
        }
        out[0] += trans.replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
        out[1] += trans2.replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
        out[2] += trans3.replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
    }
    if(data.extra){
        for(const i in data.extra){
            parsed=parse(data.extra[i], l, data.color?processColor(data.color,resetColor):resetColor)
            out[0]+=parsed[0];
            out[1]+=parsed[1];
            out[2]+=parsed[2];
        }
    }
    out[0]+=resetColor[0];
    return out;
}
const parse2=function(_data, l, resetColor){
    try{
        return parse(_data)
    } catch(e){
        console.error(e)
        return [
            "\x1B[0m\x1B[38;2;255;85;85mAn error occured while parsing a message. See console for more information.\nJSON that caused the error: "+JSON.stringify(_data),
            "An error occured while parsing a message. See console for more information. JSON that caused the error: "+JSON.stringify(_data),
            "§cAn error occured while parsing a message. See console for more information. JSON that caused the error: "+JSON.stringify(_data)
        ]
    }
}
module.exports = parse2
