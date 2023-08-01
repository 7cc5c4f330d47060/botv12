//const index=require("../../index.js");
const { get } = require('node:https');
const write = require('../util/console.js');
const wikis = require('../util/wikis.json');
module.exports = {
	command_b:function(b,msg,sender,username){
		const args=msg.split(' ');
		args.shift();
		let wiki;
		if(args[0] == '--wiki'){
			args.shift();
			wiki = wikis[args.shift()];
			if (typeof wiki == 'undefined'){
				b.message(`Unknown wiki: ${wiki}`);
				return;
			}
		} else {
			wiki = wikis['en'];
		}
		const article=args.join("_").replace(/%/g, '%25').replace(/&/g, '%26').replace(/\?/g, '%3F').replace(/=/g, '%3D');
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
		module.exports.getArticle(wiki, article, content => {
			if (content.type == 'error'){
				b.tellraw(sender, JSON.stringify({
					'color': 'red',
					'text': content.content
				}))
			} else if (content.type == 'success'){
				b.tellraw(sender, JSON.stringify({
					'color': 'green',
					'text': content.content,
					clickEvent: {
						action: 'copy_to_clipboard',
						value: content.content
					},
					hoverEvent:{
						action: 'show_text',
						contents: {
							'translate': 'Click to copy text\n\nThis content is from a Wikimedia wiki, which most likely follows the Creative Commons Attribution-ShareAlike License 4.0 (%s)',
							with:[
								{
									'text':'https://creativecommons.org/licenses/by-sa/4.0/',
									'color':'aqua'
								}
							]
						}
					},
				}))
			}
		});
		//https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Big_cat&exintro=1&explaintext=1&format=json

	},
	command_c: function(msg) {
		const args=msg.split(' ');
		args.shift();
		let wiki;
		if(args[0] == '--wiki'){
			args.shift();
			wiki = wikis[args.shift()];
			if (typeof wiki == 'undefined'){
				b.message(`Unknown wiki: ${wiki}`);
				return;
			}
		} else {
			wiki = wikis['en'];
		}
		const article=args.join("_").replace(/%/g, '%25').replace(/&/g, '%26').replace(/\?/g, '%3F').replace(/=/g, '%3D').split('|')[0];
		//b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
		module.exports.getArticle(wiki, article, content => write(content.content));
	},
	getArticle: function(wiki,name,c) {
		get(`https://${wiki}?action=query&prop=extracts&titles=${name}&exintro=1&explaintext=1&format=json&redirects=1`, a => { //This API is only on some MediaWiki wikis, namely ones run by Wikimedia Foundation. (I will soon write a wikitext parser and try to get wikitext so it works on ALL MediaWiki wikis)
			a.on('data', z => {
				try{
					const json = JSON.parse(z.toString('UTF-8'));
					if(json.query.interwiki){
						c({type: 'error', content: `Interwiki is not supported. To use another wiki, do d"wiki --wiki <wiki name> ${name}.`})
						return;
					}
					for(const i in json.query.pages){
						if(typeof json.query.pages[i].missing == 'string'){
							c({type: 'error', content: 'Article not found'})
						} else if(typeof json.query.pages[i].special == 'string'){
							c({type: 'error', content: 'Special pages are not supported.'})
						} else if(typeof json.query.pages[i].extract == 'string'){
							const content = json.query.pages[i].extract.split('\n');
							for(const j in content){
								if (content[j].length != 0) {
									c({type: 'success', content:content[j]});
									//b.message(content[j]);
									break;
								} 
							}
						}
					}
					//query.pages.[Number].extract
					//b.message(z);
				} catch (e) {
					c({type: 'error', content: e})
				}
			})
		}).on('error', e => c({type: 'error', content: e}))
	},
	desc: 'Display part of an article from Wikipedia',
	usage: ' <article>',
	aliases: ['wiki']
};
