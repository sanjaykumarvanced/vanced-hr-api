const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
  },
  birthday: {
    type: String,
  },
  designation: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  profileImageURL: String,
  personalInformation: {
    telephones: [
      {
        type: Number,
      },
    ],
    nationality: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
  },
  emergencyContact: {
    primary: {
      name: {
        type: String,
      },
      relationship: {
        type: String,
      },
      phone: [
        {
          type: String,
        },
      ],
    },
    secondary: {
      name: {
        type: String,
      },
      relationship: {
        type: String,
      },
      phone: [
        {
          type: String,
        },
      ],
    },
  },
  bankInformation: {
    bankName: {
      type: String,
    },
    bankAccountNumber: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    panNo: {
      type: String,
    },
  },
  education: [
    {
      institution: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      startYear: {
        type: Number,
      },
      endYear: {
        type: Number,
      },
    },
  ],
  experience: [
    {
      jobTitle: {
        type: String,
      },
      companyName: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  profileImageURL: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
