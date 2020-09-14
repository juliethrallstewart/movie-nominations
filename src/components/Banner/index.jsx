import React, {useContext} from "react";
import NominationsContext from '../../contexts/NominationsContext'


const Banner = () => {
    const {counter, bannerStatus, setBannerStatus} = useContext(NominationsContext)

    return ( 
        <div className={counter > 3 && bannerStatus === true ? "banner-box" : "hidden"}>
            <div className="banner-content">
                <div className="close-button-box">
                    <button className="close-button" onClick={(() => {setBannerStatus(!bannerStatus); console.log("status", bannerStatus)})}>X</button>
                </div>
                <div className="banner-message">
                    <h3 className="banner-font">You've reached your max 5 nominations!</h3> 
                    <h3 className="banner-font">Remove a nomination to make a different selection.</h3>
                </div>
            </div>
        </div>
    )

}

export default Banner