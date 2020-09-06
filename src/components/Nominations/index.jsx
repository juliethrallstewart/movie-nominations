import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'

const NominationsComponent = () => {

    const {searchResults, setResults, searchTerms,setSearchTerms, nominations, setNomination, 
          apiKey, apiTitle, apiSearch, plot, setPlot} = useContext(NominationsContext)

    

    // useEffect = (() => {

    // }, [nominations])
    const nominationsRef = useRef(nominations)

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
        delete nominations.movie
        console.log(nominations, "NOM NOM NOM")
    }
      

    return (
        <>
            <div className="nominations-component">
                <h2>Nominations</h2>
                <div className='nominations-results'>
                    { nominationsRef ? nominations.map(item => {
                    return  <div className="movie-list-item" key={item.imdbID}>
                    <img src={item.Poster} alt="{item.Title}" />
                    <h4>{item.Title}</h4>
                    <p>{item.Year}</p>
                        <div className='nominate-button'>
                        {/* need to delete */}
                            <button onClick={(e) => handleDeleteSubmit(e,item)} className="delete-btn">Delete</button>
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