import React, { useEffect, useContext, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'

const NominationsComponent = () => {

    const {searchResults, setResults, searchTerms, setSearchTerms, nominations, setNomination, 
          apiTitle, apiSearch, details, setDetails, setCounter, counter} = useContext(NominationsContext)

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
        .catch(err => console.log(err))
        }

    const handleDeleteSubmit = (e, movie) => {
        e.preventDefault()
        delete movie.nominated 
        setNomination(nominations.filter(i => i.Title !== movie.Title))
        setCounter(counter - 1)

            
    }

    useEffect(() => {
        axios.get(apiSearch)
        .then(res => {
            let results = res.data['Search']
            for (let i in results) {
                for (let y of nominations) {
                    if (results[i].Title === y.Title) {
                        results[i].nominated = true
                    } 
                }
            }
            setResults(results)
        })
        .catch(err => console.log(err))
    }, [nominations])
  
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