export default function wrapDebounce(callback: () => void, delay: number): () => void {
  let timeout;

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(callback, delay, ...args);
  };
}
