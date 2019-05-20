import { createStore, combineReducers, applyMiddleware} from 'redux';
import {Analytics, analyticsMiddleware} from 'next-react-analytics';
import analyticsReducer from './reducers/analytics';
import segmentTagClick from './analytics/listeners/segment-tag-click';

const analytics = new Analytics([segmentTagClick]);

const store = createStore(
    analyticsReducer,
    applyMiddleware(analyticsMiddleware(analytics))
);

export default store;

