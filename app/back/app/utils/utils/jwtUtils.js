import jwt from 'jsonwebtoken';

/**
 *
 * @param {{id:number}} payload
 * @param  {(string|number)} expiry  temps d'expiration du token crée
 */
export function generateToken(payload, expiry = process.env.TOKEN_EXPIRY_TIME) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: Number(expiry),
  });
}
