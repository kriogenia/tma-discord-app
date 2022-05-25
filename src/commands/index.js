import runPutoAllan from "./putoallan";
import { PUTOALLAN_COMMAND } from "./declaration";

// eslint-disable-next-line no-undef
const commands = new Map(); // JS Map is built-in

commands[PUTOALLAN_COMMAND.name] = runPutoAllan;

export default commands;
