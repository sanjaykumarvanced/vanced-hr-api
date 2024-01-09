const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
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
  teamMember: [
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
  teamName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teams = mongoose.model("Teams", teamSchema);
module.exports = Teams;
