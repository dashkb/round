export default function pluck(objects, property) {
  return objects.map(obj => obj[property]);
}
