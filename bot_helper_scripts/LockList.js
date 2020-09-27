var fs = require("fs");
class LockList {
	static add(user){
		const data = fs.readFileSync('./locked.json', 'utf8');
		var locked=JSON.parse(data);
		for(var i in locked){
			if(locked[i]==true){
				return;
			}
		}
		locked[user]=true;
		try {
			const data = fs.writeFileSync('./locked.json', JSON.stringify(locked));
		} catch (err) {
			console.error(err)
		}
		return user.uuid;
	}
	static remove(user){
		const data = fs.readFileSync('./locked.json', 'utf8');
		var locked=JSON.parse(data);
		for(var i in locked){
			if(locked[i]==true && i == user){
				delete locked[i];
			}
		}
		try {
			const data = fs.writeFileSync('./locked.json', JSON.stringify(locked));
		} catch (err) {
			console.error(err)
		}
		return;
	}
	static list(){
		const data = fs.readFileSync('./locked.json', 'utf8');
		var locked=JSON.parse(data);
		var array;
		for(var i in locked){
			array.push(i);
		}
		return array;
	}
	static get(user){
		const data = fs.readFileSync('./locked.json', 'utf8');
		var locked=JSON.parse(data);
		for(var i in locked){
			if(locked[i]==true && i == user){
				return true;
			}
		}
		return false;
	}
	static reset(user){
		fs.unlink("./locked.json",function(){});
		try {
			const data = fs.writeFileSync('./locked.json', "{}");
		} catch (err) {
			console.error(err)
		}
		return true;
	}
}
module.exports=LockList;