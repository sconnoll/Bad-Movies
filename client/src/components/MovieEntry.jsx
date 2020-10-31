import React from 'react';

const MovieListEntry = function({movie, handleClick}) {
  return (
    <li className="movie_item" onClick={() => handleClick(movie.title)}>
      <img src={movie.poster_path}/>
      <div className="movie_description">
        <h2>{movie.title}</h2>
        <section className="movie_details">
          <div className="movie_year">
            <span className="title">Release Date</span>
            <span>{movie.release_date}</span>
          </div>
          <div className="movie_rating">
            <span className="title">Rating</span>
            <span>{movie.vote_count}</span>
          </div>
        </section>
      </div>
    </li>
  )
}

export default MovieListEntry;