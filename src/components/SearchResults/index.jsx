import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'



const SearchResultsComponent = () => {

    const {searchResults, setResults,nominations, setNomination, setCounter, counter, loading, setLoader} = useContext(NominationsContext)

    const handleNominationSubmit = (e, item) => {
        e.preventDefault()
        e.stopPropagation()        
        item.nominated = true
        setNomination([...nominations, item])
        setCounter(counter + 1)
    }


const searchResultsRef = useRef(searchResults)
searchResultsRef.current = searchResults

    useEffect(
        () => {
          searchResults && localStorage.setItem('searchResults', JSON.stringify(searchResults));
        },
        [ searchResults, setResults ]
      );

    return (

            <div className='search-results-component'>
            <h2>Search Results</h2>
                { searchResultsRef.current ? searchResultsRef.current.map((item,i) => {
                    return  <div className="movie-list-item" key={i}>
                    {/* <img className="movie-img" src={item.Poster} alt="{item.Title}" /> */}
                    <ul>
                    <li>{item.Title} ({item.Year})</li>
                        <li className="button-line-item"><div className='nominate-button'>
                        <button disabled={item.nominated} onClick={(e) => handleNominationSubmit(e,item)}>{item.nominated ? "Nominated" : "Nominate" }</button>
                        </div></li>
                    </ul>
                    </div>
    
            }) : 	loading ? <Loader type="Oval" color="#00BFFF" height={80} width={80} /> : searchResults

            }
        </div>
    )
}

export default SearchResultsComponent