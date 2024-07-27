# botvX

## Что это такое?

botvX or UBot is a Minecraft bot for [Kaboom](https://kaboom.pw/) and its clones. It has many of the features that you would expect in a modern Kaboom bot:

- commands (obviously)
- a self care system
- a command core, to run commands quickly

## What does "botvX" mean?

"botvX" means "bot version 10". The v is used to signify that whatever after it is a version, as was done with previous versions (botv4, botv6, botv8, botv9), and the X is the Roman numeral for 10, since this is the 10th major version.

## What does "UBot" mean?

"UBot" just means "UBot", but is based on an older bot name "UnnamedBot". On some older versions, this bot did not have a proper name. "UnnamedBot" was introduced in version 4, which was shortened to just "UBot" around version 8.

## How to install?

1. Download the latest release, or alternatively, download the latest development version using <code>git clone https://10.0.0.151:3000/7cc5c4f330d47060/botvX/</code>.
2. Extract the files if necessary.
3. Adjust the settings to fit your needs. Do not forget to also create a secrets file.
4. Run ./launch.sh to start a bot launcher, which will reload the bot when the process closes.

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