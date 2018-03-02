import React, {Component} from 'react';
import Helmet from 'react-helmet';

class Home extends Component {
    render () {
        return (
            <div>
                <Helmet>
					<title>Home</title>
				</Helmet>
                Home
            </div>
        );
    }
}

export default Home;