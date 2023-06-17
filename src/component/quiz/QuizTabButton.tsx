import classnames from 'classnames';
import styles from './QuizTabButton.module.scss';

interface QuizTabButtonProps {
  isActivate: boolean;
  handleClick: (status: boolean) => void;
  activateTabType: boolean;
  innerText: string;
}

export default function QuizTabButton({ isActivate, handleClick, activateTabType, innerText }: QuizTabButtonProps) {
  return (
    <button
      type="button"
      className={classnames(styles.wrap, {
        [styles.activate]: isActivate,
      })}
      onClick={() => handleClick(activateTabType)}
    >
      {innerText}
    </button>
  );
}
