const express = require("express");
const router = express.Router();
const Team = require("../../../models/team");

router.post("/create-team", async (req, res) => {
  try {
    const { teamLeader, teamMember, status, project } = req.body;
    const newTeam = new Team({ teamLeader, teamMember, status, project });
    await newTeam.save();
    res.status(201).json({ message: "Team created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/my-team/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await Team.find({
      teamMember: {
        $elemMatch: {
          id: userId,
        },
      },
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
        path: "teamMember.id",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "teamMember.image",
        select: "path",
      });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/all-team", async (req, res) => {
  try {
    const users = await Team.find({})
      .populate({
        path: "teamLeader.id",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "teamLeader.image",
        select: "path",
      })
      .populate({
        path: "teamMember.id",
        select: "userName designation employeeId firstName lastName",
      })
      .populate({
        path: "teamMember.image",
        select: "path",
      });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
