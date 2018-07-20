import React, { Component } from 'react';

import { errorLog } from '../../../Utils/console';
import * as imgurAPI from '../../../fetch/imgurAPI';

import './uploadPostCover.css';

export default class UploadPostCover extends Component {
    constructor () {
        super();
        this.state = {
            imageURL: '',
        };
    }
    componentDidMount () {
        this.hasImageOrNot();
    };
    hasImageOrNot () {
        if (this.props.image) {
            this.setState({imageURL: this.props.image});
        }
    }
    handleLoading (isLoading) {
        this.props.handleLoading(isLoading);
    }
    onChangeFileUpload (evt) {
        if (evt.target.files && evt.target.files[0]) {
            this.handleLoading(true);
            const FR = new FileReader();
            FR.readAsDataURL(evt.target.files[0]);
            FR.onload = (e) => {
                const base64 = e.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
                // console.log('base64:', base64);
                imgurAPI.uploadImgur(base64)
                        .then((imgurRes) => {
                            // console.log('res.data.data.link:',res.data.data.link);
                            this.setState({
                                imageURL: imgurRes.data.data.link,
                            });
                            this.handleLoading(false);
                        })
                        .catch(err => errorLog('imgurAPI.uploadImgur, error: ', err));
            };
        }
    }
    render () {
        return (
            <div className="upload-post-cover u-margin-b-16">
                {
                    this.state.imageURL ?
                    <div className="">
                        <div className="imageBox">
                            <div className="imageBox__ratio imageBox__ratio__3-4">
                                <div className="image" style={{ backgroundImage: `url(${this.state.imageURL})` }}></div>
                            </div>
                            <div className="re-upload">
                                重新選擇封面
                                <input type="file" onChange={(evt) => this.onChangeFileUpload(evt)} />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="cover-upload-btn">
                        <button className="btn">
                            <div className="icon-btn"><i className="icon icon-picture" /></div>
                            上傳封面
                        </button>
                        <input type="file" onChange={(evt) => this.onChangeFileUpload(evt)} />
                    </div>
                }
            </div>
        );
    }
}