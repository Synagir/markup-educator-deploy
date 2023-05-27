import { useState } from 'react';
import classnames from 'classnames';
import fs from 'fs';
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


export function getAllQuizIds() {
  const fileNames = fs.readdirSync('./pages/quiz/quizListFile');
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace('.json', ''),
    },
  }));
}

export async function getStaticPaths() {
  const paths = getAllQuizIds();
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  // [D] string으로 바로 변환이 안됨
  const index = Number(params.id).toString()

  const quizFile = fs.readFileSync(`./pages/quiz/quizListFile/${index}.json`)
  const quizFileToString = quizFile.toString();
  const quizFileData = JSON.parse(quizFileToString)
  return {
    props: {
      ...quizFileData
    },
  };
}
