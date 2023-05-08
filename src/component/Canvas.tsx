import { MutableRefObject, forwardRef } from 'react';
import styles from './Canvas.module.scss';

function Canvas({ html, css }: { html: string; css: string }, ref: MutableRefObject<HTMLIFrameElement>) {
  return <iframe srcDoc={`<style>${css}</style>${html}`} title="Rendered codes" className={styles.canvas} ref={ref} />;
}

export default forwardRef(Canvas);
