import { useState, useEffect } from 'react';
import { getAllQuizz } from '../../services/Quiz.service';
import QuizCard from '../../components/QuizCard/QuizCard';
import './QuizList.css';

const QuizList = () => {

   const [quizz, setQuizz] = useState([]);

   useEffect(() => {

      let ignore = false;

      getAllQuizz()
         .then((result) => {
            if (ignore) return;
            setQuizz(quizz => [...quizz, ...result.data]);
         })
         .catch((error) => {
            console.error('Error fetching quizz:', error);
         });

      return () => {
         ignore = true;
      };
   }, []);

   return (
      <>
         <div className="quizList-container">
            <h2>Quiz List</h2>
            <div className="quizList">
               {quizz.map((quiz) => (
                  <QuizCard
                     key={quiz.id}
                     id={quiz.id}
                     title={quiz.title.rendered}
                     difficulty={quiz.difficulte}
                     image={quiz.vignette?.guid}
                     description={quiz.description}
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default QuizList;