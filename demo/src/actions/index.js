import { SEGMENT_TAG_CLICK } from "../constants";

export const segmentTagClick = () => ({
    type: SEGMENT_TAG_CLICK,
    data: {
        segment: '30d_active'   
    }
})