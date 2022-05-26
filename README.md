# TMA's Cloudflare Discord app

This is a bot that brings some functionality to our Discord server, hosted on Cloudflare workers. Cloudflare Workers are a convenient way to host Discord bots due to the free tier, simple development model, and automatically managed environment (no VMs!).

## Resources used

- [Discord Interactions API](https://discord.com/developers/docs/interactions/receiving-and-responding)
- [Cloudflare Workers](https://workers.cloudflare.com/) for hosting

## Commands

- `/opvol {volume}` Generates a message starting a new thread for the specified One Piece volume in the current channel.
- `/puto {string?}` Prints an ASCII "Puto {string}" in the screen. If not string is specified, Puto Allan will be printed.

## Project structure

Below is a basic overview of the project structure:

```
├── .github/workflows/ci.yaml -> Github Action configuration
├── src
│   ├── api           	  	  -> Code to integrate different APIs
│   │   ├── ...	      
│   ├── commands           	  -> JSON payloads for commands
│   │   ├── index.js	  	  -> Map of the commands functionality 
│   │   ├── declaration.js	  -> Declaration for command creation
│   │   ├── ...
│   ├── register.js           -> Sets up commands with the Discord API
│   ├── server.js             -> Discord app logic and routing
├── test
|   ├── ...               	  -> Tests for app (it should have some, but, you know)
├── wrangler.toml             -> Configuration for Cloudflare workers
├── renovate.json             -> Configuration for repo automation
├── package.json
├── README.md				  -> YOU ARE HERE
├── ...
```

## Local set-up

> TODO

In order to make the development without affecting the production bot a new test bot should be created and a development environment should be set-up.

### Testing bot

Before starting, you'll need a [Discord app](https://discord.com/developers/applications) with the following permissions:
- `bot` with the `Send Messages`, `Create Publics Threads` and `Use Slash Command` permissions
- `applications.commands` scope

> ⚙️ Permissions can be configured by clicking on the `OAuth2` tab and using the `URL Generator`. After a URL is generated, you can install the app by pasting that URL into your browser and following the installation flow.

> It's recommended to test the bot in your own testing server. Once you create the link to authenticate the bot, navigate to it and add the bot to your server.

## Creating your Cloudflare worker

Next, you'll need to create a Cloudflare Workers
- Visit the [Cloudflare dashboard](https://dash.cloudflare.com/)
- Click on the `Workers` tab, and create a new service using the same name as your Discord bot
- Make sure to [install the Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/install-update/) and set it up.
- Add a new environment in the `wrangler.toml` and override the `account_id` field in their with your own Cloudflare id.
- Copy the `dev` command in the `package.json` and make a new one with your environment name to run the application with your data.

### Storing secrets

> 💡 More information about generating and fetching credentials can be found [in the tutorial](https://discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers#creating-an-app-on-discord)

The production environment is already set up with the bot secrets but you'll need to set-up your own secrets in your dev environment.

```
$ wrangler secret put DISCORD_TOKEN --env <your-env>
$ wrangler secret put DISCORD_PUBLIC_KEY --env <your-env>
$ wrangler secret put DISCORD_APPLICATION_ID --env <your-env>
$ wrangler secret put DISCORD_TEST_GUILD_ID --env <your-env>
```

### Running locally

> :bangbang: This depends on the beta version of the `wrangler` package, which better supports ESM on Cloudflare Workers.

First fork the project and clone it. Then navigate to its directory and install dependencies:
```
npm install
```

> ⚙️ The dependencies in this project require at least v16 of [Node.js](https://nodejs.org/en/)

### Register commands

The commands must be registered to add them to Discord, this is made with the `register.js` script.
You can install the commands globally or on your own server.
The following command only needs to be run once:

```
$ DISCORD_TOKEN=<your-token> DISCORD_APPLICATION_ID=<your-app-id> node src/register.js
```

### Run app

Now you should be ready to start your server:

```
$ npm run <your-command>
```

### Setting up ngrok

When a user types a slash command, Discord will send an HTTP request to a given endpoint. During local development this can be a little challenging, so we're going to use a tool called `ngrok` to create an HTTP tunnel.

```
$ npm run ngrok
```

![forwarding](https://user-images.githubusercontent.com/534619/157511497-19c8cef7-c349-40ec-a9d3-4bc0147909b0.png)

This is going to bounce requests off of an external endpoint, and foward them to your machine. Copy the HTTPS link provided by the tool. It should look something like `https://8098-24-22-245-250.ngrok.io`. Now head back to the Discord Developer Dashboard, and update the "Interactions Endpoint URL" for your bot:

![interactions-endpoint](https://user-images.githubusercontent.com/534619/157510959-6cf0327a-052a-432c-855b-c662824f15ce.png)

This is the process we'll use for local testing and development. When you've published your bot to Cloudflare, you will _want to update this field to use your Cloudflare Worker URL._

## Adding a command

In order to add a new command the first step is to declare in the `src/commands/declaration.js` file following the [JSON structure of the Developer portal](https://discord.com/developers/docs/interactions/application-commands#slash-commands).

After this you'll need to run the `register.js` script again to add the command to the Discord API so it can be used in the app. Once you can invoke it locally you can start to add functionality.

To add the functionality create a new function in the `commands` folder accepting the message received from the user and the env object if you need it (it's needed to perform REST actions via fetch). Once the function is read it export it as default and add it the `commands/index.js`' Map like the other.

After this the command should work. Once it's ready and tested, push the code, make a PR and it will be reviewed and merge. Specify in the PR that a new command has been added so the register script can be used after the merge to add the new commmand to the production bot.

## Deploying app

This repository is set up to automatically deploy to Cloudflare Workers when new changes land on the `main` branch. To deploy manually, run `npm run publish`, which uses the `wrangler publish` command under the hood.

### #PutoAllan