export function injectUserInRequest(req, res, next) {
  const { users } = req['models'];
  users
    .findOne({
      where: {
        id: req.userId,
      },
    })
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).send({
          message: 'Unauthorized!',
        });
      }
    });
}
