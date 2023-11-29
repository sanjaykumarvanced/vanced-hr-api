const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  teamManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  teamLeaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  teamMemberId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Teams = mongoose.model("Teams", teamSchema);
module.exports = Teams;
