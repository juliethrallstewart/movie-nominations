import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'
import { setState } from "expect/build/jestMatchersObject";

const NominationsComponent = () => {

    const {searchResults, setResults, searchTerms, setSearchTerms, nominations, setNomination, 
          apiTitle, apiSearch, details, setDetails} = useContext(NominationsContext)

    const nominationsRef = useRef(nominations)
    nominationsRef.current = nominations

    const handleMovieDetailSubmit = (e, movie) => {
        e.preventDefault()
        setSearchTerms(movie)
        axios.get(apiTitle)
        .then(res => {
            console.log(res.data, "RES");
            setDetails(res.data)

        })
        .catch(err => console.log("no results match query"))
        }
    const refreshSearchResults = () => {}

    const handleDeleteSubmit = (e, movie) => {
        e.preventDefault()
        delete movie.nominated 
        // console.log(apiSearch, 'SEARCH TERMS')

        setNomination(nominations.filter(i => i.Title !== movie.Title))
        // setResults(searchResults.filter(i => i.Title !== movie.Title))
        // setResults([...searchResults, movie])
        // setResults(results)
   

        
        console.log(searchResults, "SR")
            
    }



    useEffect(
		() => {
			nominations && localStorage.setItem('nominations', JSON.stringify(nominations));
		},
		[ nominations ]
  );

    useEffect(() => {
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
    }, [nominations])
  
    // useEffect(
    //     () => {
    //         searchResults && localStorage.setItem('searchResults', JSON.stringify(searchResults));
    //     },
    //     [ searchResults ]
    // );

    useEffect(
        () => {
        setResults(searchResults);
        },
        [ searchResults, setResults ]
    );

    return (
        <>
            <div className="nominations-component">
                <h2>Nominations</h2>
                <div className='nominations-results'>
                    { nominations ? nominations.map(item => {
                    return  <div className="nomination-list-item" key={item.imdbID}>
                    <img src={item.Poster} alt="{item.Title}" />
                    <h4>{item.Title}</h4>
                    <p>{item.Year}</p>
                        <div className='remove-button'>
                        {/* need to remove */}
                            <button onClick={(e) => handleDeleteSubmit(e,item)} className="delete-btn">Remove</button>
                            {/* /*need to toggle plot button*/}
                            <button onClick={(e) => handleMovieDetailSubmit(e,item.Title)} className="movie-into-btn">Details</button>
                        </div>
                    </div>
        
                }) : console.log("loading")

                }
                </div>
            </div>
    </>

    )
}


export default NominationsComponent