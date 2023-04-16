import { useState } from "react";
import styles from "./header.module.scss";

function Header() {
  const [quizList, setQuizList] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const openQuizList = () => {
    setQuizList(!quizList)
    if (quizList)
      document.body.style.overflow = 'hidden'
    else
      document.body.style.overflow = 'auto'
  }

  function copyUrl() {
    navigator.clipboard.writeText(window.location.href)
    setCopySuccess(true)
    const timer = setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
  }
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <a className={styles.home_link} href="/">
          Can you markup?
        </a>
      </h1>
      <div className={styles.button_area}>
        <button type="button" className={styles.button} onClick={copyUrl}>
          <span className="blind">공유</span>
        </button>
        <button type="button" onClick={openQuizList} className={styles.button}>
          dd
        </button>
        {quizList &&
          <div className={styles.dimmed} onClick={openQuizList}>
            <div className={styles.menu_area}>
              <button type="button">
                <span className="blind">닫기</span>
              </button>
            </div>
          </div>
        }
        {copySuccess &&
          <p className={styles.share_text}>복사 되었습니다</p>
        }
      </div>
    </header>
  )
}
export default Header
