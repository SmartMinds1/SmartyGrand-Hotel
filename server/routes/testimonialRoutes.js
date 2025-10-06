//Our different imports
const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const { commentLimiter } = require("../middlewares/limiter");
const {
  usernameValidation,
  commentValidation,
} = require("../middlewares/validators");

router.post(
  "/",
  commentLimiter,
  [usernameValidation, commentValidation],
  testimonialController.sendComment
);

/* ...........................Now Let's get testimonials from the database............................... */
// GET all comments
router.get("/", testimonialController.getAllComments);

// DELETE a comment by ID
router.delete("/:id", testimonialController.deleteComment);

module.exports = router;
