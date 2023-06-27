import styles from './Canvas.module.scss';

export default function Canvas({ html, css, type }: { html: string; css: string; type: string }) {
  return (
    <iframe
      srcDoc={`<style>${css}</style>${html}<script>window.addEventListener('load', () => {window.top.postMessage('', '*');console.log('123')})</script>`}
      title="Rendered codes"
      className={styles.canvas}
      data-type={type}
    />
  );
}
