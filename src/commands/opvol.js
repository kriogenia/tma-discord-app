import { getOnePieceVolume } from "../api/fandom";
import { JsonResponse } from "../server";

const opVol = async (message, base_url) => {
  const volume = message.data.options[0].value;

  return getOnePieceVolume(volume)
    .then(({ title, cover, chapters }) => {
      const name = `Tomo ${volume} - ${title}`;
      const text = `**${name}**
	  Capítulos ${chapters}
	  siguiente día
	  Cover: ${cover}
		`;

      console.log(base_url); // fetch new channel

      return new JsonResponse({
        type: 4,
        data: {
          name: name,
          content: text,
          auto_archive_duration: 10080,
        },
      });
    })
    .catch(console.error);
};

export default opVol;
