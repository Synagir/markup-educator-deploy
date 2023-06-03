import fs from 'fs';

export default function readAllQuizFile() {
  const fileNames = fs.readdirSync('./quiz');
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace('.json', ''),
    },
  }));
}

export function readQuizFileById(index?: string) {
  const quizFile = fs.readFileSync(`./quiz/${index}.json`);
  const quizFileToString = quizFile.toString();
  const quizFileData = JSON.parse(quizFileToString);
  return {
    ...quizFileData,
  };
}
