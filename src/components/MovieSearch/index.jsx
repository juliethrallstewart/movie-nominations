import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'

const MovieSearchComponent = () => {

    const {searchResults, setResults, searchTerms,setSearchTerms, nominations, setNomination, 
          apiKey, apiTitle, apiSearch} = useContext(NominationsContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(apiSearch)
        .then(res => {
            console.log(res.data, "RES");
            localStorage.setItem('results', res.data['Search']);
            setResults(res.data['Search'])

        })
        .catch(err => console.log("no results match query"))
        }

    const handleChange = e => {
        setSearchTerms(e.target.value);
    };

    console.log(searchResults, "SEARCH RESULTS")


    const handleNominationSubmit = (e, item) => {
        e.preventDefault()
        setNomination([...nominations, item])
    }

    console.log(nominations, "NOMINATIONS")
   
    return (
        <>
            <div className="search-component">
                <h2>Search Movies</h2>
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
                <div className='search-results'>
                    { searchResults ? searchResults.map(item => {
                    return  <div className="movie-list-item" key={item.imdbID}>
                    <img className="movie-img" src={item.Poster} alt="{item.Title}" />
                    <h4>{item.Title}</h4>
                    <p>{item.Year}</p>
                        <div className='nominate-button'>
                        <button onClick={(e) => handleNominationSubmit(e,item)}>Nominate</button>
                        </div>
                    </div>
        
                }) : console.log("loading")

                }
                </div>
            </div>
    </>

    )
}


export default MovieSearchComponent