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
  updateStatusLiterature,
  deleteLiterature,
} = require("../controller/literature");
const {
  getMyCollections,
  addMyCollection,
  deleteMyCollection,
  getMyCollection,
} = require("../controller/collection");
const { updateUserData, updateUserAvatar } = require("../controller/user");

// middlewares
const { auth, adminOnly } = require("../middlewares/auth");
const { uploadPdf, uploadImage } = require("../middlewares/uploadFile");

// router literature
router.get("/literature", auth, getSearch);
router.get("/profile/literatures", auth, getLiteraturesProfile);
router.post(
  "/literatures",
  uploadPdf("attache", "uploads/literatures"),
  auth,
  addLiterature
);
router.get("/literatures/:id", auth, getLiterature);
router.get("/literatures", auth, adminOnly, getLiteratures);
router.put("/literatures/:id", auth, adminOnly, updateStatusLiterature);
router.delete("/literatures/:id", auth, deleteLiterature);

// router collection
router.get("/collections", auth, getMyCollections);
router.get("/collections/literature/:id", auth, getMyCollection);
router.post("/collections", auth, addMyCollection);
router.delete("/collections/:id", auth, deleteMyCollection);

// router user
router.put("/users", auth, updateUserData);
router.put(
  "/users/avatar",
  uploadImage("avatar", "uploads/avatars"),
  auth,
  updateUserAvatar
);

// router auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
