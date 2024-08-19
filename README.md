# botvX

## What is it?

botvX is a Minecraft bot originally designed for [Kaboom](https://kaboom.pw/) and its clones. It has many of the features that you would expect in a modern Kaboom bot:

- commands (obviously)
- a self care system
- a command core, to run commands quickly
- a hashing system, to enable trusted users to securely run certain commands in chat

This is a fork from commit 4efbf43edb with partial support of using ECMAScript modules (import/export) rather than CommonJS modules (require/module.exports). Only some plugins have been converted, and a lot of functionality is missing. Due to differences in how Node.js operates in these two modes, this version is API incompatible with the regular version, and has version number 11. This will most likely never become complete, as CommonJS works well enough to continue using, and it supports more features, such as automatic plugin detection.

## How to install?

1. Install [Node.js](https://nodejs.org/) for your operating system.
2. Download the latest release, or alternatively, download the latest development version using <code>git clone https://code.chipmunk.land/7cc5c4f330d47060/botvX/</code>.
3. Extract the files if necessary.
4. Run <code>npm install</code> in the bot's directory. If it doesn't work, try using the Node.js command prompt, or adding Node.js to your PATH.
5. Copy <code>settings_example.json</code> to <code>settings.json</code> , and adjust the settings to fit your needs. Do not forget to also create a secrets file. An example secrets file is provided as <code>secret_example.json</code>. Do not forget, if you use the secrets template, to change the keys (the ones in there are public after all!).
6. Run ./launch.sh (macOS, Linux, FreeBSD) or ./launch.cmd (Windows) to start a bot launcher, which will reload the bot when the process closes. Alternatively, you can run <code>node index.js</code> to start the bot only once (it will still rejoin when kicked). If it displays an error saying Node is not a command, please make sure Node.js is on your PATH.

## Command list

| Name | Usage | Description |
|-|-|-|
| about | | About the bot |
| cb | \<command\> | Run a command in a command block |
| cloop | add <rate> <command>, remove <index>, list, clear | Manage command loops |
| eval | \<code\> | Run JavaScript code (must run through console)|
| help | [cmd] | Shows command help |
| logoff | | Disconnect and reconnect the bot from a server |
| netmsg | \<message\> | Send a message to all servers the bot is connected to |
| refill | | Refill core |
| say | \<message\> | Sends a message to chat |
| serverinfo | | Get system/bot info, similar to Kaboom's <code>serverinfo</code> command |
| stop | | Restart bot |
| template | | Used in development, does nothing |
| tpr | | Teleport to a random location |
| verify | | Check the hashing system |

