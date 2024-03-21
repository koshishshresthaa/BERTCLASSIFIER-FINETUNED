const express = require('express');
const router = new express.Router();
const categoryController = require("../controller/categoryController");

router.post("/",categoryController.createCategory);

router.get("/",categoryController.getCategory);

router.delete("/",categoryController.deleteCategory);

router.patch("/",categoryController.updateCategory);

module.exports = router;
