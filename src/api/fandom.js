/**
 * Reach out to the One Piece volume page and returns the wanted info.
 * @returns The volume data.
 */
export const getOnePieceVolume = async (volume) => {
  const response = await fetch(
    `https://onepiece.fandom.com/api.php?action=parse&page=Volume_${volume}&format=json`
  );
  const data = await response.json().parse.properties[0]["*"].data;
  console.log(data);

  const title = data[0].data.value;
  const cover = data[1].data.value;
  const chapters = data[2].data.value;

  return {
    title: title,
    cover: cover,
    chapters: chapters,
  };
};
