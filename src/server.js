/**
 * The core server that runs on a Cloudflare worker.
 */

import { Router } from "itty-router";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import commands from "./commands/index.js";

export class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    super(jsonBody, init);
  }
}

const router = Router();

/**
 * A simple :wave: hello page to verify the worker is working.
 */
router.get("/", () => {
  return new Response(`👋 PUTO ALLAN`);
});

/**
 * Main route for all requests sent from Discord.  All incoming messages will
 * include a JSON payload described here:
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
router.post("/", async (request, env) => {
  const message = await request.json();
  const base_url = `https://discord.com/api/v10/applications/${env.TMA_DISCORD_APPLICATION_ID}/`;

  // The `PING` message is used during the initial webhook handshake, and is
  // required to configure the webhook in the developer portal.
  if (message.type === InteractionType.PING) {
    console.log("Handling Ping request");
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    });
  }
  /// The `APPLICATION_COMMAND` messages will be the user commands
  if (message.type === InteractionType.APPLICATION_COMMAND) {
    return commands[message.data.name.toLowerCase()](message, base_url);
  }

  console.error("Unsupported Type");
  return new JsonResponse({ error: "Unsupported Type" }, { status: 400 });
});
router.all("*", () => new Response("Not Found.", { status: 404 }));

export default {
  /**
   * Every request to a worker will start in the `fetch` method.
   * Verify the signature with the request, and dispatch to the router.
   * @param {*} request A Fetch Request object
   * @param {*} env A map of key/value pairs with env vars and secrets from the cloudflare env.
   * @returns
   */
  async fetch(request, env) {
    if (request.method === "POST") {
      // Using the incoming headers, verify this request actually came from discord.
      const signature = request.headers.get("x-signature-ed25519");
      const timestamp = request.headers.get("x-signature-timestamp");
      const body = await request.clone().arrayBuffer();
      const isValidRequest = verifyKey(
        body,
        signature,
        timestamp,
        env.TMA_DISCORD_PUBLIC_KEY
      );
      if (!isValidRequest) {
        console.error("Invalid Request");
        return new Response("Bad request signature.", { status: 401 });
      }
    }

    // Dispatch the request to the appropriate route
    return router.handle(request, env);
  },
};
