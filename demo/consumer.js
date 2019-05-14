import React from 'react';
import { withAnalytics } from '../index';
import SegmentTagClickEvent from './analytics/events/segment-tag-click';


const Consumer = ({segmentTagClick}) => {
    return (
        <button onClick={() => segmentTagClick()}>
            Segment click
        </button>
    );
}
 
const mapAnalyticsToProps = trackEvent => {
    return {
        segmentTagClick: () => {
            trackEvent(SegmentTagClickEvent());
        }
    }
}
const DecoratedConsumer = withAnalytics(mapAnalyticsToProps)(Consumer);

export default DecoratedConsumer;