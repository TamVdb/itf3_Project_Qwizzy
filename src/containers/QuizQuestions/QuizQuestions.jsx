import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuizById } from '../../services/Quiz.service';
import { getCurrentUser } from '../../services/Auth.service';
import { createScoreboard } from '../../services/ScoreBoard.service';
import QuizQuestion from '../../components/QuizQuestion/QuizQuestion';
import ResultScreen from '../ResultScreen/ResultScreen';
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
   const [userId, setUserId] = useState(null);
   const [scoreData, setScoreData] = useState({ scorePercent: 0, finalScore: 0 });

   // Fetch questions for the quiz
   useEffect(() => {
      getQuizById(id)
         .then((result) => {
            setQuestions(result.data.questions_du_quiz);
         })
         .catch((error) => console.error('Error fetching quiz:', error));
   }, [id]);

   // Get current user ID from local storage
   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         getCurrentUser(token)
            .then((result) => {
               setUserId(result.id);
            })
            .catch((error) => console.error('Error fetching current user:', error));
      }
   }, []);

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

   // Calculate score data
   const calculScore = () => {
      const scorePercent = Math.round((score / questions.length) * 100);
      const penalty = 0.2;
      const finalScore = Math.round(scorePercent - (penalty * elapsedTime));
      setScoreData({ scorePercent, finalScore });
      return { scorePercent, finalScore };
   };

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
            const { scorePercent, finalScore } = calculScore();
            setIsGameOver(true);

            if (userId) {
               createScoreboard(userId, id, scorePercent, elapsedTime, finalScore)
                  .catch((error) => console.error('Error creating scoreboard:', error));
            }
         }
      }, 1000);
   };

   if (questions.length === 0 || !questions[currentQuestionIndex]) {
      return <p>Chargement...</p>;
   }

   const currentQuestion = questions[currentQuestionIndex];

   return (
      <>
         {isGameOver ? (
            <ResultScreen
               score={score}
               totalQuestions={questions.length}
               elapsedTime={elapsedTime}
               scoreData={scoreData}
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