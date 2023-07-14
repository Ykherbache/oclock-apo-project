import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/helpers/errorHandler.js';
import { config } from './config/app.config.js';
import { globalRateLimiter } from './utils/middlewares/rate-limit/setGlobalRateLimit.js';
import { setupRoutes } from './modules/routes/index.js';
import { injectModelsInRequest } from './utils/middlewares/injectModelsInRequest.js';

// apps declaration
export function createTestingApp() {
  const app = express();

  setupMiddlewares(app);
  setupRoutes(app);
  setupErrorHandlers(app);

  return app;
}
export function createProductionApp() {
  const app = express();
  app.use(injectModelsInRequest);

  setupMiddlewares(app);
  setupRoutes(app);
  setupErrorHandlers(app);

  return app;
}
// setup functions declaration
function setupMiddlewares(app) {
  app.use(globalRateLimiter);
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(express.json());
  app.use(cors(config.corsOptions));
  app.use(function (req, res, next) {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });
  app.use(express.urlencoded({ extended: true }));
}

function setupErrorHandlers(app) {
  app.use(errorHandler);
}
