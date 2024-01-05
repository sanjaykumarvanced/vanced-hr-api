const express = require("express");
const router = express.Router();
const Performance = require("../../../models/performance");
const Image = require("../../../models/image");

router.post("/add-performance", async (req, res) => {
  try {
    const { employee, addedBy, projectName, comments, date } = req.body;
    const employeeImageId = await Image.findOne({ user_Id: employee });
    const addedByImageId = await Image.findOne({ user_Id: addedBy });
    const employeeImage = employeeImageId._id;
    const addedByImage = addedByImageId._id;
    const newComment = new Performance({
      employee,
      employeeImage,
      addedBy,
      addedByImage,
      projectName,
      comments,
      date,
    });
    await newComment.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/all-performance", async (req, res) => {
  try {
    const userId = req.body.id;
    let query = {};

    if (userId) {
      // If userId is provided, fetch data for that specific user
      query = { employee: userId };
    }
    const feedback = await Performance.find(query)
      .populate({
        path: "employee",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "employeeImage",
        select: "path",
      })
      .populate({
        path: "addedBy",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "addedByImage",
        select: "path",
      })
      .populate({
        path: "projectName",
        select: "projectName",
      });
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/update-performance", async (req, res) => {
  try {
    const updatedFields = req.body;
    await Performance.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: updatedFields },
      { new: true, upsert: true }
    );
    res.status(200).send("Performance detail updated successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deleted = await Performance.deleteOne({ _id: id });
    res
      .status(200)
      .send({ message: "Performance deleted successfully!", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
