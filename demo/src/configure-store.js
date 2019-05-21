import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware} from 'redux';
import { Analytics, analyticsMiddleware } from 'next-react-analytics';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './root-reducer';
import { routerMiddleware } from 'connected-react-router'
import segmentTagClick from './analytics/listeners/segment-tag-click';
import pageViewListener from './analytics/listeners/page-view';
 
const analytics = new Analytics([segmentTagClick, pageViewListener]);
export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        composeWithDevTools(
            compose(
                applyMiddleware(
                    routerMiddleware(history),
                    analyticsMiddleware(analytics)
                )
            )
        ),
        
    );
    return store;
}

