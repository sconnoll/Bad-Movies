//Select one db to work with:

//For SQL
const db = require('../../db/sql/index.js');



module.exports = {

  createFavorite: function(movie, handleResults) {
    var vote_count = movie.vote_count || 0;
    var overview = movie.overview || '';
    var release_date = movie.release_date || '';
    var params = [movie.title, vote_count, overview, release_date];
    db.query(`INSERT INTO favorites (title, rating, overview, release_date) VALUES (?, ?, ?, ?)`, [...params], handleResults);
  },

  deleteFavorite: function(movie, handleResults) {
    db.query(`DELETE FROM favorites WHERE title = ?`, [movie.title], handleResults);
  }

}