import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Create Account" });
};
export const postJoin = async (req, res) => {
  const { username, password, password2, name, email, loacation } = req.body;
  const userExist = await User.exists({ $or: [{ username }, { email }] });
  if (userExist) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "This username/email is already taken",
    });
  }
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "Password confirmation does not match",
    });
  }
  try {
    await User.create({
      username,
      password,
      name,
      email,
      loacation,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Log in" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", {
      pageTitle: "Log in",
      errorMessage: "User doesn't exist.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Log in",
      errorMessage: "Wrong password",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).redirect("/");
};
export const edit = (req, res) => {};
export const remove = (req, res) => {};
export const profile = (req, res) => {};
