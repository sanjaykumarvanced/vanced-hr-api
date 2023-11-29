const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const routs = require("./api/router");
const swaggerDocs = require("./api/swagger/swagger");
const app = express()
app.use(cors())
app.use(express.json())
const path = require('path');

// Database connection
require("./db/connection");


app.get("/api/testing", async (req, res) => { res.send("Working") });

// Authentication routes
app.use("/api", routs);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static("../public"));
// app.use("/public", express.static("./public"));

const PORT = process.env.PORT || 8800

app.listen(PORT, () => {
  console.log("Server is running..." + PORT)
})