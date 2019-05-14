import { createStore, combineReducers, applyMiddleware} from 'redux';
import analyticsMiddleware from './middlewares/analyticsMiddleware';
import analyticsReducer from './reducers/analytics';
import { Analytics } from '../index';
import segmentTagClick from './analytics/listeners/segment-tag-click';

const tracker = new Analytics([segmentTagClick]);

const store = createStore(
    analyticsReducer,
    applyMiddleware(analyticsMiddleware(tracker))
);

export default store;

