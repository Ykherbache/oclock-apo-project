import { config } from './app/config/app.config.js';
import { createProductionApp } from './app/app.js';

async function startServer() {
  const app = createProductionApp();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}.`);
  });
}

await startServer();
