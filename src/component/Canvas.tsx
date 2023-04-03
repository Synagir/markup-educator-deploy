import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './Canvas.module.scss';

function Canvas({ html, css }: { html: string; css: string }, ref) {
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

  useImperativeHandle(
    ref,
    () => ({
      getCanvas() {
        return canvasRef.current;
      },
    }),
    []
  );

  return <div className={styles.canvas} ref={canvasRef} />;
}

export default forwardRef(Canvas);
