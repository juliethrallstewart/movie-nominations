import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import MovieContext from '../src/contexts/MovieContext.js'

function App() {
  
  // const { getMovies } = useContext(MovieContext)

  const [searchTerms, setSearchTerms] = useState("")

  const [movie, setMovie] = useState()

  const apiKey = `f54db668`
  const api_title = `http://www.omdbapi.com/?t=${searchTerms}&plot=full&apikey=${apiKey}`
  const api_search = `http://www.omdbapi.com/?s=${searchTerms}&plot=full&apikey=${apiKey}`

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(api_search)
    .then(res => {
      console.log(res.data, "RES");
      localStorage.setItem('results', res.data['Search']);
      setMovie(res.data['Search'])

    })
    .catch(err => console.log("no results match query"))
  }

  const handleChange = e => {
		setSearchTerms(e.target.value);
	};

  console.log(movie, "MOVIE")


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Nominate your favorite movies and share with friends!
        </p>
        <form onSubmit={handleSubmit}>
          <input 
            type="search"
            name="search"
            placeholder="search"
            onChange={handleChange}
            value={searchTerms}
          ></input>
          <button>Submit</button>
        </form>
        <div>
        { movie ? movie.map(item => {
          return <div><img src={item.Poster} alt="{item.Title}" />
          <h2>{item.Title}</h2>
          <p>{item.Year}</p>
          </div>
      }) : console.log("loading")

      }
        </div>
      </header>
    </div>
  );
}

export default App;
