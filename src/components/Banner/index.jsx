import React, {useContext, useRef, useEffect} from "react";
import NominationsContext from '../../contexts/NominationsContext'

const Banner = () => {
    const {counter, bannerStatus, setBannerStatus} = useContext(NominationsContext)

    const bannerRef = useRef()

    const handleClick = e => {
        if (bannerRef.current.contains(e.target)) {
          // inside click
          setBannerStatus(!bannerStatus)
        }
        setBannerStatus(!bannerStatus)
      };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    return ( 
        <div ref={bannerRef} id="banner-box" className={counter > 4 && !bannerStatus ? "banner-box" : "hidden"}>
            <div className="banner-content">
                <div className="close-button-box">
                    <button className="close-button" onClick={(() => setBannerStatus(!bannerStatus))}>X</button>
                </div>
                <div className="banner-message">
                    <h3 className="banner-font">You've reached your max 5 nominations!</h3> 
                    <p className="banner-font">Remove a nomination to make a different selection.</p>
                </div>
            </div>
        </div>
    )

}

export default Banner