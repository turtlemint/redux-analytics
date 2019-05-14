import React from 'react';
import { AnalyticsContext } from './analytics-context';

const AnalyticsProvider = ({ analytics, children }) => {
    return (
        <AnalyticsContext.Provider value={analytics.trackEvent}>
            {children}
        </AnalyticsContext.Provider>
    );

}

export default AnalyticsProvider;