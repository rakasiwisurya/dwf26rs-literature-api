const express = require("express");
const router = express.Router();

// controllers
const { login, register } = require("../controller/auth");
const {
  getSearch,
  getLiteraturesProfile,
  addLiterature,
  getLiterature,
  getLiteratures,
} = require("../controller/literature");
const { getMyCollections } = require("../controller/collection");

// middlewares
const { auth, adminOnly } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// router literature
router.get("/literature", auth, getSearch);
router.get("/profile/:id/literatures", auth, getLiteraturesProfile);
router.post(
  "/literatures",
  auth,
  uploadFile("attache", "uploads/literatures"),
  addLiterature
);
router.get("/literatures/:id", auth, getLiterature);
router.get("/literatures", auth, adminOnly, getLiteratures);

// router collection
router.get("/collections/:id", auth, getMyCollections);

// router auth
router.post("/login", login);
router.post("/register", register);

module.exports = router;
