import { createAction } from 'flux';

let update = createAction('Status Update', (status) => ({ status }));
let fetch = createAction('Status Fetch', (streamID, interval) => ({ streamID, interval }));
let startStream = createAction('Status Stream Start', (interval) => ({ interval }));
let stopStream  = createAction('Status Stream Stop', () => ({}));

export { fetch, startStream, stopStream };
