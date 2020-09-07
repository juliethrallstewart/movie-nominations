import React, { useEffect, useContext, useRef } from "react";
import NominationsContext from '../../contexts/NominationsContext'


const Banner = () => {
    const {counter} = useContext(NominationsContext)

    return ( 
        <div className={counter === 5 ? "banner-box" : "banner-box-hidden"}>
            <h3>You've reached your max 5 nominations!</h3>
        </div>
    )

}

export default Banner