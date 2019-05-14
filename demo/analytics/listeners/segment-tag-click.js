import { SEGMENT_TAG_CLICK } from '../constants';

function segmentTagClick(event, eventsHistory){
    console.log('listener', event, eventsHistory);
    // window.dataLayer.push(event);
    return event;
}
segmentTagClick.eventType = SEGMENT_TAG_CLICK;

export default segmentTagClick;