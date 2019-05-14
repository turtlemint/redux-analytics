import { SEGMENT_TAG_CLICK } from '../constants';

const segmentTagEvent = () =>  ({
    type: SEGMENT_TAG_CLICK,
    data: {
        tagName: 'all'
    }
})

export default segmentTagEvent;