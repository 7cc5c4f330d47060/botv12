const lang = require("minecraft-data")("1.20.2").language;
const parse=function(data, l){
    const out=["","",""]; //console plain minecraft
    if (l === undefined) l = 0
    if (l >= 8) {
        return ['', '', '']
    }

    if(data[""]){
        data.text=data[""];
    }
    if(data.text){
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
            const j2 = parse(data.with[i], l + 1)
            trans = trans.replace(/%s/, j2[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans2 = trans2.replace(/%s/, j2[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            trans3 = trans3.replace(/%s/, j2[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
        }
        // %n$s only goes up to 4 normally
        if (data.with) {
            if (data.with[0]) {
                const j2_1 = parse(data.with[0], l + 1)
                trans = trans.replace(/%1\$s/g, j2_1[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans2 = trans2.replace(/%1\$s/g, j2_1[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans3 = trans3.replace(/%1\$s/g, j2_1[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            }
            if (data.with[1]) {
                const j2_2 = parse(data.with[1], l + 1)
                trans = trans.replace(/%2\$s/g, j2_2[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans2 = trans2.replace(/%2\$s/g, j2_2[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans3 = trans3.replace(/%2\$s/g, j2_2[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            }
            if (data.with[2]) {
                const j2_3 = parse(data.with[2], l + 1)
                trans = trans.replace(/%3\$s/g, j2_3[0].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans2 = trans2.replace(/%3\$s/g, j2_3[1].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
                trans3 = trans3.replace(/%3\$s/g, j2_3[2].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
            }
            if (data.with[3]) {
                const j2_4 = parse(data.with[3], l + 1)
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
            parsed=parse(data.extra[i])
            out[0]+=parsed[0];
            out[1]+=parsed[1];
            out[2]+=parsed[2];
        }
    }
    return out;
}
module.exports = parse
