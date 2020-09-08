import React, { useContext, useEffect} from "react";
import axios from "axios";
import NominationsContext from '../../contexts/NominationsContext'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const MovieSearchComponent = () => {

    const {setResults, searchResults, searchTerms,setSearchTerms, nominations, apiSearch, setLoading} = useContext(NominationsContext)

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
            setLoading(true)
            setResults(results)
            setLoading(false)

        })
        .catch(err => console.log(err))
        }

    const handleChange = e => {
        setSearchTerms(e.target.value);
    };

    return (
        <>
            <div className="search-input-component">
                <h2>Search for your favorite Movies</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="search"
                    name="search"
                    placeholder="search"
                    onChange={handleChange}
                    value={searchTerms}
                    className = "search-input"
                    ></input>
                    <button>Submit</button>
                </form>
            </div>
    </>

    )
}


export default MovieSearchComponent