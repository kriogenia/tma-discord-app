import { newMessage, newThread } from "../api/discord";

const dbVol = async (message, env) => {
  const volume = message.data.options[0].value;
  const prefix = volume.length === 1 ? "0" : "";
  const name = `Tomo ${volume}`;
  const pattern =
    /https:\/\/static\.wikia\.nocookie\.net\/dragonuniverse\/images\/[a-z0-9]+\/[a-z0-9]+\/DBKanzenbanvol[0-9]+\.png/g;

  return fetch(
    "https://dragonballuniverse.fandom.com/api.php?action=parse&format=json&page=List_of_Volumes/Kanzenban"
  )
    .then((res) => res.json())
    .then((body) => body.parse.text["*"])
    .then((html) =>
      html
        .match(pattern)
        .find((link) => link.match(`DBKanzenbanvol${prefix}${volume}.png`))
    )
    .then(
      (cover) => `**${name}**
	  📔 Cover: ${cover}

    ✰✰✰✰`
    )
    .then((text) => newMessage(message.channel_id, env, text))
    .then((response) => newThread(message.channel_id, response.id, env, name));
};

export default dbVol;
