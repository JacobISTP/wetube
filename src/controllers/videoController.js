import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "descending" });
  return res.render("home", { pageTitle: "Home", videos });
};
export const getEdit = async (req, res) => {
  const video = await Video.findById(req.params.id);
  return res.render("edit", { pageTitle: `Edit Video: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not found." });
  }
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("edit", {
      pageTitle: `Edit Video: ${video.title}`,
      video,
      errorMessage: error._message,
    });
  }
  await video.save();
  return res.redirect("/");
};
export const remove = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
export const watch = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
      meta: {
        views: 0,
        rating: 0,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  console.log(videos);
  return res.render("search", { pageTitle: "Search", videos });
};
