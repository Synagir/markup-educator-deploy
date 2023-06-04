import classnames from 'classnames';
import Editor from '@component/Editor';
import styles from './QuizEditor.module.scss';

interface QuizEditorProps {
  wrapperClass?: string;
  activate: boolean;
  html: string;
  css: string;
  handleActivate: (status: boolean) => void;
  handleHtml: (status: string) => void;
  handleCss: (status: string) => void;
}

export default function QuizEditor({ wrapperClass, activate, html, css, handleActivate, handleHtml, handleCss }: QuizEditorProps) {
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
          html
        </button>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: !activate,
          })}
          onClick={() => handleActivate(false)}
        >
          css
        </button>
      </div>
      <div className={classnames(styles.code, { [styles.activate]: activate })}>
        <span className={styles.code_label}>html</span>
        <div className={styles.code_inner}>
          <Editor lang="html" initialString={html} setState={handleHtml} />
        </div>
      </div>
      <div className={classnames(styles.code, { [styles.activate]: !activate })}>
        <span className={styles.code_label}>css</span>
        <div className={styles.code_inner}>
          <Editor lang="css" initialString={css} setState={handleCss} />
        </div>
      </div>
    </div>
  );
}
