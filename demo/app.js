import React from 'react';
import ReactDOM from  'react-dom';
import Consumer from './consumer';
import { Analytics, AnalyticsProvider } from '../index';
import segmentTagClick from './analytics/listeners/segment-tag-click';

const tracker = new Analytics([segmentTagClick]);
const App = () => {
    return (
        <AnalyticsProvider analytics={tracker}>
            <Consumer />
        </AnalyticsProvider>
        
    )
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);


