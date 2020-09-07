import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'

const MovieSearchComponent = () => {

    const {searchResults, setResults, searchTerms,setSearchTerms, nominations, setNomination, 
          apiSearch} = useContext(NominationsContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(apiSearch)
        .then(res => {
            let results = res.data['Search']
            for (let i of results) {
                for (let y of nominations) {
                    if (i.Title === y.Title) {
                        i.nominated = true
                    } 
                }
            }
            console.log(results, "RESULTS IN HANDLE SUBMIT")
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
        setNomination([...nominations, item])

        // console.log(searchResults, "SEARCH RESULTS")
    }

    // console.log(nominations, "NOMINATIONS")
    const searchResultsRef = useRef(searchResults)
    searchResultsRef.current = searchResults

    useEffect(
        () => {
            nominations && localStorage.setItem('nominations', JSON.stringify(nominations));
        },
        [ nominations ]
    );

    // useEffect(
    //     () => {
    //     searchResults && localStorage.setItem('searchResults', JSON.stringify(searchResults));
    //     },
    //     [ searchResults, setResults ]
    // );

    useEffect(
        () => {
        setResults(searchResults);
        },
        [ searchResults, setResults ]
    );
  
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
                    { searchResultsRef.current ? searchResultsRef.current.map((item,i) => {
                        return  <div className="movie-list-item" key={i}>
                        <img className="movie-img" src={item.Poster} alt="{item.Title}" />
                        <h4>{item.Title}</h4>
                        <p>{item.Year}</p>
                             <div className='nominate-button'>
                            <button disabled={item.nominated} onClick={(e) => handleNominationSubmit(e,item)}>{item.nominated ? "Nominated" : "Nominate" }</button>
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