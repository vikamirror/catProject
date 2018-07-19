import React, {Component} from 'react';
import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

import PostCover from '../Home/PostCover';
import { loadingTrue, loadingFalse } from '../../../../redux/isLoading';
import { requestSearch, clearSearch } from '../../../../redux/searchPosts';

import '../Home/home.css';
import './search.css';

const mapStateToProps = state => ({ 
    searchPosts: state.searchPosts,
    isLoading: state.isLoading,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
    requestSearch: requestSearch,
    clearSearch: clearSearch,
}, dispatch));
class Search extends Component {
    componentDidMount () {
        if (!this.props.match.params.query) {
            this.props.history.push("/");
            return;
        };
        this.props.loadingTrue();
        const loadedIds = this.props.searchPosts.loadedIds;
        const query = this.props.match.params.query;
        this.props.requestSearch(query, loadedIds);
    }
    componentDidUpdate (prevProps) {
        if (this.props.match.params.query !== prevProps.match.params.query) {
            this.props.loadingTrue();
            this.props.clearSearch();
            const loadedIds = this.props.searchPosts.loadedIds;
            const query = this.props.match.params.query;
            this.props.requestSearch(query, loadedIds);
        };
        if (this.props.searchPosts.query && (this.props.searchPosts.query !== prevProps.searchPosts.query)) {
            this.props.loadingFalse();
        };
    }
    componentWillUnmount () {
        this.props.loadingFalse();
        this.props.clearSearch();
    }
    render () {
        const { query, posts } = this.props.searchPosts;
        if (this.props.isLoading) {
            return <div></div>;
        };
        return (
            <div className="u-padding-t-24">
                <Helmet>
                    <title>Cat Crush | {query}</title>
                </Helmet>
                <div className="container home-container">
                    <div className="search-result u-text-center">
                        <div className="font-size-24 u-mb-16">{query}</div>
                        { !posts.length ? <div className="font-size-16 u-mb-16">查無資料</div> : '' }
                    </div>
                    <article className="articles">
                        {
                            posts.map((post, index) => (
                                <LazyLoad key={index}>
                                    <Link
                                        to={{
                                            pathname: `/search/${query}/${post.cuid}`,
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
            </div>
        );
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);