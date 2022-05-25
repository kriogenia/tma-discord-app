import runPutoAllan from "./putoallan";
import { ONE_PIECE_COMMAND, PUTOALLAN_COMMAND } from "./declaration";
import runOnePieceVolume from "./opvol";

// eslint-disable-next-line no-undef
const commands = new Map(); // JS Map is built-in

commands[ONE_PIECE_COMMAND.name] = runOnePieceVolume;
commands[PUTOALLAN_COMMAND.name] = runPutoAllan;

export default commands;
