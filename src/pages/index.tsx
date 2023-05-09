import { useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import Canvas from '@component/Canvas';
import Editor from '@component/Editor';
import styles from './index.module.scss';

const htmlDefaultState = `<div class="text">\n\tHello World\n</div>`;
const cssDefaultState = `.text {\n\tcolor: #fff;\n}`;

export default function Index() {
  const [htmlState, setHtmlState] = useState(htmlDefaultState);
  const [cssState, setCssState] = useState(cssDefaultState);
  const [activeHtmlStateTab, setActiveCodeTab] = useState(true);
  const [activeUserViewTab, setActiveUserViewTab] = useState(true);

  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <h1 className={styles.title}>Can yoU Mark Up ?</h1>
        <p className={styles.description}>화면을 똑같이 만들 수 있나요 ?</p>
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
          <Editor lang="html" initialString={htmlDefaultState} setState={setHtmlState} />
        </div>
        <div className={classnames(styles.code, { [styles.activate]: !activeHtmlStateTab })}>
          <Editor lang="css" initialString={cssDefaultState} setState={setCssState} />
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
        <div className={styles.box}>
          <Link href="./" className={classnames(styles.link_start, 'contrast')}>
            시작하기
          </Link>
        </div>
        <h2 className={styles.quiz_title}>퀴즈 목록</h2>
        <div className={styles.quiz_box}>
          <em className={styles.quiz_level}>초급</em>
          {/* 문제 수 받아서 처리 */}
          <ul className={styles.list_quiz}>
            <li className={styles.item_quiz}>
              <Link href="./" className={styles.link_quiz}>
                # Quiz 01
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.quiz_box}>
          <em className={styles.quiz_level}>중급</em>
          {/* 문제 수 받아서 처리 */}
          <ul className={styles.list_quiz}>
            <li className={styles.item_quiz}>
              <Link href="./" className={styles.link_quiz}>
                # Quiz 01
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
