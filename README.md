# botvX

## What is it?

botvX or UBot is a Minecraft bot for [Kaboom](https://kaboom.pw/) and its clones. It has many of the features that you would expect in a modern Kaboom bot:

- commands (obviously)
- a self care system
- a command core, to run commands quickly
- a hashing system, to enable trusted users to securely run certain commands in chat

## What does "botvX" mean?

"botvX" means "bot version 10". The v is used to signify that whatever after it is a version, as was done with previous versions (botv4, botv6, botv8, botv9), and the X is the Roman numeral for 10, since this is the 10th major version.

## What does "UBot" mean?

"UBot" just means "UBot", but is based on an older bot name "UnnamedBot". On some older versions, this bot did not have a proper name. "UnnamedBot" was introduced in version 4, which was shortened to just "UBot" around version 8.

## How to install?

1. Install [Node.js](https://nodejs.org/) for your operating system.
2. Download the latest release, or alternatively, download the latest development version using <code>git clone https://code.chipmunk.land/7cc5c4f330d47060/botvX/</code>.
3. Extract the files if necessary.
4. Copy <code>settings_example.json</code> to <code>settings.json</code> , and adjust the settings to fit your needs. Do not forget to also create a secrets file. An example secrets file is provided as <code>secret_example.json</code>. Do not forget, if you use the secrets template, to change the keys (the ones in there are public after all!).
5. Run ./launch.sh (macOS, Linux, FreeBSD) or ./launch.cmd (Windows) to start a bot launcher, which will reload the bot when the process closes. If it displays an error saying Node is not a command, please make sure Node.js is on your PATH.

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
| verify | | Check the hashing system |
