import { WebSocketServer } from "ws";
import emojiThrower from "./utils/generate-text/emoji-thrower.js";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const emojiStream = emojiThrower(wss);

wss.on("connection", (ws) => {
  if (emojiStream) ws.send(emojiStream);
});

console.log(`Server running on ws://localhost:${PORT}`);
