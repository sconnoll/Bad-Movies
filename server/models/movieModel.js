//Select one db to work with:

//For SQL
const db = require('../../db/sql');



module.exports = {

  createFavorite: function(movie, handleResults) {
    var params = [movie.title, movie.vote_count, movie.overview];
    db.query(`INSERT INTO favorites (title, rating, overview) VALUES (?)`, [...params], handleResults);
  },

  deleteFavorite: function(movie, handleResults) {
    db.query(`DELETE FROM favorites WHERE title = ?`, [movie.title], handleResults);
  }

}