import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    console.log('this is what we are passing into getMovies as the genre', genreId);
    axios.get(`/search?genre=${genreId}`)
      .then(results => {
        console.log(results.data.results);
        this.setState({
          movies: results.data.results
        })
      })
  }

  getMovieDetails(movieTitle) {
    for (var i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].title === movieTitle) {
        console.log('here is the movie object we want to pass into saveMovie', this.state.movies[i]);
        return this.state.movies[i];
      }
    }
  }

  saveMovie(movieTitle) {
    // same as above but do something diff
    var movieObj = this.getMovieDetails(movieTitle);
    var temp = this.state.favorites
    temp.push(movieObj);
    this.setState({
      favorites: temp
    })
    return axios.post('/save', {
      title: movieObj.title, 
      vote_count: movieObj.vote_count, 
      overview: movieObj.overview, 
      release_date: movieObj.release_date
    })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteMovie(movie) {
    // same as above but do something diff
    return axios.post('/delete')
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  handleClick(title) {
    this.saveMovie(title);
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} handleClick={this.handleClick}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));