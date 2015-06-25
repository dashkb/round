export default function callSplat(fn, context, args) {
  if (Array.isArray(context)) {
    args = context;
    context = null;
  }

  switch (args.length) {
    case 0:  return fn.call(context);
    case 1:  return fn.call(context, args[0]);
    case 2:  return fn.call(context, args[0], args[1]);
    case 3:  return fn.call(context, args[0], args[1], args[2]);
    default: return fn.apply(context, args);
  }
}
