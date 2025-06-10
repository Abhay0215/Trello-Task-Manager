const express = require("express")
const router = express.Router();
const controller = require("../controllers/authController.js");
 

router.post("/register", controller.register);
router.post("/signin", controller.signin);

module.exports = router;