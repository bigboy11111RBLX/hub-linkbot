# Hub Whitelist Bot (jdwoj5)
This whitelisting bot is made for ROBLOX Tech Groups to use in their Discord Servers. It will help deliver products through web requests and store data of users.

## Installation
To install this Discord Bot, you will need to do the following:

1. Obtain a VPS, or a computer to host this locally. (Please note that Heroku will not work, as we are writing files that should be persistant, and Heroku rebuilds around every 24 hours.)
2. Ensure it has the [Node.js](https://nodejs.org/en/) engine installed.
3. Clone this repository with `git clone https://github.com/jdwoj5/hub-linkbot`
4. Create a [Discord Application](https://discord.com/developers/applications) with a Bot created in the Bot Section.
5. Create a file named `.env`, which is where we will store crucial information. 
    - Paste the following into your `.env` file:
    ```env
    # BOT CONFIGURATION
    BOT_EMBEDCOLOR=
    BOT_TOKEN=
    BOT_PREFIX=
    BOT_PRIMARYGUILD=

    # WEB CONFIGURATION
    HUB_ACCESSPORT=

    # KEYS
    HUB_APIKEY=
    UUID_NAMESPACE=
    ```
    - Input your `.env` information as shown below:
        - `BOT_EMBEDCOLOR` Set this to the color [(in decimal value)](https://spycolor.com/) you wish your embeds to have. (Recommended: `2303786`)
        - `BOT_TOKEN` Set this to your bot token as found in the Bot section of your [Discord Application](https://discord.com/developers/applications).
        - `BOT_PREFIX` Set this to your preferred bot prefix. (Recommended: `!`)
        - `BOT_PRIMARYGUILD` Set this to the ID of the Server you would like to use the bot in.
        - `HUB_ACCESSPORT` Set this to a random four digit integer. This will be used later when scripting your Hub to work with this bot.
        - `HUB_APIKEY` Set this to a [random alphanumeric string](https://onlinerandomtools.com/generate-random-string?length=32&count=1&predefined-charset=alphamixnum&custom-charset=). This will be used for system security. Even if your IP and Port are leaked, you need to have this changable API key in order to back you up in order to prevent unfixable security issues.
        - `UUID_NAMESPACE` Set this to the UUID generated [here](https://www.uuidgenerator.net/). This will be used to encrypt your user's database index UUIDs and make them truly randomized.

## Running the Bot
To initialize the bot, run the following commands in the cloned directory to set up the bot:
1. `npm update`
2. `npm install`

To start the bot, run the following command:
- `node server.js`

The bot should never need to come offline, as the `!restart` command restarts the whole process and updates the bot's code on it's own. Most errors will also be caught with this command, prompting you to update the code and restart the bot yourself.

## Connecting to your Hub
There are many ways to trigger functions in the Discord Bot from HTTP requests, but the most important thing to do is to write down the IP at which you are running this Discord Bot and write down the `HUB_ACCESSPORT` that you put in the `.env` file before coding with this hub. This information will be referenced multiple times from the scripts in your ROBLOX Product Hub.

