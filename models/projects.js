const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  teamLeader: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  team: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    },
  ],
  client: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clients",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  projectName: {
    type: String,
    require: true,
  },
  projectDescription: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  rate: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  currentStatus: {
    type: String,
    require: true,
  },
});

const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;
