const express = require("express");
const router = express.Router();
const Projects = require("../../../models/projects");
const Client = require("../../../models/client");
const Employee = require("../../../models/employee");

router.get("/all-count", async (req, res) => {
  try {
    const employee = await Employee.find({});
    const client = await Client.find({});
    const project = await Projects.find({});
    const totalProjects = project.length;
    const totalClients = client.length;
    const totalEmployees = employee.length;
    const activeTask = 54;
    const data = { totalEmployees, activeTask, totalClients, totalProjects };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
