export async function renderJoinPage(req, res, next) {
  res.status(200).render("auth/signup.ejs");
}

export async function renderLoginPage(req, res, next) {
  res.status(200).render("auth/login.ejs");
}
