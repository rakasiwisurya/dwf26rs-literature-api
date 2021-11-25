const express = require("express");
const router = express.Router();

// controllers
const { login, register, checkAuth } = require("../controller/auth");
const {
  getSearch,
  getLiteraturesProfile,
  addLiterature,
  getLiterature,
  getLiteratures,
} = require("../controller/literature");
const { getMyCollections } = require("../controller/collection");
const { getUser, updateUserAvatar } = require("../controller/user");

// middlewares
const { auth, adminOnly } = require("../middlewares/auth");
const { uploadPdf, uploadImage } = require("../middlewares/uploadFile");

// router literature
router.get("/literature", auth, getSearch);
router.get("/profile/:id/literatures", auth, getLiteraturesProfile);
router.post(
  "/literatures",
  uploadPdf("attache", "uploads/literatures"),
  auth,
  addLiterature
);
router.get("/literatures/:id", auth, getLiterature);
router.get("/literatures", auth, adminOnly, getLiteratures);

// router collection
router.get("/collections/:id", auth, getMyCollections);

// router user
router.get("/users/:id", auth, getUser);
router.put(
  "/users/:id",
  uploadImage("avatar", "uploads/avatars"),
  auth,
  updateUserAvatar
);

// router auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
