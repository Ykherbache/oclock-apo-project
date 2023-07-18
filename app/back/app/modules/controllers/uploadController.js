import { getUserFromRequest } from '../../utils/utils/middlewareUtils.js';

export async function upload(req, res) {
  if (req) {
    const user = getUserFromRequest(req);
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
      user.pseudo
    }/${req.file.filename}`;
    await user.update(
      {
        img: imageUrl,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    req.res.status(200).json({
      message: 'Image upload successfully',
      url: imageUrl,
    });
  } else {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
}
