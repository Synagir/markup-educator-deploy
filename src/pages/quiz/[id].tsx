import { useEffect, useState, useRef } from 'react';
import { readQuizFileList, readQuizFileById } from '@lib/quiz/readFiles';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@model/db';
import Header from '@component/header';
import QuizEditor from '@component/quiz/QuizEditor';
import QuizResult from '@component/quiz/QuizResult';
import QuizView from '@component/quiz/QuizView';
import compareCanvas from '@lib/score/compare';
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
  const [userCssString, setUserCssString] = useState(userCSS);
  const [activeHtmlStateTab, setActiveCodeTab] = useState(true);
  const [activeUserViewTab, setActiveUserViewTab] = useState(true);
  const [debouncing, setDebouncing] = useState(false);
  const userCanvasRef = useRef<HTMLIFrameElement>(null);
  const answerCanvasRef = useRef<HTMLIFrameElement>(null);
  const [score, setScore] = useState(0);

  // db에서 코드 불러오기
  const dataBaseItem = useLiveQuery(() => db.markups.where('id').equals(id).toArray())?.shift();
  if (dataBaseItem) {
    setUserHtmlString(dataBaseItem.htmlState);
    setUserCssString(dataBaseItem.cssState);
  }

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
    // db에 코드 저장
    try {
      db.markups.put({ id, htmlState: userHtmlString, cssState: userCssString }, id);
    } catch (error) {
      console.error(error);
    }
    // 채점
    async function handleCompare() {
      setScore(await compareCanvas(userCanvasRef.current, answerCanvasRef.current));
    }
    handleCompare();
  }, [userHtmlString, userCssString]);

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <QuizEditor
          wrapperClass={styles.editor}
          activate={activeHtmlStateTab}
          html={userHtmlString}
          css={userCssString}
          handleActivate={setActiveCodeTab}
          handleHtml={setUserHtmlString}
          handleCss={setUserCssString}
          handleDebouncing={setDebouncing}
        />
        <QuizView
          wrapperClass={styles.view}
          activate={activeUserViewTab}
          userHtml={userHtmlString}
          userCss={userCssString}
          answerHtml={answerHTML}
          answerCss={answerCSS}
          handleActivate={setActiveUserViewTab}
          userCanvasRef={userCanvasRef}
          answerCanvasRef={answerCanvasRef}
        />
        <QuizResult wrapperClassName={styles.grade} score={score} debouncing={debouncing} />
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
