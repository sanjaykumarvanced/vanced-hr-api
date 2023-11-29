const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  mail: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  organization: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aboutUs: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  socialMedia: [
    {
      type: String,
      required: true,
    },
  ],
  contactNumber: {
    type: Number,
    required: true,
  },
});

const Clients = mongoose.model("Clients", clientSchema);

module.exports = Clients;
