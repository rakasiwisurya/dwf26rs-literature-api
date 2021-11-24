const express = require("express");
const router = express.Router();

const { login, register } = require("../controller/auth");
const { getLiteratures } = require("../controller/literature");

const { auth } = require("../../middlewares/auth");

// router literature
router.get("/literatures", auth, getLiteratures);

// router auth
router.post("/login", login);
router.post("/register", register);

module.exports = router;
