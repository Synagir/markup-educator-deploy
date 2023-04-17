import { useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { historyField } from '@codemirror/commands';
import styles from './index.module.scss';

const htmlDefaultState = `<div class="text">\n\tHello World\n</div>`;
const cssDefaultState = `.text {\n\tcolor: #fff;\n}`;
const htmlStateFields = { history: historyField };
const cssStateFields = { history: historyField };

export default function Index() {
  const [htmlState, setHtmlState] = useState(htmlDefaultState);
  const [cssState, setCssState] = useState(cssDefaultState);
  const [activeHtmlStateTab, setActiveCodeTab] = useState(true);
  const [activeUserViewTab, setActiveUserViewTab] = useState(true);

  const handleHtmlState = (_view, viewUpdate) => {
    const state = viewUpdate.state.toJSON(htmlStateFields).doc;
    setHtmlState(state);
    // 테스트용 코드
    console.log(htmlState);
    console.log(state);
  };
  const handleCssState = (_view, viewUpdate) => {
    const state = viewUpdate.state.toJSON(cssStateFields).doc;
    setCssState(state);
    // 테스트용 코드
    console.log(cssState);
    console.log(state);
  };

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
        <div className={styles.code}>
          {activeHtmlStateTab ? (
            <CodeMirror
              value={htmlDefaultState}
              theme={okaidia}
              width="380px"
              height="380px"
              extensions={[html({ autoCloseTags: true })]}
              onChange={handleHtmlState}
            />
          ) : (
            <CodeMirror
              value={cssDefaultState}
              theme={okaidia}
              width="380px"
              height="380px"
              extensions={[css()]}
              onChange={handleCssState}
            />
          )}
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
        <div className={styles.code}>
          <div className={styles.view}>
            {activeUserViewTab ? (
              /* html + css 코드 결과 영역입니다. 
                이곳에 Shadow Dom 사용허여 구현하시면 됩니다.
              */
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            ) : (
              /* 정답 공간 뷰 영역입니다 */
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
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
