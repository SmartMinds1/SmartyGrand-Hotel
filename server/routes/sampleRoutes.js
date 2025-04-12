//making 4 major imports
const express = require("express");
const pool = require("utils/pgHelper");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//other imports follows
/* other imports here */

//creating a post request
router.post(
  "/sample_name", //can be changed or left as / without a name

  //check inputs to avoid sending empty fields to the database
  [
    body("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("username cannot be empty"),
    body("email")
      .trim()
      .escape()
      .isEmail()
      .withMessage("email must not be null"),
  ],

  async (res, req) => {
    //check if errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    //lets try to add data into the database if now errors
    try {
      //getting the data from the body so that we van now insert it
      const { username, email } = req.body;

      //now inserting into the database
      const results = await pool.query(
        "INSERT INTO sample_users (username, email) VALUES ($1, $2) RETURNING * ",
        [username, email]
      );

      //IF SUCCESSFULL then we need a success message
      res.status(201).json({
        message: "sample user added successfully",
        data: results.rows[0],
      });

      //Lets catch an error if the iserting process was unsuccessful
    } catch (err) {
      console.error("Error inserting sample user to db", err);
      res.status(500).json({ error: "Internal server error!" });
    }

    //and that's it. we are done!
  }
);

module.exports = router;

/* -----------------The above is the sample to use--------------------- */
