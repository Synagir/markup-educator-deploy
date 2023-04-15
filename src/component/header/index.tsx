import { useState } from "react";
import styles from "./header.module.scss";

function Header() {
  const [menuArea, setMenuArea] = useState(false)
  const [toastPopup, setToastPopup] = useState(false)
  const openMenu = () => {
    setMenuArea(!menuArea)
    if (menuArea)
      document.body.style.overflow = 'hidden'
    else
      document.body.style.overflow = 'auto'
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setToastPopup(true)
    const timer = setTimeout(() => {
      setToastPopup(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
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
        <button type="button" onClick={() => openMenu()} className={styles.button}>
          dd
        </button>
        {menuArea &&
          <div className={styles.dimmed} onClick={() => openMenu()}>
            <div className={styles.menu_area}>
              <button type="button">
                <span className="blind">닫기</span>
              </button>
            </div>
          </div>
        }
        {toastPopup &&
          <p className={styles.share_text}>복사 되었습니다</p>
        }
      </div>
    </header>
  )
}
export default Header
