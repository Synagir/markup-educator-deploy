import { MutableRefObject } from 'react';
import classnames from 'classnames';
import Canvas from '@component/Canvas';
import styles from './QuizView.module.scss';

interface QuizViewProps {
  wrapperClass?: string;
  activate: boolean;
  userHtml: string;
  userCss: string;
  answerHtml: string;
  answerCss: string;
  handleActivate: (status: boolean) => void;
  userCanvasRef: MutableRefObject<HTMLIFrameElement>;
  answerCanvasRef: MutableRefObject<HTMLIFrameElement>;
}

export default function QuizView({
  wrapperClass,
  activate,
  userHtml,
  userCss,
  answerHtml,
  answerCss,
  handleActivate,
  userCanvasRef,
  answerCanvasRef,
}: QuizViewProps) {
  return (
    <div className={classnames(styles.wrap, wrapperClass)}>
      <div className={styles.tab}>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: activate,
          })}
          onClick={() => handleActivate(true)}
        >
          user
        </button>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: !activate,
          })}
          onClick={() => handleActivate(false)}
        >
          answer
        </button>
      </div>
      <div className={styles.result}>
        <div className={classnames(styles.code, { [styles.activate]: activate })}>
          <span className={styles.code_label}>user</span>
          <div className={styles.canvas}>
            <Canvas html={userHtml} css={userCss} ref={userCanvasRef} />
          </div>
        </div>
        <div className={classnames(styles.code, { [styles.activate]: !activate })}>
          <span className={styles.code_label}>answer</span>
          <div className={styles.canvas}>
            <Canvas html={answerHtml} css={answerCss} ref={answerCanvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
