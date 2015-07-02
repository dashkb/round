import createAction from 'flux/action';

let login = createAction('Admin Login', (password) => ({ password }));
let logout = createAction('Admin Logout', () => ({}));
let skip = createAction('Admin Skip', () => ({}));
let pause = createAction('Admin Pause', () => ({}));
let play = createAction('Admin Play', () => ({}));

export { login, logout, skip, pause, play };
