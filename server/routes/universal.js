import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import createServerStore from '../serverStore';
import App from '../../src/containers/App';

// A simple helper function to prepare the HTML markup
const prepHTML = (data, { html, head, body }) => {
    data = data.replace('<html lang="zh-tw">', `<html ${html}`);
    data = data.replace('</head>', `${head}</head>`);
    data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    return data;
};

const universalLoader = (req, res) => {
    // Load in our HTML file from our build
    const builtFile = path.resolve(__dirname, '../../build/index.html');

    fs.readFile(builtFile, 'utf8', (err, htmlData) => {
        // If there's an error... serve up something nasty
        if (err) {
            console.error('universalLoader, readFile ERROR', err);
            return res.status(404).end();
        }

        // Create a store and sense of history based on the current path
        const { store, history } = createServerStore(req.path);

        // Render App in React
        const routeMarkup = renderToString(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Route component={App} />
                </ConnectedRouter>
            </Provider>,
        );

        // Let Helmet know to insert the right tags
        const helmet = Helmet.renderStatic();

        // Form the final HTML response
        const html = prepHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
            body: routeMarkup
        });

        console.log('universalLoader');
        // Up, up, and away...
        // console.log(html);
        // res.send(html);
        res.status(200).send(html);
    });
};

export default universalLoader;