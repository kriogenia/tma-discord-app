import runPutoAllan from "./putoallan";

// eslint-disable-next-line no-undef
const commands = new Map(); // JS Map is built-in

/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const AWW_COMMAND = {
  name: "awwww",
  description: "Drop some cuteness on this channel.",
};
commands[AWW_COMMAND.name] = () => console.error("Not implemenented");

export const INVITE_COMMAND = {
  name: "invite",
  description: "Get an invite link to add the bot to your server",
};
commands[INVITE_COMMAND.name] = () => console.error("Not implemenented");

export const PUTOALLAN_COMMAND = {
  name: "puto",
  description: "Prints a beautiful #PutoAllan",
};
commands[PUTOALLAN_COMMAND.name] = runPutoAllan;

export default commands;
