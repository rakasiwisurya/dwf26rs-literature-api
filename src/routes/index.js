const express = require("express");
const router = express.Router();

const { login, register } = require("../controller/auth");
const { getLiteratures } = require("../controller/literature");

// router literature
router.get("/literatures", getLiteratures);

// router auth
router.post("/login", login);
router.post("/register", register);

module.exports = router;
