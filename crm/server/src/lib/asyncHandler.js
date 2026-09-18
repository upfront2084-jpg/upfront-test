// Express 4 does not forward a rejected promise from an async route
// handler to the error middleware on its own — an unhandled rejection
// there just hangs the request. Wrap every handler with this so a thrown
// or rejected error always reaches the existing JSON error middleware.
export function ah(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
