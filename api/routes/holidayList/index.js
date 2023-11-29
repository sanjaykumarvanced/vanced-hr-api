const express = require("express");
const router = express.Router();
const Holiday = require("../../../models/holidayList");

router.post("/list", async (req, res) => {
  try {
    const { holidayName, year, startDate, endDate, description } = req.body;

    const newHoliday = new Holiday({
      holidayName,
      year,
      startDate,
      endDate,
      description,
    });
    await newHoliday.save();
    res.status(201).json({ message: "New holiday added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/get-list/:year", async (req, res) => {
  try {
    const selectedYear = req.params.year;
    const currentYear = selectedYear
      ? parseInt(selectedYear, 10)
      : new Date().getFullYear();
    const holidays = await Holiday.find().sort({ year: 1, startDate: 1 });
    const holidaysByYear = [];

    holidays.forEach((holiday) => {
      const { year, holidayName, startDate, endDate, description } = holiday;
      if (currentYear === year) {
        holidaysByYear.push({
          holidayName,
          startDate,
          endDate,
          description,
        });
      }
    });

    res.status(200).json(holidaysByYear);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
