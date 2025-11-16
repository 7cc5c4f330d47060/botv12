import version from "../version.js";
function handleHelp() {
  console.log(`${version.botName} version ${version.botVersion}`)
  console.log('\nOptions (can also be passed to launcher):')
  console.log('  --help\t\t\tdisplay help')
  console.log('  --debug\t\t\tlaunch with debugging features')
  console.log('  --disable-ws\t\t\tdisable WebSocket server')
  process.exit(1)
}
export default function ha(){
  const argv = process.argv;
  argv.splice(0,2)
  let max = argv.length
  for(let i = 0; i < max; i++){
    if (argv[0] == '--help') {
      handleHelp();
    } else if (argv[0] == '--debug') {
      debugMode = true // Global
    } else if (argv[0] == '--disable-ws') {
      clOptions.disableWsServer = true
    }
    argv.splice(0, 1)
  }
}