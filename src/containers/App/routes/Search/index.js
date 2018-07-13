import React, {Component} from 'react';
import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

import PostCover from '../Home/PostCover';

import '../Home/home.css';
import './search.css';

const mapStateToProps = state => ({ 
    searchPosts: state.searchPosts,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    
}, dispatch));
class Search extends Component {
    // componentDidMount () {
    //     let {location, searchPosts} = this.props;
    //     if (location.pathname !== `/search/${searchPosts.query}`) {
    //         this.props.history.push("/");
    //         return;
    //     };
    // }
    render () {
        const { query, posts } = this.props.searchPosts;
        return (
            <div className="u-padding-t-40">
                <Helmet>
                    <title>Cat Crush | {query}</title>
                </Helmet>
                {/* <div className="u-margin-header"> */}
                    <div className="container home-container">
                        <div className="search-result u-text-center">
                            <h4>{query}</h4>
                        </div>
                        <article className="articles">
                            {
                                posts.map((post, index) => (
                                    <LazyLoad key={index}>
                                        <Link
                                            to={{
                                                pathname: `/search/${query}/${post.cuid}`,
                                                // this is the trick!
                                                state: {
                                                    isShowPostModal: true,
                                                    modalPath: `/search/${query}`
                                                }
                                            }}
                                        >
                                            <PostCover
                                                cuid={post.cuid}
                                                cover={post.cover}
                                                title={post.title}
                                                avatar={post.author.avatar}
                                                introduction={post.charactor} 
                                            />
                                        </Link>
                                    </LazyLoad>
                                ))
                            }
                        </article>
                    </div>     
                {/* </div> */}
            </div>
        );
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);