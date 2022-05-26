import { getOnePieceVolume } from "../api/fandom";
import { JsonResponse } from "../server";

const opVol = async (message, env) => {
  const volume = message.data.options[0].value;
  let name = "";

  return getOnePieceVolume(volume)
    .then(({ title, cover, chapters }) => {
      /* Post message */
      name = `Tomo ${volume} - ${title}`;
      const text = `**${name}**
	  Capítulos ${chapters}
	  siguiente día
	  Cover: ${cover}
	  `;

      const url = `https://discord.com/api/v10/channels/${message.channel_id}/messages`;
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${env.TMA_DISCORD_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({
          content: text,
        }),
      });
    })
    .then((response) => response.json())
    .then((response) => {
      /* Convert to thread */
      const url = `https://discord.com/api/v10/channels/${message.channel_id}/messages/${response.id}/threads`;

      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${env.TMA_DISCORD_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({
          name: name,
          auto_archive_duration: 10080,
        }),
      });
    })
    .then((response) => {
      /* Respond */
      return new JsonResponse({
        type: 4,
        data: {
          content: `${"```"}${response.text()}${"```"}`,
          flags: 64,
        },
      });
    })
    .catch(console.error);
};

export default opVol;
