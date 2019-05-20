![npm](https://img.shields.io/npm/v/next-react-analytics.svg) ![NPM](https://img.shields.io/npm/l/next-react-analytics.svg) 
![npm bundle size](https://img.shields.io/bundlephobia/min/next-react-analytics.svg) 
![npm bundle size](https://github.com/kushalmahajan/next-react-analytics.git)

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
