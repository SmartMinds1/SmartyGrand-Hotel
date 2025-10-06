//The endpoint file that queries all the comments related requests to db
const { query } = require("../utils/pgHelper");

//Inserting a new comment
exports.createComment = async (username, comment) => {
  return query(
    "INSERT INTO smartygrand_testimonials (username, comment) VALUES ($1, $2) RETURNING * ",
    [username, comment]
  );
};

//Getting all comments
exports.getAllComments = async () => {
  return query(
    "SELECT id, username, comment, received_at FROM smartygrand_testimonials ORDER BY id DESC"
  );
};

//Deleting a comment
exports.deleteComment = async (commentId) => {
  return query(
    "DELETE FROM smartygrand_testimonials WHERE id = $1 RETURNING *",
    [commentId]
  );
};
