import styles from './Canvas.module.scss';

export default function Canvas({ html, css }: { html: string; css: string }) {
  return <iframe srcDoc={`<style>${css}</style>${html}`} title="Rendered codes" className={styles.canvas} />;
}
