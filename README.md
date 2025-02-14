# botv12

botv12 is a Minecraft bot originally designed for [Kaboom](https://kaboom.pw/) and its clones. It has many of the features that you would expect in a modern Kaboom bot:

- commands (obviously)
- a self care system
- a command core, to run commands quickly
- a hashing system, to enable trusted users to securely run certain commands in chat

It supports all Minecraft versions from 1.18 to 1.21.3 that are supported by node-minecraft-protocol - newer versions have bugs on Kaboom servers. It may work on other versions, however, support will not be provided for them.

## How to install?

1. Install [Node.js](https://nodejs.org/) for your operating system.
2. Download the latest release, or alternatively, download the latest development version using `git clone https://code.chipmunk.land/7cc5c4f330d47060/botv12`.
3. Extract the files if necessary.
4. Run `npm install` in the bot's directory. If it doesn't work, try using the Node.js command prompt, or adding Node.js to your PATH.
5. Copy the reference configuration (`settings_example.js` in the root) to `settings.js`, and adjust the settings to fit your needs. The secrets are also contained in this file as well.
6. Run ./launch.sh (macOS, Linux, FreeBSD) or ./launch.cmd (Windows). This will start a bot launcher, which will restart the bot when the process closes. Alternatively, you can run `node index.js` to start the bot only once (it will still rejoin when kicked). If it displays an error saying `node` is not a command, please make sure Node.js is on your PATH.

## Command list


| Name | Usage | Description |
|-|-|-|
| about | [serverlist \| servers \| server] | About the bot. May also show system information or a list of connected servers. |
| test | | Debug command for the chat parser |


