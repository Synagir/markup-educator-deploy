import fs from 'fs';

export function readQuizFileList() {
  const fileNames = fs.readdirSync('./quiz');
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace('.json', ''),
    },
  }));
}

export function readQuizFileById(index?: string) {
  const quizFileData = JSON.parse(fs.readFileSync(`./quiz/${index}.json`, 'utf8'));
  return quizFileData;
}
