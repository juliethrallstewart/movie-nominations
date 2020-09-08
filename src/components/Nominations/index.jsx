import React, { useEffect, useContext, useRef } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'

const NominationsComponent = () => {

    const {setResults, nominations, setNomination, apiKey, apiSearch, details, setDetails, setCounter, counter} = useContext(NominationsContext)

    const nominationsRef = useRef(nominations)
    nominationsRef.current = nominations

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

    const handleDeleteSubmit = (e, movie) => {
        e.preventDefault()
        delete movie.nominated 
        setCounter(counter - 1)
        setNomination(nominations.filter(i => i.Title !== movie.Title))
               
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
    }, [nominations, apiSearch, setResults])
  
    return (
        <>
            <div className="nominations-results-component">
                <h2>Nominations</h2>
                    { nominations ? nominations.map((item,i) => {
                    return  <div className="nomination-list-item" key={i}>
                        <ul>
                            <li className={"details-card-link"} onClick={(e) => handleMovieDetailSubmit(e,item.Title)}>{item.Title} ({item.Year})</li>
                            {/* Complete details card NEXT */}
                            {/* <div className={details.length > 0 ? "details-card" : "hidden"}>
                        
                            </div> */}
                                <div className='remove-button'>
                                    <button onClick={(e) => handleDeleteSubmit(e,item)} className="delete-btn">Remove</button>
                                </div>
                        </ul>
                    </div>
        
                }) : console.log("loading")

                }
                {/* </div> */}
            </div>
    </>

    )
}


export default NominationsComponent