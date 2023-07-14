export function errorHandler(err, req, res) {
  console.error(err);
  res.status(500).send('An internal server error occurred');
}

export const withErrorHandling = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(`Error in ${fn.name}:`, error);
      throw error;
    }
  };
};
