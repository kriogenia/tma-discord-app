/**
 * Reach out to the textart API and get the ascii art with the text.
 * @returns The decoded ASCII text.
 */
export async function getAscii(text) {
  const response = await fetch(
    `http://api.textart.io/figlet.json?text=Puto ${text}&encode=false`
  );
  const data = await response.json();
  if (!data.contents) {
    throw Error("Passed limit. No contents received.");
  }
  return data.contents.figlet;
}
