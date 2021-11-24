const express = require("express");
const router = express.Router();

const { login, register } = require("../controller/auth");
const { getSearch, getProfile } = require("../controller/literature");

const { auth } = require("../../middlewares/auth");

// router literature
router.get("/literatures", auth, getSearch);

// router user
router.get("/profile/:id/literature", auth, getProfile);

// router auth
router.post("/login", login);
router.post("/register", register);

module.exports = router;
