import { useState } from "react";
import classnames from 'classnames'
import styles from "./header.module.scss";

function Header() {
  const [isQuizListOpened, setIsQuizListOpened] = useState(false)
  const [showCopySuccessToast, setShowCopySuccessToast] = useState<boolean>(false)
  const [fadeToast, setFadeToast] = useState<'fade_out' | 'fade_in'>('fade_in')
  function toggleQuizListOpened() {
    setIsQuizListOpened(!isQuizListOpened)
    if (isQuizListOpened)
      document.body.style.overflow = 'hidden'
    else
      document.body.style.overflow = 'auto'
  }

  function copyUrlButtonHandler() {
    setShowCopySuccessToast(true)
    setFadeToast('fade_in')
    setTimeout(() => {
      setFadeToast('fade_out')
    }, 3000);
    setTimeout(() => {
      setShowCopySuccessToast(false)
    }, 3400);
  };
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <a className={styles.home_link} href="#!">
          Can you markup?
        </a>
      </h1>
      <div className={styles.button_area}>
        <button type="button" className={styles.button} onClick={copyUrlButtonHandler}>
          <span className="blind">공유</span>
        </button>
        <button type="button" onClick={toggleQuizListOpened} className={styles.button}>
          dd
        </button>
        {isQuizListOpened &&
          <div className={styles.dimmed} onClick={toggleQuizListOpened}>
            <div className={styles.menu_area}>
              <button type="button" className={styles.close_button}>
                <span className="blind">닫기</span>
              </button>
            </div>
          </div>
        }
        {showCopySuccessToast &&
          <p className={classnames(styles.copy_popup_text, fadeToast ? styles.fade_in : styles.fade_out)}>복사 되었습니다</p>
        }
      </div>
    </header >
  )
}
export default Header
