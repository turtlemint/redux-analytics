import { SEGMENT_TAG_CLICK } from '../constants/';

const initialState = {
    tracked: false
}
const analytics = (state = initialState, action) => {
    switch(action.type){
        case SEGMENT_TAG_CLICK:
            console.log('reducer', state);
            return {
                ...state,
                tracked: true
            }
        default:
            return state;
    }
}

export default analytics;