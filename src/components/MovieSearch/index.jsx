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
            // console.log(res.data, "RES");
            localStorage.setItem('results', res.data['Search']);
            let results = res.data['Search']
            for (let i in results) {
                for (let y in nominations) {
                    if (i.Title === y.Title) {
                        i.nominated = true
                    }
                    i.nominated = false
                }
            }
            setResults(results)

        })
        .catch(err => console.log("no results match query"))
        }

    const handleChange = e => {
        setSearchTerms(e.target.value);
    };

    // console.log(searchResults, "SEARCH RESULTS")


    const handleNominationSubmit = (e, item) => {
        e.preventDefault()
        e.stopPropagation()
        item.nominated = true
        // console.log(item, "ITEM IN HANDLER")

        setNomination([...nominations, item])
    }

    // console.log(nominations, "NOMINATIONS")
   
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
                        // for (let i of nominations) {if (i.Title === item.Title) {item.nominated = true} else {item.nominated = false}}
                        // console.log(nominations, "NOMINATIONS INTO SEARCH THING")
                        return  <div className="movie-list-item" key={item.imdbID}>
                        <img className="movie-img" src={item.Poster} alt="{item.Title}" />
                        <h4>{item.Title}</h4>
                        <p>{item.Year}</p>
                            <div className={!item.nominated ? 'nominate-button' : 'nominate-button nominated-true'}>
                            <button disabled={item.nominated} onClick={(e) => handleNominationSubmit(e,item)}>{!item.nominated ? "Nominate" : "Nominated" }</button>
                            </div>
                            {/* {console.log(item, "ITEM")} */}
                        </div>
        
                }) : console.log("loading")

                }
                </div>
            </div>
    </>

    )
}


export default MovieSearchComponent