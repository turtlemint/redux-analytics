import React from 'react';
import ReactDOM from  'react-dom';
import configureStore, { history } from './configure-store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import AppRouter from './router';

export const store = configureStore(/* provide initial state if any */)


const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppRouter />
            </ConnectedRouter>
        </Provider>
    );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);


