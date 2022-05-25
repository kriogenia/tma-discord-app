import { getOnePieceVolume } from "../api/fandom";
import { JsonResponse } from "../server";

const opVol = async (message) => {
  const volume = message.data.options[0].value;

  return getOnePieceVolume(volume)
    .then(({ title, image, chapters }) => {
      return new JsonResponse({
        type: 4,
        data: {
          content: `${title} - ${image} - ${chapters}`,
        },
      });
    })
    .catch(console.error);
};

export default opVol;
