import { WebSocketServer } from "ws";
import emojiThrower from "./utils/generate-text/emoji-thrower.js";

const port = Number(process.env.PORT);
if (!port) throw new Error("PORT not available");

const wss = new WebSocketServer({ port });

const emojiStream = emojiThrower(wss);

wss.on("connection", (ws) => {
  if (emojiStream) ws.send(emojiStream);
});

console.log(`Websocket running on port ${port}`);
