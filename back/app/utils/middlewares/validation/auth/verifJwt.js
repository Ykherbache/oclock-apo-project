import jwt from 'jsonwebtoken';

// This middleware will be applied to all routes to secure them
export function isValidJwt(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: 'Requête non authentifiée!',
    });
  }
}
