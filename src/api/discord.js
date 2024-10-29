import { JsonResponse } from "../server";

export const newMessage = async (channel_id, env, content) => {
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages`;
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.TMA_DISCORD_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      content: content,
    }),
  }).then((res) => res.json());
};

export const newThread = async (channel_id, message_id, env, name) => {
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages/${message_id}/threads`;

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${env.TMA_DISCORD_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      name: name,
      auto_archive_duration: 10080,
    }),
  })
    .then((response) => response.text())
    .then((response) => {
      return new JsonResponse({
        type: 4,
        data: {
          content: `${"```"}${response}${"```"}`,
          flags: 64,
        },
      });
    })
    .catch((error) => {
      console.error(error);
      return new JsonResponse({
        type: 4,
        data: {
          content: `${"```"}${error}${"```"}`,
          flags: 64,
        },
      });
    });
};
