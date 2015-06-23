import { createAction } from '../flux';

let setSearchTerm = createAction('Search Term Set', (searchTerm) => ({ searchTerm }));

export { setSearchTerm };
