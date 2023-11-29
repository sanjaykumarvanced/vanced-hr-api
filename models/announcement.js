const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
