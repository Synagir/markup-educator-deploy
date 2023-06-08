import { useEffect, useState } from 'react';
import { readQuizFileList, readQuizFileById } from '@lib/quiz/readFiles';
import Header from '@component/header';
import QuizEditor from '@component/quiz/QuizEditor';
import QuizResult from '@component/quiz/QuizResult';
import QuizView from '@component/quiz/QuizView';
import styles from './quiz.module.scss';

interface QuizParams {
  id: string;
  name: string;
  userHTML: string;
  userCSS: string;
  answerHTML: string;
  answerCSS: string;
}

export default function Quiz({ id, name, userHTML, userCSS, answerHTML, answerCSS }: QuizParams) {
  const [userHtmlString, setUserHtmlString] = useState(userHTML);
  const [userCssString, setuserCssString] = useState(userCSS);
  const [activeHtmlStateTab, setActiveCodeTab] = useState(true);
  const [activeUserViewTab, setActiveUserViewTab] = useState(true);
  const [debouncing, setDebouncing] = useState(false);

  // 밑의 2개의 useEffect를 하나로 합치는게 알고리즘적으로는 더 이상적?
  useEffect(() => {
    if (debouncing) {
      console.log('DEBOUNCING: true');
      // DEBOUNCING
      // 채점중 문구 표시
    } else {
      console.log('DEBOUNCING: false');
      // 채점 점수 보여줌
    }
  }, [debouncing]);

  useEffect(() => {
    console.log('HTML or CSS changed');
    // update index db
    // update user canvas (canvas에 넘기는것으로 구현. 여기 useEffect에서 작동하지 않음)
    // 채점
  }, [userHtmlString, userCssString]);

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <QuizEditor
          wrapperClass={styles.editor}
          activate={activeHtmlStateTab}
          html={userHTML}
          css={userCSS}
          handleActivate={setActiveCodeTab}
          handleHtml={setUserHtmlString}
          handleCss={setuserCssString}
          handleDebouncing={setDebouncing}
        />
        <QuizView wrapperClass={styles.view} activate={activeUserViewTab} html={userHtmlString} css={userCssString} handleActivate={setActiveUserViewTab} />
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
