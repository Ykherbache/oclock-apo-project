import models from '../../database/models/init-models.js';

export async function injectModelsInRequest(req, res, next) {
  req['models'] = models;
  next();
}
