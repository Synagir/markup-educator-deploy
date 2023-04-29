import { useState, useRef } from "react";
import classnames from 'classnames'
import styles from "./header.module.scss";

function Header() {
  const modalRef = useRef();
  const [isQuizListOpened, setIsQuizListOpened] = useState(false)
  const [showCopySuccessPopup, setShowCopySuccessPopup] = useState(false)

  function toggleQuizListOpened() {
    setIsQuizListOpened(!isQuizListOpened)
    document.body.style.overflow = 'hidden'
  }
  function closeQuizList(e: any) {
    if (modalRef.current === e.target) {
      setIsQuizListOpened(false)
      document.body.style.overflow = 'auto'
    }
  }

  function copyUrlButtonHandler() {
    setShowCopySuccessPopup(true)
    setTimeout(() => {
      setShowCopySuccessPopup(false)
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
          <div className={styles.dimmed} onClick={(e) => closeQuizList(e)} ref={modalRef}>
            <div className={styles.menu_area}>
              <button type="button" className={styles.close_button} onClick={toggleQuizListOpened}>
                <span className="blind">닫기</span>
              </button>
            </div>
          </div>
        }
        {showCopySuccessPopup &&
          <p className={classnames(styles.copy_popup_text, showCopySuccessPopup && styles.popup_on)}>복사 되었습니다</p>
        }
      </div>
    </header >
  )
}
export default Header
