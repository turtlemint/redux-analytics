import { assertlisteners } from './utils';

export default class Analytics {
    constructor(listeners) {
        this.analyticsHistory = [];
        this.listeners = assertlisteners(listeners);

        this.analyticsEvent = this.analyticsEvent.bind(this);
    }

    on(eventType, callback) {
        if (typeof callback !== 'function') {
            throw new Error(`Expected onClick listener to be a function, instead got type ${typeof callback}`);            
        }

        if (typeof eventType !== 'string' || eventType.length < 1) {
            throw new Error(`No event type is specified. (*) to listen on all events`);            
        }

        callback.eventType = eventType;
        this.listeners = [...this.listeners, callback];
    }

    analyticsEvent(event) {
        const { type, data } = event || {};

        if (!type) {
            return null;
        }

        for (let i = 0; i < this.listeners.length; i++) {
            const listener = this.listeners[i];

            if (
                typeof listener === 'function' &&
                (
                    listener.eventType === type
                    || listener.eventType === '*'
                    || typeof listener.eventType === 'undefined'
                )
            ) {
                const save = listener.call(null, event, this.analyticsHistory);
                
                if (save) {
                    this.analyticsHistory = [...this.analyticsHistory, save];
                }
            }
        }
    }
    getHistory() {
        return this.analyticsHistory;
    }
}