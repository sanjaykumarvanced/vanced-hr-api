const express = require("express");
const router = express.Router();
const Projects = require("../../../models/projects");
const Image = require("../../../models/image");

router.post("/add-details", async (req, res) => {
  try {
    const {
      teamLeader,
      team,
      client,
      projectName,
      projectDescription,
      startDate,
      endDate,
      rate,
      priority,
      currentStatus,
    } = req.body;

    const newProject = new Projects({
      teamLeader,
      team,
      client,
      projectName,
      projectDescription,
      startDate,
      endDate,
      rate,
      priority,
      currentStatus,
    });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/all-project", async (req, res) => {
  try {
    const projects = await Projects.find({})
      .populate({
        path: "teamLeader.id",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "teamLeader.image",
        select: "path",
      })
      .populate({
        path: "client.id",
        select: "userName mail organization firstName lastName",
      })
      .populate({
        path: "client.image",
        select: "path",
      })
      .populate({
        path: "team.id",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "team.image",
        select: "path",
      });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/assigned-project/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const projects = await Projects.find({
      $or: [
        {
          teamLeader: {
            $elemMatch: {
              id: userId,
            },
          },
        },
        {
          team: {
            $elemMatch: {
              id: userId,
            },
          },
        },
      ],
    })
      .populate({
        path: "teamLeader.id",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "teamLeader.image",
        select: "path",
      })
      .populate({
        path: "client.id",
        select: "userName mail organization firstName lastName",
      })
      .populate({
        path: "client.image",
        select: "path",
      })
      .populate({
        path: "team.id",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "team.image",
        select: "path",
      });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/update-project", async (req, res) => {
  try {
    const projectId = req.body.id;
    const updatedFields = req.body;

    await Projects.findOneAndUpdate(
      { _id: projectId },
      { $set: updatedFields },
      { new: true, upsert: true }
    );
    res.status(200).send("Project detail updated successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
