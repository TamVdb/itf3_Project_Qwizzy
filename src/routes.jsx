import App from './App';
import QuizList from './containers/QuizList/QuizList';
import QuizQuestions from './components/QuizQuestions/QuizQuestions';

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
         }
      ]
   }
];

export default routes;