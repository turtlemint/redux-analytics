import cogoToast from 'cogo-toast';

const pageViewListener = (event, eventsHistory) => {
    const { pathname, search, hash} = event.payload.location;
    const locationEvent = {
        type: 'PAGE_VIEW',
        data: {
            page: pathname,
            search,
            hash
        }
    };
    cogoToast.info(JSON.stringify(locationEvent.data), {
        heading: locationEvent.type
    });
    return locationEvent;
    
    // window.dataLayer.push(locationEvent);
    // segment.trackPage(locationEvent);
}
pageViewListener.eventType = '@@router/LOCATION_CHANGE';

export default pageViewListener;