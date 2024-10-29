/**
 * Reach out to the asciified API and get the ascii art with the text.
 * This function used to query the textart APIO but it's not longer working,
 * but we'll the name of the package to evade spreading changes.
 *
 * @returns The decoded ASCII text.
 */
export const getAscii = async (text) => {
  return fetch(
    `https://asciified.thelicato.io/api/v2/ascii?text=Puto ${text}`
  ).then((res) => res.text());
};
