import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 375,
  viewportHeight: 667,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:8082/",
    specPattern: "cypress/e2e/**/*.spec.js",
  },
});
