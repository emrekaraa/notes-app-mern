const express = require("express");

const router = express.Router();
const { login, register } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Authantication
 *  description: The authantication managing API
 */
