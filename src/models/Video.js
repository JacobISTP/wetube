import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: Number,
    rating: Number,
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));
});

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
