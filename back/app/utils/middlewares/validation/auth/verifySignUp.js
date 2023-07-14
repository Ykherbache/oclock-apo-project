const checkDuplicateEmailAndPseudo = (req, res, next) => {
  const { users } = req['models'];
  // Email
  users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((userWithEmail) => {
      if (userWithEmail) {
        res.status(400).send({
          message: 'Failed! Email is already in use!',
        });
        return;
      }

      // Pseudo
      users
        .findOne({
          where: {
            pseudo: req.body.pseudo,
          },
        })
        .then((userWithPseudo) => {
          if (userWithPseudo) {
            res.status(400).send({
              message: 'Failed! Pseudo is already in use!',
            });
            return;
          }

          next();
        });
    });
};

export { checkDuplicateEmailAndPseudo };
