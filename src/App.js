import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import './scss/index.scss';
import NominationsContext from '../src/contexts/NominationsContext'
import MovieSearchComponent from '../src/components/MovieSearch'
import NominationsComponent from '../src/components/Nominations'

function App() {
  
  const [searchTerms, setSearchTerms] = useState("")

  const [searchResults, setResults] = useState(() => (localStorage.searchResults ? JSON.parse(localStorage.searchResults) : []))

  const [nominations, setNomination] = useState(() => (localStorage.nominations ? JSON.parse(localStorage.nominations) : []))

  const [details, setDetails] = useState()

  const apiKey = `f54db668`
  const apiTitle = `http://www.omdbapi.com/?t=${searchTerms}&plot=full&apikey=${apiKey}`
  const apiSearch = `http://www.omdbapi.com/?s=${searchTerms}&type=movie&apikey=${apiKey}`

  useEffect(
		() => {
			nominations && localStorage.setItem('nominations', JSON.stringify(nominations));
		},
		[ nominations ]
  );
  
  useEffect(
    () => {
      searchResults && localStorage.setItem('searchResults', JSON.stringify(searchResults));
    },
    [ searchResults ]
  );


  return (
    <NominationsContext.Provider value={{searchResults, setResults, searchTerms, 
    setSearchTerms, nominations, setNomination, apiKey, apiTitle, apiSearch, details, setDetails}}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Nominate your 5 favorite movies and share with friends!
        </p>
      </header>
      <div className="body">
        <MovieSearchComponent />
        <NominationsComponent />
      </div>
    </div>
    </NominationsContext.Provider>
  );
}

export default App;
