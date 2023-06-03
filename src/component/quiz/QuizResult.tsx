import Link from 'next/link';
import classnames from 'classnames';
import styles from './QuizResult.module.scss';

interface QuizResultProps {
  wrapperClassName?: string;
}

export default function QuizResult({ wrapperClassName }: QuizResultProps) {
  return (
    <div className={classnames(styles.wrap, wrapperClassName)}>
      <p className={styles.text}>
        {false && '채점중'}
        {true && `유사도 : 100%`}
        {false && '축하합니다!'}
      </p>
      {true && (
        <Link href="./" role="button" className={classnames(styles.link, 'contrast')}>
          다음 문제로
        </Link>
      )}
    </div>
  );
}
