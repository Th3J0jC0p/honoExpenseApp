import App from "./app.ts";

Bun.serve ({
  fetch: App.fetch
});

console.log("Server running at http://localhost:3000/");