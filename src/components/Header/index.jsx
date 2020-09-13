import React from "react";
import movieReel from '../../assets/anika-mikkelson-dWYjy9zIiF8-unsplash.jpg'

const Header = () => {
    return ( 
        <div className="App-header">
            <div className="img-header">
                <img src={movieReel} alt="movie reel" className="reel-img"/>
            </div>
            <div className="headline">
                <h3>Pick your top 5 Oscar Nominations and share with friends!
                </h3>
            </div>
        </div>
    )

}

export default Header