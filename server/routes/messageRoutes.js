//Before sending anything to the controller, the route verifies everything and determines who in the controller should execute that request
const express = require("express");
const msgController = require("../controllers/msgController");
const router = express.Router();
const { contactLimiter } = require("../middlewares/limiter");
const {
  usernameValidation,
  emailValidation,
  messageValidation,
} = require("../middlewares/validators");

// Add a new message
router.post(
  "/",
  contactLimiter,
  //validation section
  [usernameValidation, emailValidation, messageValidation],
  msgController.sendMessage
);

// getting all messages
router.get("/", msgController.getAllMessages);

// DELETE a message by id
router.delete("/:id", msgController.deleteMessage);

module.exports = router;
