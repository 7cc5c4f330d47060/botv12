const lang = require("minecraft-data")("1.20.2").language;
const consoleColors={
    "dark_red":"\x1B[38;5;1m",
    "red":"\x1B[38;5;9m",
    "dark_green":"\x1B[38;5;2m",
    "green":"\x1B[38;5;10m",
    "gold":"\x1B[38;5;3m",
    "yellow":"\x1B[38;5;11m",
    "dark_blue":"\x1B[38;5;4m",
    "blue":"\x1B[38;5;12m",
    "dark_purple":"\x1B[38;5;5m",
    "light_purple":"\x1B[38;5;13m",
    "dark_aqua":"\x1B[38;5;6m",
    "aqua":"\x1B[38;5;14m",
    "black":"\x1B[38;5;0m",
    "gray":"\x1B[38;5;7m",
    "dark_gray":"\x1B[38;5;8m",
    "white":"\x1B[38;5;15m",
    "reset":"\x1B[0m\x1B[38;5;15m"
}
const parse=function(data, l, resetColor){
    //console.log(data)
    let nkt=false;
    if(!resetColor){
        resetColor=[consoleColors.reset];
    }
    const out=["","",""]; //console plain minecraft
    if (l === undefined) l = 0
    if (l >= 12) {
        return ['', '', '']
    }

    if(data[""]){
        data.text=data[""];
        nkt=true;
    }
    if(data.color){
        if(data.color=="reset"){
            out[0]+=resetColor[0]
        } else {
            out[0]+=consoleColors[data.color];
        }
    }
    if(data.text){
        if(nkt){
            out[0]+=resetColor[0];
            out[2]+=resetColor[1];
        }
        out[0]+=data.text;
        out[1]+=data.text;
        out[2]+=data.text;
    }
    if (data.translate) {
        let trans = data.translate
        let trans2 = data.translate.replace(/%%/g, '\ue123')
        let trans3 = data.translate.replace(/%%/g, '\ue123')
        if (lang[trans] !== undefined) {
            trans = lang[trans].replace(/%%/g, '\ue123')
            trans2 = lang[trans2].replace(/%%/g, '\ue123')
            trans3 = lang[trans3].replace(/%%/g, '\ue123')
        }
            for (const i in data.with) {
            const j2 = parse(data.with[i], l + 1, data.color?[consoleColors[data.color],""]:resetColor)
            trans = trans.replace(/%s/, j2[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans2 = trans2.replace(/%s/, j2[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans3 = trans3.replace(/%s/, j2[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
        }
        // %n$s only goes up to 4 normally
        if (data.with) {
            if (data.with[0]) {
                const j2_1 = parse(data.with[0], l + 1, data.color?[consoleColors[data.color],""]:resetColor)
                trans = trans.replace(/%1\$s/g, j2_1[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans2 = trans2.replace(/%1\$s/g, j2_1[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans3 = trans3.replace(/%1\$s/g, j2_1[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            }
            if (data.with[1]) {
                const j2_2 = parse(data.with[1], l + 1, data.color?[consoleColors[data.color],""]:resetColor)
                trans = trans.replace(/%2\$s/g, j2_2[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans2 = trans2.replace(/%2\$s/g, j2_2[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans3 = trans3.replace(/%2\$s/g, j2_2[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            }
            if (data.with[2]) {
                const j2_3 = parse(data.with[2], l + 1, data.color?[consoleColors[data.color],""]:resetColor)
                trans = trans.replace(/%3\$s/g, j2_3[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans2 = trans2.replace(/%3\$s/g, j2_3[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans3 = trans3.replace(/%3\$s/g, j2_3[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            }
            if (data.with[3]) {
                const j2_4 = parse(data.with[3], l + 1, data.color?[consoleColors[data.color],""]:resetColor)
                trans = trans.replace(/%4\$s/g, j2_4[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans2 = trans2.replace(/%4\$s/g, j2_4[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans3 = trans3.replace(/%4\$s/g, j2_4[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            }
        }
        out[1] += trans.replace(/%([0-9]*\$){0,1}s/g, '').replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
        out[0] += trans2.replace(/%([0-9]*\$){0,1}s/g, '').replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s').replace(/\n/g, '\n')
        out[2] += trans3.replace(/%([0-9]*\$){0,1}s/g, '').replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
    }
    if(data.extra){
        for(const i in data.extra){
            parsed=parse(data.extra[i], l + 1, data.color?[consoleColors[data.color],""]:resetColor)
            out[0]+=parsed[0];
            out[1]+=parsed[1];
            out[2]+=parsed[2];
        }
    }
    return out;
}
module.exports = parse
