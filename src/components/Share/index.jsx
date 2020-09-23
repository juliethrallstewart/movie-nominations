import React from "react";
import movieReel from '../../assets/anika-mikkelson-dWYjy9zIiF8-unsplash.jpg'

import {
    FacebookShareButton,
    PinterestShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

  import {
    FacebookIcon,
    PinterestIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

const ShareComponent = () => {

    const shareUrl = 'https://loving-bassi-6b1411.netlify.app/'
    const title = 'My Shoppies Nominations';

    return ( 
        <div className="share-component">
            <div className="share-container">
                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="share-button"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </div>
            <div className="share-container">
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="share-button"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </div>
            <div className="share-container">
                <PinterestShareButton
                    url={String(window.location)}
                    media={`${String(window.location)}/${movieReel}`}
                    className="share-button"
                >
                    <PinterestIcon size={32} round />
                </PinterestShareButton>
            </div>
            <div className="share-container">
                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=":: "
                    className="share-button"
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
        </div>
    )

}

export default ShareComponent