import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostCover from './PostCover';
import Post from './Post';
// import { fetchPosts } from '../../../../redux/postList';

import './home.css';

const mapStateToProps = state => ({ postList: state.postList });
const mapDispatchToProps = dispatch => (bindActionCreators({ }, dispatch));
class Home extends Component {
    handleModalClose () {
        this.props.routing.location.push('/');
    }
    render () {
        return (
            <Router>
                <div>
                    <div>
                        <Helmet>
                            <title>Home</title>
                        </Helmet>
                        <div className="u-margin-header">
                            <div className="container home-container">
                                <article className="articles">
                                {
                                    this.props.postList.map((post) => (
                                        <PostCover
                                            key={post.cuid}
                                            cuid={post.cuid}
                                            cover={post.cover}
                                            title={post.title}
                                            avatar={post.author.avatar}
                                            introduction={post.charactor} 
                                        />
                                    ))
                                }
                                </article>
                            </div>     
                        </div>
                    </div>
                    <Route exact path={`/post/:cuid`} component={Post} />
                </div>
            </Router>
        );
    }
}

Home.propTypes = {
    postList: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);