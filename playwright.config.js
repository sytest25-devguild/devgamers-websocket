import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/websocket",
  workers: 1,
});
