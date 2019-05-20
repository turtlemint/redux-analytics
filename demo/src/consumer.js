import React from 'react';
import { withAnalytics } from 'next-react-analytics';
import { connect } from 'react-redux';
import { segmentTagClick } from './actions';

const Consumer = ({ dispatch }) => {
    return (
        <button onClick={() => dispatch(segmentTagClick())}>
            Segment click
        </button>
    );
}
const ConnectedConsumer = connect()(Consumer);

export default ConnectedConsumer;