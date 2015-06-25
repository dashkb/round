export default function callSplat(fn, args) {
  switch (args.length) {
    case 0:  return fn.call(null);
    case 1:  return fn.call(null, args[0]);
    case 2:  return fn.call(null, args[0], args[1]);
    case 3:  return fn.call(null, args[0], args[1], args[2]);
    default: return fn.apply(null, args);
  }
}
