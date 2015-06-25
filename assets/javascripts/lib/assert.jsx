export default function assert(check, message) {
  if (check) return true;

  let data = Array.prototype.slice.call(arguments, 2);
  let dataIndex = 0;
  let placed = message.replace(/%s/g, () => (data[dataIndex++] || 'unknown'));
  let error = new Error(`Assertion failed: ${placed}`);

  // Start the stacktrace before the call to assert
  error.framesToPop = 1;

  throw error;
}
