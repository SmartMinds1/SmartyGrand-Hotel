//This file handles all the business logic related to all comment requests
const testimonialModel = require("../models/testimonialModel");

class testimonialService {
  // Add a new comment
  static async sendComment(username, message) {
    const result = await testimonialModel.createComment(username, message);
    return result.rows[0]; // return data only
  }

  //Getting all comments
  static async getAllComments() {
    const result = await testimonialModel.getAllComments();
    return result;
  }

  //Deleting a comment by ID
  static async deleteComment(id) {
    const result = await testimonialModel.deleteComment(id);
    return result;
  }
}

module.exports = testimonialService;
