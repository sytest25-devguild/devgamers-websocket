import { EMOJIS } from "../constants";

const emojiThrower = (wss) => {
  let emojiStream = "🚀";

  if (wss) {
    setInterval(() => {
      emojiStream = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

      for (const client of wss.clients) {
        if (client.readyState === 1) client.send(emojiStream);
      }
    }, 1000);
  }

  return emojiStream;
};

export default emojiThrower;
