import {
  DRAGON_BALL_COMMAND,
  ONE_PIECE_COMMAND,
  PUTOALLAN_COMMAND,
} from "./declaration";
import runDBVolume from "./dbvol";
import runOnePieceVolume from "./opvol";
import runPutoAllan from "./putoallan";

// eslint-disable-next-line no-undef
const commands = new Map(); // JS Map is built-in

commands[DRAGON_BALL_COMMAND.name] = runDBVolume;
commands[ONE_PIECE_COMMAND.name] = runOnePieceVolume;
commands[PUTOALLAN_COMMAND.name] = runPutoAllan;

export default commands;
