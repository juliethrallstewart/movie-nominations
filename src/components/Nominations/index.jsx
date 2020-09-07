import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'
import { setState } from "expect/build/jestMatchersObject";

const NominationsComponent = () => {

    const {searchResults, setResults, searchTerms,setSearchTerms, nominations, setNomination, 
          apiKey, apiTitle, apiSearch, plot, setPlot} = useContext(NominationsContext)

    const nominationsRef = useRef(nominations)
    nominationsRef.current = nominations

    const handlePlotSubmit = (e, movie) => {
        e.preventDefault()
        setSearchTerms(movie)
        axios.get(apiTitle)
        .then(res => {
            console.log(res.data, "RES");
            localStorage.setItem('movie-info', res.data);
            setPlot(res.data)

        })
        .catch(err => console.log("no results match query"))
        }

    const handleDeleteSubmit = (e, movie) => {
        e.preventDefault()
        movie.nominated = false
        setNomination(nominations.filter(i => i.Title !== movie.Title))
        
        // console.log(nominations, "NOM NOM NOM")
    
    }

    useEffect(() => {
        setNomination(nominations)
    }, [setNomination, nominations])

    return (
        <>
            <div className="nominations-component">
                <h2>Nominations</h2>
                <div className='nominations-results'>
                    { nominationsRef.current ? nominationsRef.current.map(item => {
                    return  <div className="nomination-list-item" key={item.imdbID}>
                    <img src={item.Poster} alt="{item.Title}" />
                    <h4>{item.Title}</h4>
                    <p>{item.Year}</p>
                        <div className='remove-button'>
                        {/* need to remove */}
                            <button onClick={(e) => handleDeleteSubmit(e,item)} className="delete-btn">Remove</button>
                            {/* /*need to toggle plot button*/}
                            <button onClick={(e) => handlePlotSubmit(e,item.Title)} className="movie-into-btn">Synopsis</button>
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