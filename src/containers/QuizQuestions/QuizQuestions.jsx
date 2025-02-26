import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuizById } from '../../services/Quiz.service';
import QuizQuestion from '../../components/QuizQuestion/QuizQuestion';
import ResultScreen from '../ResultScreen/ResultScreen';
import Loader from '../../components/Loader/Loader';
import './QuizQuestions.css';

const QuizQuestions = () => {
   const { id } = useParams();

   const [questions, setQuestions] = useState([]);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [score, setScore] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isGameOver, setIsGameOver] = useState(false);
   const [elapsedTime, setElapsedTime] = useState(0);
   const [timerActive, setTimerActive] = useState(false);

   // Fetch questions for the quiz
   useEffect(() => {
      getQuizById(id)
         .then((result) => {
            setQuestions(result.data.questions_du_quiz);
         })
         .catch((error) => console.error('Error fetching quiz:', error));
   }, [id]);

   // Update elapsed time when the timer is active
   useEffect(() => {
      let interval;
      if (timerActive) {
         interval = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
         }, 1000);
      } else if (!timerActive && elapsedTime !== 0) {
         clearInterval(interval);
      }
      return () => clearInterval(interval);
   }, [timerActive, elapsedTime]);

   // Handle start quiz
   const handleStartQuiz = () => {
      setIsPlaying(true);
      setTimerActive(true);
   };

   // Handle answer submission
   const handleAnswerSubmit = (isCorrect) => {

      if (isCorrect) {
         setScore((prevScore) => prevScore + 1);
      }

      setTimeout(() => {

         if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
         } else {
            setTimerActive(false); // Stop the timer before calculating final scores
            setIsGameOver(true);
         }
      }, 1000);
   };

   if (questions.length === 0 || !questions[currentQuestionIndex]) {
      return <Loader />;
   }

   const currentQuestion = questions[currentQuestionIndex];

   return (
      <>
         {isGameOver ? (
            <ResultScreen
               score={score}
               totalQuestions={questions.length}
               elapsedTime={elapsedTime}
               id={id}
            />
         ) : (
            <QuizQuestion
               question={currentQuestion}
               currentQuestionIndex={currentQuestionIndex}
               totalQuestions={questions.length}
               onAnswerSubmit={handleAnswerSubmit}
               onStartQuiz={handleStartQuiz}
               isPlaying={isPlaying}
               elapsedTime={elapsedTime}
            />
         )}
         <div className="return">
            <Link to={'/'} className="returnButton">Retour aux quizz</Link>
         </div>

      </>
   );
};

export default QuizQuestions;