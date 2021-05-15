var translates=require("./en_us.json");
var _116=0;
if(true){_116=1}
const tth=function(T,go,NC){if(NC && !T.color){T.color=NC}
if(!_116){go=0}
if(T){
			var nc = false;
				var areturn="";
				var breturn="";
				var creturn="";
			if(T.color=="black")	    {areturn+="\x1b[0m\x1b[38;5;0m\x1b[47m";	breturn+="\u00a70";pc=T.color} else
			if(T.color=="dark_blue")    {areturn+="\x1b[0m\x1b[38;5;4m";			breturn+="\u00a71";pc=T.color} else
			if(T.color=="dark_green")   {areturn+="\x1b[0m\x1b[38;5;2m";			breturn+="\u00a72";pc=T.color} else
			if(T.color=="dark_aqua")    {areturn+="\x1b[0m\x1b[38;5;6m";			breturn+="\u00a73";pc=T.color} else
			if(T.color=="dark_red")     {areturn+="\x1b[0m\x1b[38;5;1m";			breturn+="\u00a74";pc=T.color} else
			if(T.color=="dark_purple")  {areturn+="\x1b[0m\x1b[38;5;5m";			breturn+="\u00a75";pc=T.color} else
			if(T.color=="gold")         {areturn+="\x1b[0m\x1b[38;5;3m";			breturn+="\u00a76";pc=T.color} else
			if(T.color=="gray")         {areturn+="\x1b[0m\x1b[38;5;7m";			breturn+="\u00a77";pc=T.color} else
			if(T.color=="dark_gray")   	{areturn+="\x1b[0m\x1b[38;5;8m";			breturn+="\u00a78";pc=T.color} else
			if(T.color=="blue")			{areturn+="\x1b[0m\x1b[38;5;12m";			breturn+="\u00a79";pc=T.color} else
			if(T.color=="green")		{areturn+="\x1b[0m\x1b[38;5;10m";			breturn+="\u00a7a";pc=T.color} else
			if(T.color=="aqua")			{areturn+="\x1b[0m\x1b[38;5;14m";			breturn+="\u00a7b";pc=T.color} else
			if(T.color=="red")			{areturn+="\x1b[0m\x1b[38;5;9m";			breturn+="\u00a7c";pc=T.color} else
			if(T.color=="light_purple") {areturn+="\x1b[0m\x1b[38;5;13m";			breturn+="\u00a7d";pc=T.color} else
			if(T.color=="yellow")		{areturn+="\x1b[0m\x1b[38;5;11m";			breturn+="\u00a7e";pc=T.color} else
			if(T.color=="white")		{areturn+="\x1b[0m\x1b[38;5;15m\u00a7f";	breturn+="\u00a7f";pc=T.color} else
			if(T.color=="reset" || (T.color===undefined && !NC))		{areturn+="\x1b[0m\x1b[38;5;15m";			breturn+="\u00a7r";pc=T.color} else if (!NC && go) { nc = true; }
			/**/
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
			var colorab="";//\x 1b[0 m\x 1b[34 m\x 1b[2 m
			if(NC){coloraa=NC[0];colorab=NC[1]} else
			if(T.color=="black")	    {coloraa+="\x1b[0m\x1b[38;5;0m\x1b[47m";	colorab+="\u00a70";pc=T.color} else
			if(T.color=="dark_blue")    {coloraa+="\x1b[0m\x1b[38;5;4m";			colorab+="\u00a71";pc=T.color} else
			if(T.color=="dark_green")   {coloraa+="\x1b[0m\x1b[38;5;2m";			colorab+="\u00a72";pc=T.color} else
			if(T.color=="dark_aqua")    {coloraa+="\x1b[0m\x1b[38;5;6m";			colorab+="\u00a73";pc=T.color} else
			if(T.color=="dark_red")     {coloraa+="\x1b[0m\x1b[38;5;1m";			colorab+="\u00a74";pc=T.color} else
			if(T.color=="dark_purple")  {coloraa+="\x1b[0m\x1b[38;5;5m";			colorab+="\u00a75";pc=T.color} else
			if(T.color=="gold")         {coloraa+="\x1b[0m\x1b[38;5;3m";			colorab+="\u00a76";pc=T.color} else
			if(T.color=="gray")         {coloraa+="\x1b[0m\x1b[38;5;7m";			colorab+="\u00a77";pc=T.color} else
			if(T.color=="dark_gray")   	{coloraa+="\x1b[0m\x1b[38;5;8m";			colorab+="\u00a78";pc=T.color} else
			if(T.color=="blue")			{coloraa+="\x1b[0m\x1b[38;5;12m";			colorab+="\u00a79";pc=T.color} else
			if(T.color=="green")		{coloraa+="\x1b[0m\x1b[38;5;10m";			colorab+="\u00a7a";pc=T.color} else
			if(T.color=="aqua")			{coloraa+="\x1b[0m\x1b[38;5;14m";			colorab+="\u00a7b";pc=T.color} else
			if(T.color=="red")			{coloraa+="\x1b[0m\x1b[38;5;9m";			colorab+="\u00a7c";pc=T.color} else
			if(T.color=="light_purple") {coloraa+="\x1b[0m\x1b[38;5;13m";			colorab+="\u00a7d";pc=T.color} else
			if(T.color=="yellow")		{coloraa+="\x1b[0m\x1b[38;5;11m";			colorab+="\u00a7e";pc=T.color} else
			if(T.color=="white")		{coloraa+="\x1b[0m\x1b[38;5;15m\u00a7f";	colorab+="\u00a7f";pc=T.color} else
			if(T.color=="reset" || (T.color===undefined && !NC))				{coloraa+="\x1b[0m\x1b[38;5;15m";			colorab+="\u00a7r";pc=T.color} 
			if(true==(T.bold)){coloraa+="\u00a7l";colorab+="\u00a7l"};
			if(true==(T.italic)){coloraa+="\u00a7o";colorab+="\u00a7o"};
			if(true==(T.underlined)){coloraa+="\u00a7n";colorab+="\u00a7n"};
			if(true==(T.strikethrough)){coloraa+="\u00a7m";colorab+="\u00a7m"};
			if(true==(T.obfuscated)){coloraa+="\u00a7k";colorab+="\u00a7k"};
                        T.color=T._color;
				var $return2;
                                $return2 = tth(T.with[iz],true,[coloraa,colorab]);
				x=x.replace("%s",$return2[0])
				y=y.replace("%s",$return2[1])
				z=z.replace("%s",$return2[2])
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
			var coloraa="";
			var colorab="";
                        if(NC){coloraa=NC[0];colorab=NC[1]} else
			if(T.color=="black")	    {coloraa+="\x1b[0m\x1b[38;5;0m\x1b[47m";	colorab+="\u00a70";pc=T.color} else
			if(T.color=="dark_blue")    {coloraa+="\x1b[0m\x1b[38;5;4m";			colorab+="\u00a71";pc=T.color} else
			if(T.color=="dark_green")   {coloraa+="\x1b[0m\x1b[38;5;2m";			colorab+="\u00a72";pc=T.color} else
			if(T.color=="dark_aqua")    {coloraa+="\x1b[0m\x1b[38;5;6m";			colorab+="\u00a73";pc=T.color} else
			if(T.color=="dark_red")     {coloraa+="\x1b[0m\x1b[38;5;1m";			colorab+="\u00a74";pc=T.color} else
			if(T.color=="dark_purple")  {coloraa+="\x1b[0m\x1b[38;5;5m";			colorab+="\u00a75";pc=T.color} else
			if(T.color=="gold")         {coloraa+="\x1b[0m\x1b[38;5;3m";			colorab+="\u00a76";pc=T.color} else
			if(T.color=="gray")         {coloraa+="\x1b[0m\x1b[38;5;7m";			colorab+="\u00a77";pc=T.color} else
			if(T.color=="dark_gray")   	{coloraa+="\x1b[0m\x1b[38;5;8m";			colorab+="\u00a78";pc=T.color} else
			if(T.color=="blue")			{coloraa+="\x1b[0m\x1b[38;5;12m";			colorab+="\u00a79";pc=T.color} else
			if(T.color=="green")		{coloraa+="\x1b[0m\x1b[38;5;10m";			colorab+="\u00a7a";pc=T.color} else
			if(T.color=="aqua")			{coloraa+="\x1b[0m\x1b[38;5;14m";			colorab+="\u00a7b";pc=T.color} else
			if(T.color=="red")			{coloraa+="\x1b[0m\x1b[38;5;9m";			colorab+="\u00a7c";pc=T.color} else
			if(T.color=="light_purple") {coloraa+="\x1b[0m\x1b[38;5;13m";			colorab+="\u00a7d";pc=T.color} else
			if(T.color=="yellow")		{coloraa+="\x1b[0m\x1b[38;5;11m";			colorab+="\u00a7e";pc=T.color} else
			if(T.color=="white")		{coloraa+="\x1b[0m\x1b[38;5;15m\u00a7f";	colorab+="\u00a7f";pc=T.color} else
			if(T.color=="reset")		{coloraa+="\x1b[0m\x1b[38;5;15m";colorab+="\u00a7r";pc=T.color} 
			if(true==(T.bold)){coloraa+="\u00a7l";colorab+="\u00a7l"};
			if(true==(T.italic)){coloraa+="\u00a7o";colorab+="\u00a7o"};
			if(true==(T.underlined)){coloraa+="\u00a7n";colorab+="\u00a7n"};
			if(true==(T.strikethrough)){coloraa+="\u00a7m";colorab+="\u00a7m"};
			if(true==(T.obfuscated)){coloraa+="\u00a7k";colorab+="\u00a7k"};
                        for(var iza=0; iza<=T.extra.length-1; iza++){
				try{
				var $return;
				//go++;
				//if(!go){
                                	$return = tth(T.extra[iza],go);
				//} else {
                                //	$return = tth(T.extra[iza],go,[coloraa,colorab]);
			//	}
				areturn+= coloraa+$return[0]
				breturn+= colorab+$return[1]
				creturn+= $return[2]}catch(e){}
			}
			areturn+=coloraa; breturn+=colorab;
		}
        if(NC && !T.color && go) { areturn += NC[0];breturn += NC[1];}
	return [(areturn+""),(breturn+""),(creturn+"")];
	}
}
exports.tth=tth;
