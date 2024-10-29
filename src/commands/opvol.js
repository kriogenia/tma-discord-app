import { newMessage, newThread } from "../api/discord";
import { getOnePieceVolume } from "../api/fandom";
import { formatDate, nextSunday } from "../util/index";

const opVol = async (message, env) => {
  const volume = message.data.options[0].value;
  let name = "";

  return getOnePieceVolume(volume)
    .then(({ title, cover, chapters }) => {
      /* Post message */
      name = `Tomo ${volume} - ${title}`;
      return `**${name}**
	  📖 Capítulos ${chapters}
	  📅 Fecha: ${formatDate(nextSunday())}
	  📔 Cover: ${cover}
	  
	  🏴‍☠️🏴‍☠️🏴‍☠️
	  `;
    })
    .then((content) => newMessage(message.channel_id, env, content))
    .then((response) => newThread(message.channel_id, response.id, env, name));
};

export default opVol;
