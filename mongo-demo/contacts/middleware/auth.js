export const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/signin");
  }
  next();
};

export const redirectIfAuth = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/contacts");
  }
  next();
};
