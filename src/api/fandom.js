/**
 * Reach out to the One Piece volume page and returns the wanted info.
 * @returns The volume data.
 */
export const getOnePieceVolume = async (volume) => {
  const response = await fetch(
    `https://onepiece.fandom.com/api.php?action=parse&page=Volume_${volume}&format=json`
  );
  const infoboxes = (await response.json()).parse.properties[0]["*"];
  const data = JSON.parse(infoboxes)[0];

  const title = data.data[0].data.value;
  const cover = data.data[1].data[0].url;
  const chapters = data.data[2].data.value;

  return {
    title: title,
    cover: cover,
    chapters: chapters,
  };
};
