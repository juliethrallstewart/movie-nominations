import React, { useContext } from "react";
import NominationsContext from '../../contexts/NominationsContext'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import Loader from 'react-loader-spinner'



const SearchResultsComponent = () => {

    const {searchResults, nominations, setNomination, setCounter, counter} = useContext(NominationsContext)

    // Add nominated = true property to movie item
    // Add movie to nominations list
    // Increments counter which tracks number of items nominated
    const handleNominationSubmit = (e, item) => {
        e.preventDefault()
        item.nominated = true
        setNomination([...nominations, item])
        setCounter(counter + 1)
    }

    return (

            <div className='search-results-component'>
            <h2>Search Results</h2>
                { searchResults ? searchResults.map((item,i) => {
                    return  <div className="movie-list-item" key={i}>
                    <ul>
                    <li>{item.Title} ({item.Year})</li>
                        <li className="button-line-item"><div className='nominate-button'>
                        <button disabled={item.nominated} onClick={(e) => handleNominationSubmit(e,item)}>Nominate</button>
                        </div></li>
                    </ul>
                    </div>
    // potential loader : loading ? <Loader type="Oval" color="#00BFFF" height={80} width={80} /> : searchResults

            }) : console.log("LOADING")
            }
        </div>
    )
}

export default SearchResultsComponent