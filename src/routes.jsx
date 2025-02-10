import App from './App';
import QuizList from './containers/QuizList/QuizList';
import QuizQuestions from './components/QuizQuestions/QuizQuestions';
import AddQuiz from './components/AddQuiz/AddQuiz';
import UserScoreBoard from './containers/UserScoreBoard/UserScoreBoard';

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
            path: 'user-scoreboard',
            element: <UserScoreBoard />
         }
      ]
   }
];

export default routes;