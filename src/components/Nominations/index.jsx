import React, { useEffect, useContext } from "react";
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
  
    return (
        <>
            <div className="nominations-results-component">
                <h2>Nominations</h2>
                    { nominations ? nominations.map((item,i) => {
                    return  <div className="nomination-list-item" key={i}>
                                <ul>
                                    <li className={"details-card-link"} onClick={(e) => handleMovieDetailSubmit(e,item.Title)}>{item.Title} ({item.Year})</li>
                                    {/* Complete details card IN PROGRESS */}
                                    {/* <div className={details.length > 0 ? "details-card" : "hidden"}>
                        
                                        </div> */}
                                    <div className='remove-button'>
                                        <button onClick={(e) => handleDeleteSubmit(e,item)} className="delete-btn">Remove</button>
                                    </div>
                                </ul>
                            </div>
        
                        }) : console.log("loading")

                    }
            </div>
    </>

    )
}


export default NominationsComponent