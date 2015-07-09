export default function debounce(func, delay) {
  let timer = null;

  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
