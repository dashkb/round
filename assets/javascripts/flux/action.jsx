import assert from 'lib/assert';
import IdentFactory from 'lib/ident_factory';
import Dispatcher from './dispatcher';

let actionIdents = new IdentFactory('Action_ID');
export default function createAction(displayName, builder) {
  assert(builder instanceof Function,
         `Action ${displayName} did not define a build function.`);

  let id = `${actionIdents.next()}_${displayName}`;

  function buildPayload(...args) {
    let payload = builder.apply(null, args);
    payload.__action = id;
    return payload;
  }
  function action(...args) {
    let payload = buildPayload.apply(null, args);
    return Dispatcher.dispatch(payload);
  }

  action.buildPayload = buildPayload;
  action.displayName  = displayName;
  action.id = id;
  action.toString = () => id;

  return action;
}
