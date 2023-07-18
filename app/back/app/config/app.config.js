// config.js
import { config as loadEnv } from 'dotenv';

loadEnv(); // load environment variables

// setup origin array (accepted url that can hit the endpoints of the api)
const origin = ['http://localhost:3000'];
if (process.env.CORS_ORIGIN) {
  origin.push(process.env.CORS_ORIGIN);
}
export const config = {
  port: process.env.PORT || 8080,
  corsOptions: { origin: origin },
  uploads: '/app/uploads',
};
