import { getAscii } from "../api/textart";
import { JsonResponse } from "../server";

const CODE = "```";

const run = (message) => {
  const author = message.member.user.id;
  const invoked = "Allan";
  return getAscii(invoked)
    .then(
      (art) =>
        new JsonResponse({
          type: 4,
          data: {
            content: `<@${author}> ha invocado un rico: Puto ${invoked}\n${CODE}${art}${CODE}`,
          },
        })
    )
    .catch(console.error);
};

export default run;
