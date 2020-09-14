import React, {useEffect, useState} from 'react'
import './App.css'
import './scss/index.scss'
import NominationsContext from '../src/contexts/NominationsContext'
import MovieSearchComponent from '../src/components/MovieSearch'
import NominationsComponent from '../src/components/Nominations'
import SearchResultsComponent from '../src/components/SearchResults'
import Banner from '../src/components/Banner'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

function App() {
  
  const [searchTerms, setSearchTerms] = useState("")

  const [searchResults, setResults] = useState(() => (localStorage.searchResults ? JSON.parse(localStorage.searchResults) : []))

  const [nominations, setNomination] = useState(() => (localStorage.nominations ? JSON.parse(localStorage.nominations) : []))

  const [counter, setCounter] = useState(() => (localStorage.counter ? JSON.parse(localStorage.counter) : -1))

  const [details, setDetails] = useState([])

  const [bannerStatus, setBannerStatus] = useState(false)


  const [loading, setLoading] = useState(false)

  const apiKey = `f54db668`
  const apiSearch = `https://www.omdbapi.com/?s=${searchTerms}&type=movie&apikey=${apiKey}`

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

  useEffect(
    () => {
      counter && localStorage.setItem('counter', JSON.stringify(counter));
    },
    [ counter ]
  );

  useEffect(
    () => {
      setDetails(details)
    },
    [ details ]
  );

  return (
    <NominationsContext.Provider value={{searchResults, setResults, searchTerms, 
    setSearchTerms, nominations, setNomination, apiKey, apiSearch, details, setDetails, 
    counter, setCounter, loading, setLoading, bannerStatus, setBannerStatus
    }}>
    <div className="App">

      <Banner />
      <Header />
      <div className="body">
        <MovieSearchComponent />
        <div className="body-results">
        <SearchResultsComponent />
        <NominationsComponent />
        </div>
      </div>
      <Footer />
    </div>
    </NominationsContext.Provider>
  );
}

export default App;
