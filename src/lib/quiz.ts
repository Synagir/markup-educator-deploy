import quizList from '@quiz/1.json';

export default function getAllPostIds() {
  // const fileNames = fs.readdirSync(postsDirectory);

  return quizList.quiz.map((quiz) => ({
    params: {
      id: quiz.name,
      // userHtml: quiz.userHTML,
      // userCss: quiz.userCSS
    },
  }));
}
