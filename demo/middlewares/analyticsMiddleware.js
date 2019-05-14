const analyticsMiddleware = analytics => store => next => action => {
    console.log('middleware in action', action);
    analytics.analyticsEvent(action);
    next(action);
}

export default analyticsMiddleware;

        