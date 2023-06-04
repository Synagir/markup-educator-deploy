import { useState } from 'react';
import Header from '@component/header';
import QuizEditor from '@component/quiz/QuizEditor';
import QuizResult from '@component/quiz/QuizResult';
import QuizView from '@component/quiz/QuizView';
import styles from './quiz.module.scss';

const htmlDefaultState = `<div class="text">\n\tHello World\n</div>`;
const cssDefaultState = `.text {\n\tcolor: #fff;\n}`;

export default function Quiz() {
  const [htmlState, setHtmlState] = useState(htmlDefaultState);
  const [cssState, setCssState] = useState(cssDefaultState);
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
