function createAppContext(req) {
  return {
    user: req.user,
  };
}

module.exports = { createAppContext };
