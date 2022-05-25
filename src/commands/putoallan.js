import { getAscii } from "../api/textart";
import { JsonResponse } from "../server";

const CODE = "```";

const putoAllan = (message) => {
  const author = message.member.user.id;
  const invoked = "Allan";
  return getAscii(invoked)
    .then((art) => {
      const text =
        art ??
        "No hay dibujito porque os estais pasando, relajad un poco #PutoAllan";

      return new JsonResponse({
        type: 4,
        data: {
          content: `<@${author}> ha invocado un rico: Puto ${invoked}\n${CODE}${text}${CODE}`,
        },
      });
    })
    .catch(console.error);
};

export default putoAllan;
