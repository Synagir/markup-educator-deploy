import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classnames from 'classnames';
import Editor from '@component/Editor';
import styles from './QuizEditor.module.scss';

interface QuizEditorProps {
  wrapperClass?: string;
  activate: boolean;
  html: string;
  css: string;
  handleActivate: Dispatch<SetStateAction<boolean>>;
  handleHtml: Dispatch<SetStateAction<string>>;
  handleCss: Dispatch<SetStateAction<string>>;
  handleDebouncing: Dispatch<SetStateAction<boolean>>;
}

export default function QuizEditor({ wrapperClass, activate, html, css, handleActivate, handleHtml, handleCss, handleDebouncing }: QuizEditorProps) {
  const [htmlDebouncing, setHtmlDebouncing] = useState(false);
  const [cssDebouncing, setCssDebouncing] = useState(false);

  useEffect(() => {
    handleDebouncing(htmlDebouncing || cssDebouncing);
  }, [htmlDebouncing, cssDebouncing, handleDebouncing]);

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
          HTML
        </button>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: !activate,
          })}
          onClick={() => handleActivate(false)}
        >
          CSS
        </button>
      </div>
      <div className={classnames(styles.code, { [styles.activate]: activate })}>
        <span className={styles.code_label}>html</span>
        <div className={styles.code_inner}>
          <Editor lang="html" initialString={html} setString={handleHtml} setDebouncing={setHtmlDebouncing} />
        </div>
      </div>
      <div className={classnames(styles.code, { [styles.activate]: !activate })}>
        <span className={styles.code_label}>css</span>
        <div className={styles.code_inner}>
          <Editor lang="css" initialString={css} setString={handleCss} setDebouncing={setCssDebouncing} />
        </div>
      </div>
    </div>
  );
}
