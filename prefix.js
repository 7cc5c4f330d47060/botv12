var fs=require("fs");
var list={};
var data="";
var a=process.argv;
var c=a.shift()
var b=a.shift()
try{
	data = fs.readFileSync(a.join(" ")).toString("utf-8");
} catch (e) {}
const data2=data.split("\r").join("").split("\n")
process.stderr.write("Processing "+data2.length+" messages for prefixes.\n")
for (var i in data2){
if(list[data2[i]]){continue;}else
{
	if(data2[i].includes("/prefix")){data2[i]=data2[i].slice(data2[i].indexOf("/prefix"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/rank")){data2[i]=data2[i].slice(data2[i].indexOf("/rank"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/nick")){data2[i]=data2[i].slice(data2[i].indexOf("/nick"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/enick")){data2[i]=data2[i].slice(data2[i].indexOf("/enick"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/nickname")){data2[i]=data2[i].slice(data2[i].indexOf("/nickname"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/enickname")){data2[i]=data2[i].slice(data2[i].indexOf("/enickname"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/essentials:enickname")){data2[i]=data2[i].slice(data2[i].indexOf("/essentials:enickname"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/essentials:nickname")){data2[i]=data2[i].slice(data2[i].indexOf("/essentials:nickname"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/essentials:enick")){data2[i]=data2[i].slice(data2[i].indexOf("/essentials:enick"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/essentials:nick")){data2[i]=data2[i].slice(data2[i].indexOf("/essentials:nick"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/extras:prefix")){data2[i]=data2[i].slice(data2[i].indexOf("/extras:prefix"));console.log(data2[i]);list[data2[i]]=true}else
	if(data2[i].includes("/extras:rank")){data2[i]=data2[i].slice(data2[i].indexOf("/extras:rank"));console.log(data2[i]);list[data2[i]]=true}

}
}
var x=0;
for(var i in list){
	x++
}
process.stderr.write("Found "+x+" prefixes.\n")