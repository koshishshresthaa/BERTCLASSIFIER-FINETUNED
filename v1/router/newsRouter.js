const express = require('express');
const router = new express.Router();
const newsController = require("../controller/newsController");
const upload = require("../utils/Upload")
const auth = require("../auth/auth")

router.post("/",
    // auth.authGuard,
    upload.single("photo"),
    newsController.createPost);

router.get("/",
    // auth.authGuard,
    newsController.getPost);

router.get("/get-one/:news_id", 
    // auth.authGuard,
    newsController.getOneNews)

router.delete("/",newsController.deletePost);

router.patch("/",newsController.editPost);

router.patch("/upload",
    // auth.authGuard,
    upload.single("photo"),
    newsController.uploadProfilePicture);

module.exports = router;
