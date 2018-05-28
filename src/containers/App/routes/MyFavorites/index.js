import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostPreview from '../../../../components/PostBody/PostPreview';
import { loadingTrue, loadingFalse } from '../../../../redux/isLoading';
import * as postAPI from '../../../../fetch/postAPI';
import LoadingSpinner from '../../Loading/LoadingSpinner';

const mapStateToProps = state => ({
    member: state.member,
    isLoading: state.isLoading,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
}, dispatch));
class MyFavorites extends Component {
    constructor () {
        super();
        this.state = {
            favoritePosts: [],
            isFetched: false,
        };
    }
    componentDidMount () {
        if (!this.props.member.cuid) {
            this.props.history.push("/");
            return;
        }
        postAPI
            .getFavoritePosts()
            .then((res) => {
                this.setState({
                    favoritePosts: [...res.data.posts],
                    isFetched: true,
                });
            })
            .catch(err => console.error(err.response.data))
    }
    render () {
        return (
            <div className="myFavorites-wrapper">
                <div className="u-margin-header u-padding-b-40">
                    <div className="container">
                    {
                        !this.state.isFetched ?
                        <div className="loadingWrapper u-wrapper-fixed-w100-h100 z-index-100 u-text-center">
                            <LoadingSpinner isLoading={true} />
                        </div>
                        :
                        <div>
                        {
                            this.state.favoritePosts.length > 0 ?
                                this.state.favoritePosts.map((post, index) => (
                                    <PostPreview key={index} post={post} />
                                ))
                                :
                                <div className="fake-new-post form u-margin-t-40 u-margin-b-40">
                                    <div className="postWrapper u-text-center u-padding-64 font-grey">
                                        想追蹤的貓咪按下 收藏
                                        <div className="icon-btn font-lightcoral"><i className="icon font-size-18 icon-heart" /></div>
                                        後，列表會顯示在這裡
                                    </div>
                                </div>
                        }
                        </div>
                    }                        
                    </div>
                </div>
            </div>
        );
    }
}
MyFavorites.propTypes = {
    member: PropTypes.object.isRequired,  
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);