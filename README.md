# owobot

owobot is a Minecraft bot originally designed for [Kaboom](https://kaboom.pw/) and its clones. It has many of the features that you would expect in a modern Kaboom bot:

- commands (obviously)
- a self care system
- a command core, to run commands quickly
- a hashing system, to enable trusted users to securely run certain commands in chat

It supports all Minecraft versions from 1.13 to 1.20.4 that are supported by node-minecraft-protocol.

If you are not sure if this code is safe to run, you can read through every line of code. You can also see the commit history by clicking on the (n) commits button, to make sure nobody has added any exploits or introduced vulnerabilities to the code.

If you find any exploits, security issues, etc in the code, please send me an issue or pull request and I will try to respond to it as soon as possible.

## How to install?

1. Install [Node.js](https://nodejs.org/) for your operating system.
2. Download the latest release, or alternatively, download the latest development version using `git clone https://code.chipmunk.land/7cc5c4f330d47060/owobot`.
3. Extract the files if necessary.
4. Run `npm install` in the bot's directory. If it doesn't work, try using the Node.js command prompt, or adding Node.js to your PATH.
5. Copy `settings_example.json` to `settings.json` and `secret_example.json` to `secret.json`, and adjust the settings to fit your needs. Change the example keys in secret.json as well. 
6. Run ./launch.sh (macOS, Linux, FreeBSD) or ./launch.cmd (Windows). This will start a bot launcher, which will restart the bot when the process closes. Alternatively, you can run `node index.js` to start the bot only once (it will still rejoin when kicked). If it displays an error saying `node` is not a command, please make sure Node.js is on your PATH.

## Command list

| Name | Usage | Description |
|-|-|-|
| about | [serverlist \| servers \| server] | About the bot. May also show system information or a list of connected servers. |
| cb | \<command\> | Run a command in a command block |
| cloop | add <rate> <command>, remove <index>, list, clear | Manage command loops |
| eval | \<code\> | Run JavaScript code (must run through console)|
| help | [cmd] | Shows command help |
| logoff | | Disconnect and reconnect the bot from a server |
| netmsg | \<message\> | Send a message to all servers the bot is connected to |
| refill | | Refill core |
| restart | | Restart bot, closes when launched directly |
| say | \<message\> | Sends a message to chat |
| settings | get, set <key> <value> | Set your user preferences |
| stop | | Close bot |
| template | | Used in development, does nothing |
| test | | Debug command for the chat parser |
| tpr | | Teleport to a random location |
| validate | | Check the hashing system |

