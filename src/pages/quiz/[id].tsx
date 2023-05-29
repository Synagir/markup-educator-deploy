import { useState } from 'react';
import classnames from 'classnames';
import readFile from '@lib/quizFileRead/file-read';
import Header from '@component/header';
import Canvas from '@component/Canvas';
import Editor from '@component/Editor';
import styles from './quiz.module.scss';

interface Quiz {
  id: string;
  name: string;
  userHTML: string;
  userCSS: string;
  answerHTML: string;
  answerCSS: string;
}

export default function MainQuiz({ id, name, userHTML, userCSS, answerHTML, answerCSS }: Quiz) {
  const [htmlState, setHtmlState] = useState(userHTML);
  const [cssState, setCssState] = useState(userCSS);
  const [activeHtmlStateTab, setActiveCodeTab] = useState(true);
  const [activeUserViewTab, setActiveUserViewTab] = useState(true);
  return (
    <div>
      <Header />
      <div className={styles.tab}>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: activeHtmlStateTab,
          })}
          onClick={() => setActiveCodeTab(true)}
        >
          html
        </button>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: !activeHtmlStateTab,
          })}
          onClick={() => setActiveCodeTab(false)}
        >
          css
        </button>
      </div>
      <div className={classnames(styles.code, { [styles.activate]: activeHtmlStateTab })}>
        <Editor lang="html" initialString={htmlState} setState={setHtmlState} />
      </div>
      <div className={classnames(styles.code, { [styles.activate]: !activeHtmlStateTab })}>
        <Editor lang="css" initialString={cssState} setState={setCssState} />
      </div>
      <div className={styles.tab}>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: activeUserViewTab,
          })}
          onClick={() => setActiveUserViewTab(true)}
        >
          user
        </button>
        <button
          type="button"
          className={classnames(styles.button_tab, {
            [styles.activate]: !activeUserViewTab,
          })}
          onClick={() => setActiveUserViewTab(false)}
        >
          answer
        </button>
      </div>
      <div className={styles.result}>
        <div className={classnames(styles.code, { [styles.activate]: activeUserViewTab })}>
          <Canvas html={htmlState} css={cssState} />
        </div>
        <div className={classnames(styles.code, { [styles.activate]: !activeUserViewTab })}>
          <Canvas html="" css="" />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = readFile(true)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const index = Number(params.id).toString()
  const quizFileData = readFile(false, index)
  return {
    props: {
      ...quizFileData
    },
  };
}
