import React, {useContext} from "react";
import NominationsContext from '../../contexts/NominationsContext'


const Banner = () => {
    const {counter} = useContext(NominationsContext)

    return ( 
        <div className={counter === 4 ? "banner-box" : "hidden"}>
            <h3>You've reached your max 5 nominations!</h3>
        </div>
    )

}

export default Banner