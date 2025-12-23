const express = require("express");
const { generateImage } = require("../controllers/controller");
const router = express.Router();

router.post("/generate-image", generateImage);

module.exports = router;
