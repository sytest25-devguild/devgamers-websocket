import { test, expect } from "@playwright/test";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { EMOJIS } from "../../../utils/constants.js";

const projectRoot = fileURLToPath(new URL("../../../", import.meta.url));
let server;

test.beforeAll(async () => {
  server = spawn(process.execPath, ["index.js"], {
    cwd: projectRoot,
    env: { ...process.env, PORT: "8099" },
  });

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("The WebSocket test server did not start in time"));
    }, 10_000);

    server.stdout.on("data", (data) => {
      if (data.toString().includes("Websocket running on port 8099")) {
        clearTimeout(timeout);
        resolve();
      }
    });

    server.once("error", reject);
  });
});

test.afterAll(async () => {
  if (!server?.killed) {
    const stopped = new Promise((resolve) => server.once("exit", resolve));
    server.kill();
    await stopped;
  }
});

test("a browser can receive an emoji", async ({ page }) => {
  const emoji = await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket("ws://127.0.0.1:8099");

      socket.onmessage = (event) => {
        socket.close();
        resolve(event.data);
      };

      socket.onerror = () => {
        reject(new Error("The WebSocket connection failed"));
      };
    });
  });

  expect(EMOJIS).toContain(emoji);
});
