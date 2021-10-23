import Videos from "../models/Video";

export const home = async (req, res) => {
  const videos = await Videos.find({});
  return res.render("home", { pageTitle: "Home", videos });
};
export const edit = (req, res) => {};
export const remove = (req, res) => {};
export const watch = (req, res) => {};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Videos.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: {
        views: 0,
        rating: 0,
      },
    });
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
  return res.redirect("/");
};
