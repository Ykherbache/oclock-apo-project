import rateLimit from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute',
});
