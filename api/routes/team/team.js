const express = require("express");
const router = express.Router();
const Team = require("../../../models/team");

router.post("/create-team", async (req, res) => {
  try {
    const { teamManagerId, teamLeaderId, teamMemberId } = req.body;
    const newTeam = new Team({ teamManagerId, teamLeaderId, teamMemberId });
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
        teamMemberId: userId,
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
