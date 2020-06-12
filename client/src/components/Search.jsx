import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this);
    this.getGenreId = this.getGenreId.bind(this);
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    return axios.get('/genres');
  }
  
  getGenreId(genreName) {
    console.log('getGenreId input', genreName);
    for (var i = 0; i < this.state.genres.length; i++) {
      if (this.state.genres[i].name === genreName) {
        return this.state.genres[i].id;
      }
    };
  }

  componentDidMount() {
    this.getGenres()
      .then((results) => {
        var listOfGenres = results.data.data.genres;
        this.setState({
          genres: listOfGenres
        });
      })
      .catch((err) => {
        console.log('this is the error when getting genres', err);
      });
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={(event) => this.props.getMovies(this.getGenreId(event.target.value))}>
          <option value="genres">Genres</option>
          {this.state.genres.map((genre, i) => (
            <option value={genre.name} key={i}>{genre.name}</option>
          ))}
        </select>
        <br/><br/>

        {/* <button onClick={(e) => this.props.handleClick(e)}>Search</button> */}

      </div>
    );
  }
}

export default Search;