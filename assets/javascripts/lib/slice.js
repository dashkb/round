export default function slice(obj, ...keys) {
  let newObj = {};

  for (let key of keys) {
    newObj[key] = obj[key];
  }

  return newObj;
}
