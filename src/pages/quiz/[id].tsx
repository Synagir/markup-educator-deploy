import { useEffect, useState } from 'react';
import { readQuizFileList, readQuizFileById } from '@lib/quiz/readFiles';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@model/db';
import Header from '@component/header';
import QuizEditor from '@component/quiz/QuizEditor';
import QuizResult from '@component/quiz/QuizResult';
import QuizView from '@component/quiz/QuizView';
import compareMarkup from '@lib/score/compare';
import styles from './quiz.module.scss';

interface QuizParams {
  id: string;
  name: string;
  defaultUserHtml: string;
  defaultUserCss: string;
  answerHtml: string;
  answerCss: string;
}

export default function Quiz({ id, name, defaultUserHtml, defaultUserCss, answerHtml, answerCss }: QuizParams) {
  const [userHtml, setUserHtml] = useState(defaultUserHtml);
  const [userCss, setUserCss] = useState(defaultUserCss);
  const [activeHtmlStateTab, setActiveCodeTab] = useState(true);
  const [activeUserViewTab, setActiveUserViewTab] = useState(true);
  const [debouncing, setDebouncing] = useState(false);
  const [score, setScore] = useState(0);
  const [comparing, setComparing] = useState(false);
  const [msgListenerReady, setMsgListenerReady] = useState(false);

  // db에서 코드 불러오기
  const dataBaseItem = useLiveQuery(() => db.markups.where('id').equals(id).toArray())?.shift();
  if (dataBaseItem) {
    setUserHtml(dataBaseItem.htmlState);
    setUserCss(dataBaseItem.cssState);
  }

  useEffect(() => {
    // 아이프레임 이벤트 리스너 등록
    function handleIframeMessage(event) {
      if (event?.source?.location?.pathname === 'srcdoc') {
        console.log(event);
        console.log(event.source.frameElement.dataset.type);
        // 이벤트가 발생될 때마다 해당되는 요소의 픽셀 데이터 업데이트
        // 업데이트 후 스코어 다시 계산
        // comparing = false
      }
    }
    window.addEventListener('message', handleIframeMessage);

    // 아이프레임 이벤트 발생을 위해 이벤트 리스너 등록 후 아이프레임 렌더
    setMsgListenerReady(true);

    return () => {
      // 아이프레임 이벤트 리스너 제거
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  useEffect(() => {
    // db에 코드 저장
    try {
      db.markups.put({ id, htmlState: userHtml, cssState: userCss }, id);
    } catch (error) {
      console.error(error);
    }
    // 채점
    // async function handleCompare() {
    //   setComparing(true);
    //   setScore(await compareMarkup(userHtml, userCss, answerHtml, answerCss));
    //   setComparing(false);
    // }
    // handleCompare();
  }, [userHtml, userCss, id]);

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <QuizEditor
          wrapperClass={styles.editor}
          activate={activeHtmlStateTab}
          html={userHtml}
          css={userCss}
          handleActivate={setActiveCodeTab}
          handleHtml={setUserHtml}
          handleCss={setUserCss}
          handleDebouncing={setDebouncing}
        />
        {msgListenerReady && (
          <QuizView
            wrapperClass={styles.view}
            activate={activeUserViewTab}
            userHtml={userHtml}
            userCss={userCss}
            answerHtml={answerHtml}
            answerCss={answerCss}
            handleActivate={setActiveUserViewTab}
          />
        )}
        <QuizResult wrapperClassName={styles.grade} score={score} debouncing={debouncing} comparing={comparing} />
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
    props: { id: params.id, ...quizFileData },
  };
}
