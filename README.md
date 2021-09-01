![npm](https://img.shields.io/npm/v/@turtlemint/redux-analytics.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/@turtlemint/redux-analytics.svg) 


### Installation

```
yarn add @turtlemint/redux-analytics
```
or

```
npm i @turtlemint/redux-analytics --save
```

#### Uses latest React Hooks (16.8.x) and context API's under the hood.


**Demo** available at https://kushalmahajan.github.io/

### Setup for redux app


#### Common listener for tracking all redux events 

```
const trackListener = (event, eventsHistory) => {
    const dataLayerObj = {...event};
    dataLayerObj.event = 'track_event';
    window.dataLayer.push(dataLayerObj);
    return event;
};
export default trackListener;

```

Important is that you *return* the event if you want to take decisions based on the `eventsHistory`. For example, to not abuse the multiple clicks of critical buttons, say `Checkout`, you want to provide a conditional check if your event is not already fed to analytics.


#### defining the store and registering the middleware

Suggest you to create a folder analytics in your src. You can place all your listeners inside listeners sub-folder moving forward.

```
import { Analytics, analyticsMiddleware } from '@turtlemint/redux-analytics';
import trackListener from './analytics/listeners/track-listener';

const analytics = new Analytics([trackListener]);

const store = createStore(
    rootReducer,
    applyMiddleware(analyticsMiddleware(analytics))
);

```
This it for using this library. 💣 💥


Remember, your app works normally. Dispatch the actions and it will handle the analytics, registration for you and at the same time giving you the flexibility for calling whichever provider you require.

For example in your listener, you can call GTM or segment events and amny others as per your requirement.

```
...
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

It's probably not a solution you will keep for your react-redux apps at scale or you may have already converted your app to something more redux inclined for all your actions after realising the ease of doing extra things like analytics, error logging etc. But if you have not and in process to do so, here's Stack Overflow [question](https://stackoverflow.com/q/45373742/1096194) mentioning how react router provides a listener on the browserHistory to do so.

Then after which you can directly call `Analytics.callListener(event)` function to 
to dispatch an event. 


### More considerations

1. How to NOT track all events

You can maintain a dictionary of events and attach even event transformers to it to return the data you want to send to analytics provider(GTM/Segment).

Here's how

``` 
export const EVENTS = {
    SET_SEARCH_TEXT: (event) => ({ ...event }),
    FETCH_API_DATA_SUCCESS: (event) => ({ ...event, type: event.type, data: event.payload })
};
const trackListener = (event, eventsHistory) => {
    // Check if event exists
    if(EVENTS[event.type]){
        // Call the transform function if required and get the data
        const dataLayerObj = EVENTS[event.type](event);
        // If not use the event as such
        // const dataLayerObj = {...event };
        dataLayerObj.event = 'track_event';
        window.dataLayer.push(dataLayerObj);
        return event;
    }
};
export default trackListener;
```

2. How to track only specific events ? 


Mostly you'll not need it. But here's how to specify the listener for each event manually 

```
function getQuoteListener(event, eventsHistory){
    window.dataLayer.push(event);
    return event;
}
getQuoteListener.eventType = ['GET_QUOTE_CLICK', 'BUY_POLICY'];

export default getQuoteListener;
```

`eventType` needs to be same as the `action.type` that you want to track. 


#### Made with love ❤️ at Turtlemint and in 2019 📆
