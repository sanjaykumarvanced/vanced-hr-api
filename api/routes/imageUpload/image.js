const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const Image = require("../../../models/image");
const path = require("path");
const removeImage = require("../../helpers/deleteImage/deleteImage");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload image
router.post("/upload/:id", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const userId = req.params.id;
    const existingUser = await Image.findOne({ user_Id: userId });

    if (existingUser) {
      fs.unlinkSync(imagePath);
      return res
        .status(409)
        .json({ message: "Image already exists for this user" });
    }

    const image = new Image({
      user_Id: req.params.id,
      path: imagePath,
    });

    await image.save();
    res.status(201).send({ message: "Image uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get image by ID
router.get("/get/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const image = await Image.findOne({ user_Id: userId });

    if (!image) {
      return res.status(404).send("Image not found");
    }
    //const imagePath = path.join(__dirname, "..", "..", "..", image.path);

    //res.sendFile(imagePath);
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const userId = req.params.id;
    const imagePath = req.file ? req.file.path : null;
    const existingImage = await Image.findOne({ user_Id: userId });

    // Delete existing image file if found
    if (existingImage && existingImage.path) {
      fs.unlinkSync(existingImage.path); // Delete the existing image file
    }

    // Update the image path in the database
    await Image.findOneAndUpdate(
      { user_Id: userId },
      { path: imagePath },
      { new: true, upsert: true }
    );

    res.status(200).send("Image updated successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // const userId = req.params.id;
    // const existingImage = await Image.findOne({ user_Id: userId });
    // const imageId = existingImage.id;
    // await findOne.deleteOne({ _id: imageId });
    // if (existingImage && existingImage.path) {
    //   fs.unlinkSync(existingImage.path); // Delete the existing image file
    // }
    let data = await removeImage(id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
