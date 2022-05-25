# TMA's Cloudflare Discord app

This is a bot that brings some functionality to our Discord server, hosted on Cloudflare workers. Cloudflare Workers are a convenient way to host Discord bots due to the free tier, simple development model, and automatically managed environment (no VMs!).

## Resources used

- [Discord Interactions API](https://discord.com/developers/docs/interactions/receiving-and-responding)
- [Cloudflare Workers](https://workers.cloudflare.com/) for hosting

## Commands

- `\puto` Prints an ASCII "Puto Allan" in the screen.

---

## Project structure

Below is a basic overview of the project structure:

```
├── .github/workflows/ci.yaml -> Github Action configuration
├── src
│   ├── api           	  	  -> Code to integrate different APIs
│   │   ├── textart.js	      
│   ├── commands           	  -> JSON payloads for commands
│   │   ├── putoallan.js	  -> Command to print ASCII PutoAllan
│   ├── register.js           -> Sets up commands with the Discord API
│   ├── server.js             -> Discord app logic and routing
├── test
|   ├── test.js               -> Tests for app (it should have some, but, you know)
├── wrangler.toml             -> Configuration for Cloudflare workers
├── package.json
├── README.md
├── renovate.json             -> Configuration for repo automation
├── .eslintrc.json
├── .prettierignore
├── .prettierrc.json
└── .gitignore
```

## Configuring project

Before starting, you'll need a [Discord app](https://discord.com/developers/applications) with the following permissions:
- `bot` with the `Send Messages` and `Use Slash Command` permissions
- `applications.commands` scope

> ⚙️ Permissions can be configured by clicking on the `OAuth2` tab and using the `URL Generator`. After a URL is generated, you can install the app by pasting that URL into your browser and following the installation flow.

## Creating your Cloudflare worker

Next, you'll need to create a Cloudflare Workers
- Visit the [Cloudflare dashboard](https://dash.cloudflare.com/)
- Click on the `Workers` tab, and create a new service using the same name as your Discord bot
- Make sure to [install the Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/install-update/) and set it up.

### Storing secrets

> 💡 More information about generating and fetching credentials can be found [in the tutorial](TODO)

The production service needs access to credentials from your app:

```
$ wrangler secret put DISCORD_TOKEN
$ wrangler secret put DISCORD_PUBLIC_KEY
$ wrangler secret put DISCORD_APPLICATION_ID
$ wrangler secret put DISCORD_TEST_GUILD_ID
```

## Running locally

> :bangbang: This depends on the beta version of the `wrangler` package, which better supports ESM on Cloudflare Workers.

First clone the project:
```
git clone https://github.com/discord/cloudflare-sample-app.git
```

Then navigate to its directory and install dependencies:
```
cd cloudflare-sample-app
npm install
```

> ⚙️ The dependencies in this project require at least v16 of [Node.js](https://nodejs.org/en/)

### Register commands

The following command only needs to be run once:

```
$ DISCORD_TOKEN=<your-token> DISCORD_APPLICATION_ID=<your-app-id> node src/register.js
```

### Run app

Now you should be ready to start your server:

```
$ npm run dev
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

## Deploying app

This repository is set up to automatically deploy to Cloudflare Workers when new changes land on the `main` branch. To deploy manually, run `npm run publish`, which uses the `wrangler publish` command under the hood.

### #PutoAllan