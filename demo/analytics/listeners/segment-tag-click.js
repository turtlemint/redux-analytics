import { SEGMENT_TAG_CLICK } from '../constants';


function segmentTagClick(event, eventsHistory){
    console.log(event, eventsHistory)
    // window.dataLayer.push();
    return event;
}
segmentTagClick.eventType = SEGMENT_TAG_CLICK;

export default segmentTagClick;