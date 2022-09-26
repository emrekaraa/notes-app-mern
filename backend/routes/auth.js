const express = require("express");

const router = express.Router();
const { login, register, getMe } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/getMe", getMe);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Authantication
 *  description: The authantication managing API
 */
