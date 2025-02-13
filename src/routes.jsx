import App from './App';
import QuizList from './containers/QuizList/QuizList';
import QuizQuestions from './containers/QuizQuestions/QuizQuestions';
import AddQuiz from './components/AddQuiz/AddQuiz';
import UserScoreBoard from './containers/UserScoreBoard/UserScoreBoard';
import ScoreBoard from './containers/ScoreBoard/ScoreBoard';

const routes = [
   {
      path: '/',
      element: <App />,
      children: [
         {
            index: true,
            element: <QuizList />
         },
         {
            path: 'quiz/:id',
            element: (
               <QuizQuestions />
            )
         },
         {
            path: 'create-quiz',
            element: <AddQuiz />
         },
         {
            path: 'scoreboard/user/:userId',
            element: <UserScoreBoard />
         },
         {
            path: 'scoreboard',
            element: <ScoreBoard />
         }
      ]
   }
];

export default routes;