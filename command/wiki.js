// const index=require("../../index.js");
// const { get } = require('node:https')
const get = function () {
  return //Stub
}
const settings = require('../settings.json')
const write = require('../util/console.js')
const rl = require('../util/testing.js')
const wikis = require('../util/wikis.json')
const httpoptions = {
  headers: {
    'User-Agent': `${settings.name}/${settings.version} (https://code.chipmunk.land/75a0985a1353b0c1/babybot9/wiki) UBotWikipediaCommand/${settings.version} (https://code.chipmunk.land/75a0985a1353b0c1/babybot9/wiki/Wikipedia-command)`
  }
}
module.exports = {
  command_b: function (b, msg, sender, username) {
    const args = msg.split(' ')
    args.shift()
    let wiki
    if (args[0] == '--wiki') {
      args.shift()
      wiki = wikis[args.shift()]
      if (typeof wiki === 'undefined') {
        b.message(`Unknown wiki: ${wiki}`)
        return
      }
    } else {
      wiki = wikis.en
    }
    const article = args.join('_').replace(/%/g, '%25').replace(/&/g, '%26').replace(/\?/g, '%3F').replace(/=/g, '%3D').split('|')[0]
    // b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
    if (!rl.check('wikipedia_http')) {
      b.send('The command can only be run every 7 seconds (across all servers), please try again shortly.')
    } else {
      rl.start('wikipedia_http', 7000)
      module.exports.getArticle(wiki, article, content => {
        if (content.type == 'error') {
          b.tellraw(sender, JSON.stringify({
            color: 'red',
            text: content.content
          }))
        } else if (content.type == 'error_2') {
          b.tellraw(sender, JSON.stringify({
            color: 'aqua',
            text: content.content
          }))
        } else if (content.type == 'success') {
          b.tellraw(sender, JSON.stringify({
            color: 'green',
            text: content.content,
            clickEvent: {
              action: 'open_url',
              value: `https://${wiki.replace(/api\.php/,"index.php")}?title=${article}`
            },
            hoverEvent: {
              action: 'show_text',
              contents: {
                translate: 'Click to copy text\n\nThis content is from a Wikimedia wiki, which most likely follows the Creative Commons Attribution-ShareAlike License 4.0 (%s)',
                with: [
                  {
                    text: 'https://creativecommons.org/licenses/by-sa/4.0/',
                    color: 'aqua'
                  }
                ]
              }
            }
          }))
        } else if (content.type == 'success') {
          b.tellraw(sender, JSON.stringify({
            color: 'aqua',
            text: content.content,
            clickEvent: {
              action: 'open_url',
              value: `https://${wiki.replace(/api\.php/,"index.php")}?title=${article}`
            }
          }))
        }
      })
    }
    // https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Big_cat&exintro=1&explaintext=1&format=json
  },
  command_c: function (msg) {
    const args = msg.split(' ')
    args.shift()
    let wiki
    if (args[0] == '--wiki') {
      args.shift()
      wiki = wikis[args.shift()]
      if (typeof wiki === 'undefined') {
        b.message(`Unknown wiki: ${wiki}`)
        return
      }
    } else {
      wiki = wikis.en
    }
    const article = args.join('_').replace(/%/g, '%25').replace(/&/g, '%26').replace(/\?/g, '%3F').replace(/=/g, '%3D').split('|')[0]
    // b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
    if (!rl.check('wikipedia_http')) {
      write('The command can only be run every 7 seconds (across all servers & console), please try again shortly.')
    } else {
      rl.start('wikipedia_http', 7000)
      module.exports.getArticle(wiki, article, content => write(content.content))
    }
  },
  getArticle: function (wiki, name, c) {
    c({ type: 'error_2', content: `This command has been disabled for now due to licensing requirements. For now, you can read this page at https://${wiki.replace(/api\.php/,"index.php")}?title=${name}.`})
    return //Please do not remove this return statement as it will fetch the pages from Wikimedia.
    get(`https://${wiki}?action=query&prop=extracts&titles=${name}&exintro=1&explaintext=1&format=json&redirects=1&maxage=7200&smaxage=7200`, httpoptions, a => { 
      let b = ''
      a.on('data', z => {
        b += z.toString('UTF-8')
      })
      a.on('close', z => {
        try {
          const json = JSON.parse(b)
          if (json.query.interwiki) {
            c({ type: 'error', content: `Interwiki is not supported. To use another wiki, do d"wiki --wiki <wiki name> ${name}.` })
            return
          }
          for (const i in json.query.pages) {
            if (typeof json.query.pages[i].missing === 'string') {
              c({ type: 'error', content: 'Article not found' })
            } else if (typeof json.query.pages[i].special === 'string') {
              c({ type: 'error', content: 'Special pages are not supported.' })
            } else if (typeof json.query.pages[i].extract === 'string') {
              const content = json.query.pages[i].extract.split('\n')
              for (const j in content) {
                if (content[j].length != 0) {
                  c({ type: 'success', content: content[j] })
                  // b.message(content[j]);
                  break
                }
              }
            }
          }
          // query.pages.[Number].extract
          // b.message(z);
        } catch (e) {
          c({ type: 'error', content: e })
        }
      })
    }).on('error', e => c({ type: 'error', content: e }))
  },
  desc: '\xa7oCommand disabled',
  old_desc: 'Display part of an article from a Wikimedia Foundation wiki (defaults to English Wikipedia)',
  usage: ' <article>',
  aliases: ['wikipedia']
}
