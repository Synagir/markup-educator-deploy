import fs from 'fs';

export default function readFile(readQuizId: boolean, index?: string) {
  if (readQuizId) {
    const fileNames = fs.readdirSync('./quiz');
    return fileNames.map((fileName) => ({
      params: {
        id: fileName.replace('.json', ''),
      },
    }));
  }
  const quizFile = fs.readFileSync(`./quiz/${index}.json`);
  const quizFileToString = quizFile.toString();
  const quizFileData = JSON.parse(quizFileToString);
  return {
    quizFileData,
  };
}
