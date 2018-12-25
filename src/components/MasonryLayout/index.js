import React from 'react';
import Masonry from 'react-masonry-component';

import './masonryLayout.css';

const masonryOptions = {
    transitionDuration: '0.4s',
    itemSelector: '.postCover',
    columnWidth: '.postCover',
    gutter: 8,
    fitWidth: true
};

// const imagesLoadedOptions = { background: '.my-bg-image-el' }
/*
class MasonryPosts extends Component {
    render() {
        return (  
            <Masonry
                className="masonry-grid" // default ''
                elementType="div" // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                // imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {this.props.children}
            </Masonry>
        );
    };
};
 */

const MasonryLayout = ({children}) => (
    <Masonry
        className="masonry-grid" // default ''
        elementType="div" // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        // imagesLoadedOptions={imagesLoadedOptions} // default {}
    >
        {children}
    </Masonry>
);

export default MasonryLayout;

