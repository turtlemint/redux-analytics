const analyticsMiddleware = analytics => store => next => action => {
    analytics.callListener(action);
    next(action);
}

export default analyticsMiddleware;

        