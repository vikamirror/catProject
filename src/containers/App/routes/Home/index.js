import React, {Component} from 'react';
import Helmet from 'react-helmet';

import PostCover from './PostCover';
import { testDatas } from './testData';

import './home.css';

class Home extends Component {
    render () {
        return (
            <div>
                <Helmet>
					<title>Home</title>
				</Helmet>
                <div className="u-margin-header">
                    <div className="container">
                        <article className="articles">
                        {
                            testDatas.map((post) => (
                                <div key={post.cuid}>
                                    <PostCover 
                                        image={post.image}
                                        title={post.title}
                                        introduction={post.content} />
                                </div>
                            ))
                        }
                        </article>
                    </div>     
                </div>
            </div>
        );
    }
}

export default Home;