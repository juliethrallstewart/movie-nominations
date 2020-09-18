import React, { useEffect, useContext, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'

const NominationsComponent = () => {

    const {setResults, nominations, setNomination, apiKey, apiSearch, details, setDetails, setCounter, counter} = useContext(NominationsContext)


    const handleMovieDetailSubmit = (e, movie) => {
        e.preventDefault()
        axios.get(`https://www.omdbapi.com/?t=${movie}&plot=full&apikey=${apiKey}`
        )
        .then(res => {
            console.log(res.data, "RES");
            setDetails([...details, res.data])
            

        })
        .catch(err => console.log(err))
        }
    //Removes nominate = true from the movie and this simultaneously updates the disabled nominate button
    //if the movie is also being displayed in the current search results

    //Removes the movie from the nominations list

    //Decrements the counter which tracks the number of movies currently nominated
    const handleDeleteSubmit = (e, movie) => {
        e.preventDefault()
        delete movie.nominated 
        setCounter(counter - 1)
        setNomination(nominations.filter(i => i.Title !== movie.Title))
               
    }
    // if the nominations list updates this will update the currently displayed results list nominate buttons
    // from disabled to enabled
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
    }, [nominations, apiSearch, setResults])

    const detailsRef = useRef()

    const handleClick = e => {
        if (detailsRef.current) {
            if (detailsRef.current.contains(e.target)) {
          // inside click
            return
         }
        }
        setDetails(details.slice(0,0))
      };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);
  
    return (
        <>

            <div className="results-component">
                <div className="results-header">
                    <h3>Nominations</h3>
                </div>
                <div className="results-box">
                    { nominations ? nominations.map((item,i) => {
                    return  <div className="list-item nominations-list-item" key={i}>
                                <ul>
                                    <li className={"details-card-link"} onClick={(e) => handleMovieDetailSubmit(e,item.Title)}>{item.Title} ({item.Year})</li>
                                    {/* Complete details card IN PROGRESS */}
                                    <div ref={detailsRef} className={details.length > 0 ? "details-card" : "hidden"}>
                                        <div className="close-button-box">
                                            <button className="close-button" onClick={(() => setDetails(details.slice(0,0)))}>X</button>
                                        </div>
                                        <div className="details-box">
                                            { details ? details.map((item,i) => {
                                                return  <div className="list-item" key={i}>
                                                <div className="movie-poster-box">
                                                    <img className="movie-poster" src={item.Poster} alt="Movie Poster"/>
                                                    <h3>{item.Title} ({item.Year})</h3>
                                                </div>
                                                <p><span>Rated</span>: {item.Rated}</p>
                                                <p><span>Released:</span> {item.Released}</p>
                                                <p><span>Genre:</span> {item.Genre}</p>
                                                <p><span>Awards:</span> {item.Awards}</p>
                                                <p><span>Imdb Rating:</span> {item.imdbRating}</p>
                                                <p><span>Metascore:</span> {item.Metascore}</p>
                                                <p><span>Production:</span> {item.Production}</p>
                                                <p><span>Director:</span> {item.Director}</p>
                                                <p><span>Writer:</span> {item.Writer}</p>
                                                <p><span>Actors:</span> {item.Actors}</p>
                                                <p><span>Plot:</span> {item.Plot}</p>
                                            </div>
                                            // potential loader : loading ? <Loader type="Oval" color="#00BFFF" height={80} width={80} /> : searchResults

                                            }) : console.log("LOADING")
                                            }
                                            </div>
                                    </div>
                                    <div className='remove-button'>
                                        <button onClick={(e) => handleDeleteSubmit(e,item)} className="delete-btn">Remove</button>
                                    </div>
                                </ul>
                            </div>
        
                        }) : console.log("loading")

                    }
                </div>
            </div>
    </>

    )
}


export default NominationsComponent