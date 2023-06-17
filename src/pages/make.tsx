import { useState } from 'react';
import useDownloader from 'react-use-downloader';
import Editor from '@component/Editor';
import Canvas from '@component/Canvas';
import styles from './make.module.scss';

export default function Make() {
  const { download } = useDownloader();
  const [userHtml, setUserHtml] = useState('');
  const [userCss, setUserCss] = useState('');
  const [answerHtml, setAnswerHtml] = useState('');
  const [answerCss, setAnswerCss] = useState('');
  const [jsonName, setJsonName] = useState('');
  const [jsonCategory, setJsonCategory] = useState('');
  // Editor 호환용 변수
  const [debouncing, setDebouncing] = useState(false);

  function handleSave() {
    const content = {
      name: jsonName,
      category: jsonCategory,
      defaultUserHtml: userHtml,
      defaultUserCss: userCss,
      answerHtml,
      answerCss,
    };

    // download json file
    const fileURI = encodeURIComponent(JSON.stringify(content, null, 4));

    console.log(fileURI);
    download(`data:text/json,${fileURI}`, 'quiz.json');
  }

  return (
    <div>
      <main className={styles.main}>
        <h2>USER</h2>
        <div className={styles.editor_wrap}>
          <Editor lang="html" initialString="" setString={setUserHtml} setDebouncing={setDebouncing} />
          <Editor lang="css" initialString="" setString={setUserCss} setDebouncing={setDebouncing} />
        </div>
        <h2>ANSWER</h2>
        <div className={styles.editor_wrap}>
          <Editor lang="html" initialString="" setString={setAnswerHtml} setDebouncing={setDebouncing} />
          <Editor lang="css" initialString="" setString={setAnswerCss} setDebouncing={setDebouncing} />
        </div>
        <div className={styles.canvas_wrap}>
          <Canvas html={userHtml} css={userCss} />
          <Canvas html={answerHtml} css={answerCss} />
        </div>
        <div className={styles.control_wrap}>
          <label>
            name: <input type="text" onChange={(e) => setJsonName(e.target.value)} />
          </label>
          <label>
            category: <input type="text" onChange={(e) => setJsonCategory(e.target.value)} />
          </label>
          <button type="button" onClick={handleSave}>
            save
          </button>
        </div>
      </main>
    </div>
  );
}
