var translates=require("./en_us.json");
const tth=function(T,go){
	
	if(T){
		if(T.color){
				var areturn="";
				var breturn="";
				var creturn="";
			if(T.color=="black")	    {areturn+="\x1b[0m\x1b[2m\x1b[30m\x1b[47m";	breturn+="\u00a70";pc=T.color} else
			if(T.color=="dark_blue")   {areturn+="\x1b[0m\x1b[2m\x1b[34m";			breturn+="\u00a71";pc=T.color} else
			if(T.color=="dark_green")  {areturn+="\x1b[0m\x1b[2m\x1b[32m";			breturn+="\u00a72";pc=T.color} else
			if(T.color=="dark_aqua")   {areturn+="\x1b[0m\x1b[2m\x1b[36m";			breturn+="\u00a73";pc=T.color} else
			if(T.color=="dark_red")    {areturn+="\x1b[0m\x1b[2m\x1b[31m";			breturn+="\u00a74";pc=T.color} else
			if(T.color=="dark_purple") {areturn+="\x1b[0m\x1b[2m\x1b[35m";			breturn+="\u00a75";pc=T.color} else
			if(T.color=="gold")        {areturn+="\x1b[0m\x1b[2m\x1b[33m";			breturn+="\u00a76";pc=T.color} else
			if(T.color=="gray")        {areturn+="\x1b[0m\x1b[2m\x1b[37m";			breturn+="\u00a77";pc=T.color} else
			if(T.color=="dark_gray")	{areturn+="\x1b[0m\x1b[1m\x1b[30m";			breturn+="\u00a78";pc=T.color} else
			if(T.color=="blue")		{areturn+="\x1b[0m\x1b[1m\x1b[34m";				breturn+="\u00a79";pc=T.color} else
			if(T.color=="green")		{areturn+="\x1b[0m\x1b[1m\x1b[32m";			breturn+="\u00a7a";pc=T.color} else
			if(T.color=="aqua")		{areturn+="\x1b[0m\x1b[1m\x1b[36m";				breturn+="\u00a7b";pc=T.color} else
			if(T.color=="red")			{areturn+="\x1b[0m\x1b[1m\x1b[31m";			breturn+="\u00a7c";pc=T.color} else
			if(T.color=="light_purple"){areturn+="\x1b[0m\x1b[1m\x1b[35m";			breturn+="\u00a7d";pc=T.color} else
			if(T.color=="yellow")		{areturn+="\x1b[0m\x1b[1m\x1b[33m";			breturn+="\u00a7e";pc=T.color} else
			if(T.color=="white")		{areturn+="\x1b[0m\x1b[1m\x1b[37m\u00a7f";			breturn+="\u00a7f";pc=T.color} else
		if(T.color=="reset")		{areturn+="\x1b[0m\x1b[1m\x1b[37m";			breturn+="\u00a7r";pc=T.color} else if(T.color.startsWith("#"))		{areturn+=T.color; breturn+=T.color;} }else if (!T.color && !go)
			{areturn+="\x1b[0m\x1b[1m\x1b[37m";} else
			
			if(true==(T.bold)){areturn+="\u00a7l";breturn+="\u00a7l"};
			if(true==(T.italic)){areturn+="\u00a7o";breturn+="\u00a7o"};
			if(true==(T.underlined)){areturn+="\u00a7n";breturn+="\u00a7n"};
			if(true==(T.strikethrough)){areturn+="\u00a7m";breturn+="\u00a7m"};
			if(true==(T.obfuscated)){areturn+="\u00a7k";breturn+="\u00a7k"};



	if(T.selector){
		areturn+=T.selector;
	} else if (T.translate){
		var x="";
		var y="";
		var z="";
		if(translates[T.translate]){
			x=translates[T.translate]
			y=translates[T.translate]
			z=translates[T.translate]
		}
		else {
			x=T.translate;return [x,x,x];
		};
		if (T.with){
			for(var iz=0; iz<=T.with.length-1; iz++){
			var coloraa="";
			var colorab="";
			if(T.color=="black")	    {coloraa="\x1b[0m\x1b[2m\x1b[30m\x1b[47m";	colorab+="\u00a70"} else
			if(T.color=="dark_blue")   {coloraa="\x1b[0m\x1b[2m\x1b[34m";			colorab+="\u00a71"} else
			if(T.color=="dark_green")  {coloraa="\x1b[0m\x1b[2m\x1b[32m";			colorab+="\u00a72"} else
			if(T.color=="dark_aqua")   {coloraa="\x1b[0m\x1b[2m\x1b[36m";			colorab+="\u00a73"} else
			if(T.color=="dark_red")    {coloraa="\x1b[0m\x1b[2m\x1b[31m";			colorab+="\u00a74"} else
			if(T.color=="dark_purple") {coloraa="\x1b[0m\x1b[2m\x1b[35m";			colorab+="\u00a75"} else
			if(T.color=="gold")        {coloraa="\x1b[0m\x1b[2m\x1b[33m";			colorab+="\u00a76"} else
			if(T.color=="gray")        {coloraa="\x1b[0m\x1b[2m\x1b[37m";			colorab+="\u00a77"} else
			if(T.color=="dark_gray")	{coloraa="\x1b[0m\x1b[1m\x1b[30m";			colorab+="\u00a78"} else
			if(T.color=="blue")		{coloraa="\x1b[0m\x1b[1m\x1b[34m";				colorab+="\u00a79"} else
			if(T.color=="green")		{coloraa="\x1b[0m\x1b[1m\x1b[32m";			colorab+="\u00a7a"} else
			if(T.color=="aqua")		{coloraa="\x1b[0m\x1b[1m\x1b[36m";				colorab+="\u00a7b"} else
			if(T.color=="red")			{coloraa="\x1b[0m\x1b[1m\x1b[31m";			colorab+="\u00a7c"} else
			if(T.color=="light_purple"){coloraa="\x1b[0m\x1b[1m\x1b[35m";			colorab+="\u00a7d"} else
			if(T.color=="yellow")		{coloraa="\x1b[0m\x1b[1m\x1b[33m";			colorab+="\u00a7e"} else
			if(T.color=="white")		{coloraa="\x1b[0m\x1b[1m\x1b[37m";			colorab+="\u00a7f"} else
			if(T.color=="reset")		{coloraa="\x1b[0m\x1b[1m\x1b[37m\u00a7r";	colorab+="\u00a7r"} else
			if(!T.color && !go){coloraa="\x1b[0m\x1b[1m\x1b[37m";}
			/**/
			var thing=exports.tth(T.with[iz],true)
				x=x.replace("%s",coloraa+thing[0]+coloraa)
				y=y.replace("%s",colorab+thing[1]+colorab)
				z=z.replace("%s",thing[2])
			}
		}
		areturn+= x;
		breturn+= y;
		creturn+= z;
		
	} else if (T.text != undefined){
		areturn+= T.text;
		breturn+= T.text;
		creturn+= T.text;
	} else {
		areturn+= ""+T;
		breturn+= ""+T;
		creturn+= ""+T;
	}

		if (T.extra){
			for(var iza=0; iza<=T.extra.length-1; iza++){
				areturn+= tth(T.extra[iza])[0]
				breturn+= tth(T.extra[iza])[1]
				creturn+= tth(T.extra[iza])[2]
			}
		}
	return [(areturn+""),(breturn+""),(creturn+"")];
	}
}
exports.tth=tth;
