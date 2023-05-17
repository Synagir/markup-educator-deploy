import { useRef, useState } from 'react';
import Canvas from '@component/Canvas';
import quiz from '@quiz/basic.json';
import compare from '@lib/score/compare';

export default function Compare() {
  const userCanvasRef = useRef<HTMLIFrameElement>(null);
  const answerCanvasRef = useRef<HTMLIFrameElement>(null);
  const [score, setScore] = useState<number>(0);

  async function handleCompare() {
    setScore(await compare(userCanvasRef.current, answerCanvasRef.current));
  }

  return (
    <div className="container">
      <h1>정답 비교</h1>
      <Canvas html={quiz.userHTML} css={quiz.userCSS} ref={userCanvasRef} />
      <Canvas html={quiz.answerHTML} css={quiz.answerCSS} ref={answerCanvasRef} />
      <button type="button" onClick={handleCompare}>
        compare
      </button>
      <strong>{score}</strong>
    </div>
  );
}
