export default (controllerFunction) => (req, res, next) =>
  Promise.resolve(controllerFunction(req, res, next).catch(next));

// global error handler over every api if error occur in resolving any promise in catch call the next middleware
// error middlware
