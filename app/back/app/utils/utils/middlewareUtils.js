export function getUserFromRequest(req) {
  return req.user;
}

export function extractSpecificModelsFromRequest(req, models) {
  const extractedModels = {};
  for (const model of models) {
    extractedModels[model] = req[model];
  }
  return extractedModels;
}
