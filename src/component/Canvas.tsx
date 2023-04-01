import { useRef, useEffect } from 'react';
import styles from './Canvas.module.scss';

export default function Canvas({
  html,
  css,
  forwardRef,
}: {
  html: string;
  css: string;
  forwardRef: any;
}) {
  const canvasRef = useRef();

  useEffect(() => {
    // shadow DOM
    let shadowRoot;
    if (canvasRef.current.shadowRoot) {
      shadowRoot = canvasRef.current.shadowRoot;
    } else {
      shadowRoot = canvasRef.current.attachShadow({ mode: 'open' });
    }

    // init innerHTML
    shadowRoot.innerHTML = '';

    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    shadowRoot.appendChild(styleElement);

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = html;
    shadowRoot.appendChild(htmlElement);
  }, [html, css]);

  useEffect(() => {
    forwardRef.current = canvasRef.current;
  }, [forwardRef]);

  return <div className={styles.canvas} ref={canvasRef} />;
}
