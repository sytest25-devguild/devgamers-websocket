const EMOJIS = ["😀", "🔥", "🎉", "💀", "🚀","🔆" ,"🐶", "✅", "💵", "🥂", "🐣", "☕️", "🏠", "🍻", "🇯🇵", "😎", "🤘", "😇", "🫵"];

let emojiStream = { current: "" };
const emojiThrower = (wss) => {
  if (wss) {
    setInterval(() => {
      emojiStream.current = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

      for (const client of wss.clients) {
        if (client.readyState === 1) client.send(emojiStream.current);
      }
    }, 1000);
  }

  return emojiStream;
};

export default emojiThrower;
