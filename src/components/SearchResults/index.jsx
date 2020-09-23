import React, { useContext } from "react";
import NominationsContext from '../../contexts/NominationsContext'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { AiFillStar } from 'react-icons/ai';

// import Loader from 'react-loader-spinner'



const SearchResultsComponent = () => {

    const {searchResults, nominations, setNomination, setCounter, counter,
         bannerStatus, setBannerStatus} = useContext(NominationsContext)

    // Add nominated = true property to movie item
    // Add movie to nominations list
    // Increments counter which tracks number of items nominated
    const handleNominationSubmit = (e, item) => {
        e.preventDefault()
        if (nominations.length < 5) {
            item.nominated = true
            setCounter(counter + 1)
            setNomination([...nominations, item])
        } else {
            setBannerStatus(!bannerStatus)
        }
        
    }

    return (
        <>
            <div className='results-component'>
                <div className="results-header">
                    <h3>Search Results</h3>
                </div>
                <div className="results-box">

                    { searchResults ? searchResults.map((item,i) => {
                        return  <div className="list-item" key={i}>
                        <ul>
                            <div className="star-icon"><AiFillStar color={'gold'} size={'1.5em'}/></div>
                            <div className="result-title">
                            <li>{item.Title} ({item.Year})</li>
                            </div>
                            <li className='nominate-line-item-btn'>
                                <button className='nominate-btn' disabled={item.nominated} onClick={(e) => handleNominationSubmit(e,item)}>{item.nominated ? "Nominated" : "Nominate"}</button>
                            </li>
                        </ul>                  
                    </div>
    // potential loader : loading ? <Loader type="Oval" color="#00BFFF" height={80} width={80} /> : searchResults

            }) : console.log("LOADING")
            }
                </div>
            </div>
        </>
    )
}

export default SearchResultsComponent