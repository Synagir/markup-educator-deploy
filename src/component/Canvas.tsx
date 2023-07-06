import styles from './Canvas.module.scss';

interface CanvasProps {
  html: string;
  css: string;
  type?: string;
}

export default function Canvas({ html, css, type }: CanvasProps) {
  return (
    <iframe
      srcDoc={`<style>${css}</style>${html}<script>window.addEventListener('load', () => {window.top.postMessage('', '*');})</script>`}
      title="Rendered codes"
      className={styles.canvas}
      data-type={type}
    />
  );
}
