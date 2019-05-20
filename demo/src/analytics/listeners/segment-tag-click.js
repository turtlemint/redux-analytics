import { SEGMENT_TAG_CLICK } from '../constants';
import cogoToast from 'cogo-toast';

function segmentTagClick(event, eventsHistory){
    cogoToast.info(JSON.stringify(event.data), {
        heading: event.type
    });

    // window.dataLayer.push(event);
    // pixel call
    // adobe analytics
    return event;
}
segmentTagClick.eventType = SEGMENT_TAG_CLICK;

export default segmentTagClick;