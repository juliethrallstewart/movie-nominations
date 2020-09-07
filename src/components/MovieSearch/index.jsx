import React, { useContext, useRef } from "react";
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
        }

    const handleChange = e => {
        setSearchTerms(e.target.value);
    };

    const handleNominationSubmit = (e, item) => {
        e.preventDefault()
        e.stopPropagation()        
        item.nominated = true
        setNomination([...nominations, item])
    }

    const searchResultsRef = useRef(searchResults)
    searchResultsRef.current = searchResults
  
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