import Link from 'next/link';
import classnames from 'classnames';
import styles from './QuizResult.module.scss';

interface QuizResultProps {
  wrapperClassName?: string;
  score: number;
  debouncing: boolean;
}

export default function QuizResult({ wrapperClassName, score, debouncing }: QuizResultProps) {
  return (
    <div className={classnames(styles.wrap, wrapperClassName)}>
      <p className={styles.text}>{debouncing ? <span>채점중</span> : <span>유사도 {Math.floor(score * 100)}%</span>}</p>
      {true && (
        <Link href="./" role="button" className={classnames(styles.link, 'contrast')}>
          다음 문제로
        </Link>
      )}
    </div>
  );
}
