import { useState } from "react";
import styles from "./quiz_page.module.scss";

export default function Index() {
  const [menuArea, setMenuArea] = useState(false)
  const [htmlOpen, setHtmlOpen] = useState(true)
  const [cssOpen, SetCssOpen] = useState(false)
  const openHtml = () => {
    setHtmlOpen(true)
    SetCssOpen(false)
  }
  const openCss = () => {
    setHtmlOpen(false)
    SetCssOpen(true)
  }
  const openMenu = () => {
    setMenuArea(!menuArea)
    if (menuArea)
      document.body.style.overflow = 'hidden'
    else
      document.body.style.overflow = 'auto'
  }
  return (
    <div>
      <header className={styles.header}>
        <a className={styles.title} href="/">Can you markup?</a>
        <div className={styles.header_buttons}>
          <button type="button" className={styles.share}>
            <span className="blind">공유</span>
          </button>
          <button type="button" onClick={() => openMenu()} className={styles.menu}>
            dd
          </button>
          {menuArea &&
            <div className={styles.dimmed} onClick={() => openMenu()}>
              <div className={styles.menu_area}>dd</div>
            </div>
          }
        </div>
      </header>
      <main>
        <div>
          <div>
            <button type="button" onClick={() => openHtml()} className={styles.share}>
              HTML
            </button>
            <button type="button" onClick={() => openCss()} className={styles.menu}>
              CSS
            </button>
          </div>
          {htmlOpen &&
            <div className={styles.d}>
              html
            </div>
          }
          {cssOpen &&
            <div className={styles.d}>
              css
            </div>
          }
        </div>
      </main>
      <p className={styles.a}>d</p>
    </div>
  );
}