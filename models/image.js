const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user_Id: mongoose.Schema.Types.ObjectId,
  path: String,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
