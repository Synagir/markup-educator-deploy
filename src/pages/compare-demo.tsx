import { useRef, useState } from 'react';
import Canvas from '@component/Canvas';
import quiz from '@quiz/basic.json';
import compare from '@lib/score/compare';

export default function Compare() {
  const userCanvasRef = useRef();
  const answerCanvasRef = useRef();
  const [score, setScore] = useState(0);

  async function handleCompare() {
    setScore(await compare(userCanvasRef.current, answerCanvasRef.current));
  }

  return (
    <div className="container">
      <h1>정답 비교</h1>
      <Canvas
        html={quiz.userHTML}
        css={quiz.userCSS}
        forwardRef={userCanvasRef}
      />
      <Canvas
        html={quiz.answerHTML}
        css={quiz.answerCSS}
        forwardRef={answerCanvasRef}
      />
      <button type="button" onClick={handleCompare}>
        compare
      </button>
      <strong>{score}</strong>
    </div>
  );
}
