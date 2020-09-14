import React, {useContext, useEffect} from "react";
import NominationsContext from '../../contexts/NominationsContext'


const Banner = () => {
    const {counter} = useContext(NominationsContext)

    // useEffect(() => {
    //     if (nominations.length === 6) {
    //         setNomination(nominations.slice(0,5))
    //     } 
    // }, [nominations, setNomination])

    return ( 
        <div className={counter > 4 ? "banner-box" : "hidden"}>
            <h3 className="banner-font">You've reached your max 5 nominations!</h3> 
            <h3 className="banner-font">Remove a nomination to make a different selection.</h3>
        </div>
    )

}

export default Banner