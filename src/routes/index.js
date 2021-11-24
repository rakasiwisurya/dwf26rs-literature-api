const express = require("express");
const router = express.Router();

// controllers
const { login, register } = require("../controller/auth");
const {
  getSearch,
  getLiteraturesProfile,
  addLiterature,
  getLiterature,
} = require("../controller/literature");
const { getMyCollections } = require("../controller/collection");

// middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// router literature
router.get("/literatures", auth, getSearch);
router.get("/profile/:id/literatures", auth, getLiteraturesProfile);
router.post(
  "/literatures",
  auth,
  uploadFile("attache", "uploads/literatures"),
  addLiterature
);
router.get("/literatures/:id", auth, getLiterature);

// router collection
router.get("/collections/:id", auth, getMyCollections);

// router user

// router auth
router.post("/login", login);
router.post("/register", register);

module.exports = router;
