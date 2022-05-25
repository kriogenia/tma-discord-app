/**
 * Reach out to the textart API and get the ascii art with the text.
 * @returns The decoded ASCII text.
 */
export const getAscii = async (text) => {
  const response = await fetch(
    `http://api.textart.io/figlet.json?text=Puto ${text}&encode=false`
  );
  const data = await response.json();
  return data.contents?.figlet;
};
