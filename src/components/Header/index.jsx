import React from "react";
import movieReel from '../../assets/anika-mikkelson-dWYjy9zIiF8-unsplash.jpg'

const Header = () => {
    return ( 
        <div className="App-header">
             <div className="logo-text">
                <h1> The Shoppies</h1>
            </div>
            <div className="img-header">
                <img src={movieReel} alt="movie reel" className="reel-img"/>
            </div>
            <div className="headline">
                <h2>Pick your top 5 Shoppies nominations and share with friends! </h2>
            </div>
        </div>
    )

}

export default Header