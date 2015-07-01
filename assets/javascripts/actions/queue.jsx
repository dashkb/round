import createAction from 'flux/action';

let add = createAction('Add to Queue', (track) => ({ track }));
let remove = createAction('Remove from Queue', (track) => ({ track }));
let moveUp = createAction('Move Up Queue', (track) => ({ track }));
let moveDown = createAction('Move Down in Queue', (track) => ({ track }));
let clear = createAction('Clear Queue', () => ({}));
let send = createAction('Send Queue', (name, callback) => ({ name, callback }));

export { add, remove, moveUp, moveDown, clear, send };
