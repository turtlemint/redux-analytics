import React from 'react';
import ReactDOM from  'react-dom';
import Consumer from './consumer';
import store from './store';
import { Provider } from 'react-redux';


const App = () => {
    return (
        <Provider store={store}>
            <Consumer />
        </Provider>
    );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);


