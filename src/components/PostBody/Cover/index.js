import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadingTrue, loadingFalse } from '../../../redux/isLoading';
import { changeCover } from '../../../redux/post';
import { showDialog } from '../../../redux/dialog';
import * as imgurAPI from '../../../fetch/imgurAPI';
import { errorLog, warningLog } from '../../../Utils/console';

import './cover.css';

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    post: state.post,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
    changeCover: changeCover,
    showDialog: showDialog,
}, dispatch));
class Cover extends Component {
    onChangeFileUpload (evt) {
        if (evt.target.files && evt.target.files[0]) {
            this.props.loadingTrue();
            const imgForUpload = evt.target.files[0];
            if (/^image\//i.test(imgForUpload.type)) {
                imgurAPI.uploadImgur(imgForUpload)
                        .then((imgurRes) => {
                            // console.log('imgurRes', imgurRes);
                            // this.setState({cover: imgurRes.data.data.link});  
                            // this.props.setStateHandler('inputCover', imgurRes.data.data.link);
                            // const newPost = {
                            //     ...this.props.post,
                            //     cover: imgurRes.data.data.link //只更新cover的部分
                            // };
                            // this.props.inputPost(newPost);
                            // this.props.handleState('cover', imgurRes.data.data.link);
                            this.props.changeCover(imgurRes.data.data.link);
                            this.props.loadingFalse();
                        })
                        .catch((err) => {
                            errorLog('imgurAPI.uploadImgur, error: ', err);
                            this.props.loadingFalse();
                        });
            } else {
                warningLog('只能上傳圖片');
                this.props.showDialog({
                    type: 'warning',
                    title: '只能上傳圖片喲',
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonText: "知道了",
                    modalVerticalAlign: "middle"
                });
            }
        }
    }
    render () {
        const {isEdit, cover} = this.props;
        if (isEdit) {
            return (
                <div className="upload-post-cover u-margin-b-16">
                {
                    cover ?
                    <div className="imageBox">
                        <div className="imageBox__ratio imageBox__ratio__3-4">
                            <div className="image" style={{ backgroundImage: `url(${cover})` }}></div>
                        </div>
                        <div className="re-upload">
                            重新選擇封面
                            <input 
                                type="file"
                                // capture="camera"
                                accept="image/*"
                                onChange={(evt) => this.onChangeFileUpload(evt)} 
                            />
                        </div>
                    </div>
                    :
                    <div className="cover-upload-btn">
                        <button className="btn">
                            <div className="icon-btn"><i className="icon icon-picture" /></div>
                            上傳封面
                        </button>
                        <input 
                            type="file"
                            // capture="camera"
                            accept="image/*"
                            onChange={(evt) => this.onChangeFileUpload(evt)}
                        />
                    </div>
                }
                </div>
            );
        } else {
            if (cover === '') {
                return '';
            }
            return (
                <div className="imageBox">
                    <div className="imageBox__ratio imageBox__ratio__3-4">
                        <div className="image" style={{ backgroundImage: `url("${cover}")` }}></div>
                    </div>
                </div>
            );
        }
    }
};

Cover.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    cover: PropTypes.string.isRequired,
    loadingTrue: PropTypes.func.isRequired,
    loadingFalse: PropTypes.func.isRequired,
    changeCover: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cover);