![npm](https://img.shields.io/npm/v/next-react-analytics.svg) ![NPM](https://img.shields.io/npm/l/next-react-analytics.svg) 
![npm bundle size](https://img.shields.io/bundlephobia/min/next-react-analytics.svg) 


### Installation

```
yarn add next-react-analytics
```
or

```
npm i next-react-analytics --save
```

### Setup for redux app


#### defining the listeners

```
import { SEGMENT_TAG_CLICK } from '../constants';

function segmentTagClick(event, eventsHistory){
    window.dataLayer.push(event);
    return event;
}
segmentTagClick.eventType = SEGMENT_TAG_CLICK;

export default segmentTagClick;
```

`eventType` needs to be same as the `action.type` that you want to track. Important is that you *return* the event if you want to take decisions based on the `eventsHistory`. For example, to not abuse the multiple clicks of critical buttons, say `Checkout`, you want to provide a conditional check if your event is not already fed to analytics.


#### defining the store and registering the middleware

Suggest you to create a folder analytics in your src. You can place all your listeners inside listeners sub-folder moving forward.

```
import { Analytics, analyticsMiddleware } from 'next-react-analytics';
import segmentTagClick from './analytics/listeners/segment-tag-click';

const analytics = new Analytics([segmentTagClick]);

const store = createStore(
    rootReducer,
    applyMiddleware(analyticsMiddleware(analytics))
);

```

This is it for using this library.


Remember, your app works normally. Dispatch the actions and it will handle the analytics, registration for you and at the same time giving you the flexibility for calling whichever provider you require.

For example in your listener, you can call GTM or segment events and amny others as per your requirement.

```
window.dataLayer.push(event);
segment.analytics({ eventName: '', data: {}})
``` 

### Tracking page views

#### 1 - In a redux app - if you're using `connected-react-router` to maintain your history with store

When you navigate via any of the  [ways](https://github.com/supasate/connected-react-router/blob/master/FAQ.md#how-to-use-your-own-context-with-react-redux) you will basically call push function

```
    push('/some-state')
```

Now, push automatically dispatches a `@@router/LOCATION_CHANGE`. So we have a default action.type to listen to. If you probably have guessed all you need to do is maintain a one single listener function for all your page views. 

```
    const pageViewListener = (event, eventsHistory) => {
    const { pathname, search, hash} = event.payload.location;
    const locationEvent = {
        type: 'PAGE_VIEW',
        data: {
            page: pathname,
            search,
            hash
        }
    };
    // window.dataLayer.push(locationEvent);
    // segment.trackPage(locationEvent);
    return locationEvent;
}
pageViewListener.eventType = '@@router/LOCATION_CHANGE';

export default pageViewListener;
```

#### 2 - If you're using React router for your navigation

It's prabably not a solution you will keep for your apps at scale or you may have already converted your app to something more redux inclined for all your actions after realising the ease of doing extra things like analytics, error logging too.

If you have not and in process to do so, here's stackOverflow [question](https://stackoverflow.com/q/45373742/1096194) mentioning how react router provides a listener on the browserHistory to do so.

Then after which you can directly call `Analytics.callListener(event)` function to 
to dispatch an event. 

Made with love ❤️ at Turtlemint.