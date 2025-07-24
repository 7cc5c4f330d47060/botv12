# botv12

botv12 is a Minecraft bot originally designed for [Kaboom](https://kaboom.pw/) and its clones. It has many of the features that you would expect in a modern Kaboom bot:

- commands (obviously)
- a self care system
- a command core, to run commands quickly
- a hashing system, to enable trusted users to securely run certain commands in chat

It supports all Minecraft versions from 1.20.6 to 1.21.4 that are supported by node-minecraft-protocol. It may work on other versions, however, support will not be provided for them.

## How to install?

1. Install [Node.js](https://nodejs.org/) for your operating system.
2. Download the latest release, or alternatively, download the latest development version using `git clone https://codeberg.org/7cc5c4f330d47060/botv12`.
3. Extract the files if necessary.
4. Run `npm install` in the bot's directory. If it doesn't work, try using the Node.js command prompt, or adding Node.js to your PATH.
5. Copy the reference configuration (`settings_example.js` in the root) to `settings.js`, and adjust the settings to fit your needs. The secrets are also contained in this file as well.
6. (Optional) If you plan to use a database with the bot, set `dbEnabled` in `settings.js` to true and fill in the appropriate fields. Currently, MySQL and MariaDB are supported, with more to come.
7. Run ./launch.sh (macOS, Linux, FreeBSD) or ./launch.cmd (Windows). This will start a bot launcher, which will restart the bot when the process closes. Alternatively, you can run `node index.js` to start the bot only once (it will still rejoin when kicked). If it displays an error saying `node` is not a command, please make sure Node.js is on your PATH.

## License

This project is licensed under the MIT License. Using, modifying, and distributing this code is allowed, even for commercial purposes. If you make any copies of this software, you must link back to this repository. See the License file for the full terms and conditions.
