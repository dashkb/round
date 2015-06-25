import callSplat from './call_splat';

export default function debounce(func, delay) {
  let timer = null;

  return function(...args) {
    let context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      callSplat(func, args);
    }, delay);
  };
}
