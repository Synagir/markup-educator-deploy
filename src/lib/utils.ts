export default function wrapDebounce(callback: Function, delay: number): Function {
  let timeout;

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(callback, delay, ...args);
  };
}
