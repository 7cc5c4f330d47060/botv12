module.exports = function(code){
	if(code=='r'){
		return {
			color:'white',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='l'){
		return {bold:true};
	} else if(code=='m'){
		return {strikethrough:true};
	} else if(code=='n'){
		return {underlined:true};
	} else if(code=='o'){
		return {italic:true};
	} else if(code=='1'){
		return {
			color:'dark_blue',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='2'){
		return {
			color:'dark_green',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='3'){
		return {
			color:'dark_aqua',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='4'){
		return {
			color:'dark_red',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='5'){
		return {
			color:'dark_purple',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='6'){
		return {
			color:'gold',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='7'){
		return {
			color:'gray',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='8'){
		return {
			color:'dark_gray',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='9'){
		return {
			color:'blue',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='a'){
		return {
			color:'green',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='b'){
		return {
			color:'aqua',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='c'){
		return {
			color:'red',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='d'){
		return {
			color:'light_purple',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='e'){
		return {
			color:'yellow',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code=='f'){
		return {
			color:'white',
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	} else if(code.startsWith('#')){
		return {
			color:code,
			bold:false,
			italic:false,
			underlined:false,
			strikethrough:false,
			obfuscated:false
		};
	}
};