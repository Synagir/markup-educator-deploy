import { useState } from 'react';
import { readQuizFileList, readQuizFileById } from '@lib/quiz/readFiles';
import Header from '@component/header';
import QuizEditor from '@component/quiz/QuizEditor';
import QuizResult from '@component/quiz/QuizResult';
import QuizView from '@component/quiz/QuizView';
import styles from './quiz.module.scss';

interface Quiz {
  id: string;
  name: string;
  userHTML: string;
  userCSS: string;
  answerHTML: string;
  answerCSS: string;
}

export default function QuizPage({ id, name, userHTML, userCSS, answerHTML, answerCSS }: Quiz) {
  const [htmlState, setHtmlState] = useState(userHTML);
  const [cssState, setCssState] = useState(userCSS);
  const [activeHtmlStateTab, setActiveCodeTab] = useState(true);
  const [activeUserViewTab, setActiveUserViewTab] = useState(true);
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <QuizEditor
          wrapperClass={styles.editor}
          activate={activeHtmlStateTab}
          html={htmlState}
          css={cssState}
          handleActivate={setActiveCodeTab}
          handleHtml={setHtmlState}
          handleCss={setCssState}
        />
        <QuizView wrapperClass={styles.view} activate={activeUserViewTab} html={htmlState} css={cssState} handleActivate={setActiveUserViewTab} />
        <QuizResult wrapperClassName={styles.grade} />
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = readQuizFileList();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const quizFileData = readQuizFileById(params.id);
  return {
    props: quizFileData,
  };
}
