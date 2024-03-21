const express = require('express');
const router = new express.Router();
const userController = require("../controller/userController");
const auth = require("../auth/auth");

router.post("/", userController.register);
router.post("/login", userController.login);
router.get("/", userController.getUser);
router.get("/profile", auth.authGuard, userController.getProfile);
router.delete("/", auth.authGuard, userController.deleteUser);
router.patch("/", auth.authGuard, userController.editProfile);

// Logout route
router.post("/logout", auth.authGuard, userController.logout);

module.exports = router;
