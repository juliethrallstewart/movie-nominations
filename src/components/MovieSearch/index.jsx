import React, { useContext } from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const MovieSearchComponent = () => {

    const {setResults, searchTerms,setSearchTerms, nominations, apiSearch } = useContext(NominationsContext)

    // Handle submit checks the results from the axios call against the items in the nominations list and adds the
    // nominate = true property to them if they are in the nominations list - this ensures their "nominate" button will be disabled
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

    return (
        <>
            <div className="search-input-component">
                <form onSubmit={handleSubmit}>
                    <input 
                    type="textarea"
                    name="search"
                    placeholder="search"
                    onChange={handleChange}
                    value={searchTerms}
                    className="search-input"
                    ></input>
                    <button className="submit-btn">Submit</button>
                </form>
            </div>
    </>

    )
}


export default MovieSearchComponent