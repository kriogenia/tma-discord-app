import runPutoAllan from "./putoallan";

// eslint-disable-next-line no-undef
const commands = new Map(); // JS Map is built-in

/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const PUTOALLAN_COMMAND = {
  name: "puto",
  description: "Prints a beautiful #PutoAllan",
};
commands[PUTOALLAN_COMMAND.name] = runPutoAllan;

export default commands;
