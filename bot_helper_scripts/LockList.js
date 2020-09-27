var fs = require("fs");
class LockList {
	static add(user){
		const data = fs.readFileSync('../locked.json', 'utf8');
		fs.unlink("../locked.json");
		var locked=JSON.parse(data);
		for(var i in locked){
			if(i.uuid==user.uuid){
				return;
			}
		}
		locked[user.name]=user.uuid;
		try {
			const data = fs.writeFileSync('../locked.json', JSON.stringify(locked));
		} catch (err) {
			console.error(err)
		}
		return user.uuid;
	}
	static remove(user){
		const data = fs.readFileSync('../locked.json', 'utf8');
		fs.unlink("../locked.json");
		var locked=JSON.parse(data);
		for(var i in locked){
			if(i.uuid==user.uuid){
				delete locked[i];
			}
		}
		try {
			const data = fs.writeFileSync('../locked.json', JSON.stringify(locked));
		} catch (err) {
			console.error(err)
		}
		return;
	}
	static list(){
		const data = fs.readFileSync('../locked.json', 'utf8');
		var locked=JSON.parse(data);
		return locked;
	}
	static get(user){
		const data = fs.readFileSync('../locked.json', 'utf8');
		fs.unlink("../locked.json");
		var locked=JSON.parse(data);
		for(var i in locked){
			if(i.uuid==user.uuid){
				return true;
			}
		}
		return false;
	}
	static reset(user){
		fs.unlink("../locked.json");
		try {
			const data = fs.writeFileSync('../locked.json', "{}"));
		} catch (err) {
			console.error(err)
		}
		return true;
	}
}