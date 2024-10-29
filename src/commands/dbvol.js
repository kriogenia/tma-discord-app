import { newMessage, newThread } from "../api/discord";

const dbVol = async (message, env) => {
  const volume = message.data.options[0].value;
  const prefix = volume.length === 1 ? "0" : "";
  const cover = `https://static.wikia.nocookie.net/dragonuniverse/images/c/cb/DBKanzenbanvol${prefix}${volume}.png`;

  const name = `Tomo ${volume}`;
  const text = `**${name}**
	  📔 Cover: ${cover}

    ✰✰✰✰`;

  return newMessage(message.channel_id, env, text).then((response) =>
    newThread(message.channel_id, response.id, env, name)
  );
};

export default dbVol;
