import React, {useContext} from "react";
import NominationsContext from '../../contexts/NominationsContext'


const Banner = () => {
    const {counter} = useContext(NominationsContext)

    return ( 
        <div className={counter > 4 ? "banner-box" : "hidden"}>
            <h3 className="banner-font">You've reached your max 5 nominations!</h3> 
            <h3 className="banner-font">Remove a nomination to make a different selection.</h3>
        </div>
    )

}

export default Banner