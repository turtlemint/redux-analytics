import React from 'react'
import propTypes from 'prop-types';
import { useContext } from 'react';
import { AnalyticsContext } from '../analytics-context';
import { getDisplayName } from '../utils';

const withAnalytics = mapAnalyticsToProps => Component => {
    const displayName = getDisplayName(Component);

    const analyticsEventProvider = (props, context) => {
        const analyticsEvent = useContext(AnalyticsContext);
        let analyticsProps = {};

        if (!analyticsEvent) {
            throw Error(`Could not find tracker in the context of ` + `"${ displayName }"`);
        }
        if (typeof mapAnalyticsToProps === 'function') {
            analyticsProps = mapAnalyticsToProps(analyticsEvent);

            if (!analyticsProps || typeof analyticsProps !== 'object') {
                throw Error(`mapAnalyticsToProps should return an object, instead it returns ` + `"${typeof analyticsProps}"`);
            }
        } else {
            analyticsProps = { trackEvent };
        }

        const propsWithTracking = Object.assign({}, props, analyticsProps);        
        return React.createElement(Component, propsWithTracking);
    }
 
    analyticsEventProvider.displayName = displayName;
    // analyticsEventProvider.contextTypes = {
    //     trackEvent: propTypes.func.isRequired
    // };

    return analyticsEventProvider;
}

export default withAnalytics;