import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../../services/Quiz.service';
import { Link } from 'react-router-dom';
import './QuizQuestions.css';
import * as fuzzball from 'fuzzball';

import { getCurrentUser } from '../../services/Auth.service';
import { createScoreboard } from '../../services/ScoreBoard.service';

const QuizQuestions = () => {
   const { id } = useParams();

   const [questions, setQuestions] = useState([]);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [userAnswer, setUserAnswer] = useState('');
   const [isCorrect, setIsCorrect] = useState(null);
   const [score, setScore] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isGameOver, setIsGameOver] = useState(false);
   const [elapsedTime, setElapsedTime] = useState(0);
   const [startTime, setStartTime] = useState(null);
   const [timerActive, setTimerActive] = useState(false);

   const [userId, setUserId] = useState(null);

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

   if (questions.length === 0 || !questions[currentQuestionIndex]) {
      return <p>Chargement...</p>;
   }

   const currentQuestion = questions[currentQuestionIndex];

   const handleStartQuiz = () => {
      setStartTime(Date.now());
      setIsPlaying(true);
      setTimerActive(true); // Start the timer when the quiz starts
   };

   // End of the quiz
   const gameOver = () => {
      setIsGameOver(true);
      setTimerActive(false); // Stop the timer

      // Post scoreboard if user is logged in
      if (userId) {
         try {
            const createdScoreboard = createScoreboard(userId, id, scorePercent, finalScore, elapsedTime);
         } catch (error) {
            console.error('Error creating scoreboard:', error);
         }
      }
   };

   // Feedback message
   const getFeedbackMessage = () => {
      if (score === questions.length) return 'Parfait ! 🎉';
      if (score >= questions.length * 0.7) return 'Bien joué ! 💪';
      return 'Tu peux encore t\'améliorer ! 😉';
   };

   // Submit answer
   const handleSubmit = () => {
      const acceptedAnswers = [
         currentQuestion.reponse_fr,
         currentQuestion.reponse_en,
         currentQuestion.reponse_alternative
      ];

      // Check if userAnswer is in acceptedAnswers
      const scores = acceptedAnswers.map((answer) => ({
         answer,
         score: fuzzball.ratio(userAnswer.trim().toLowerCase(), answer.toLowerCase())
      }));

      // Find the best match
      const bestMatch = scores.reduce((best, current) =>
         current.score > best.score ? current : best,
         { answer: '', score: 0 }
      );

      // Check if score is greater than 80%
      const isMatch = bestMatch.score >= 80;

      if (isMatch) {
         setIsCorrect(true);
         setScore((prevScore) => prevScore + 1);
      } else {
         setIsCorrect(false);
      }

      // Go to next question after 1 second
      setTimeout(() => {
         if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setUserAnswer('');
            setIsCorrect(null);
         } else {
            gameOver();
         }
      }, 1000);
   };

   // Score percentage
   const scorePercent = Math.round((score / questions.length) * 100);

   // Penalty factor
   const penalty = 0.2;

   // Calculate final score
   const finalScore = Math.round(scorePercent - (penalty * elapsedTime));

   const feedbackMessage = getFeedbackMessage();

   return (
      <>
         {isGameOver ? (
            <div className="quiz-end-container">
               <h2>{feedbackMessage}</h2>
               <p>Tu as {score} bonne(s) réponse(s) sur {questions.length}</p>
               <p className="end-title">Score en pourcentage</p>
               <span className="accent">{scorePercent}%</span>
               <p className="end-title">Temps total</p>
               <span className="accent">{elapsedTime} secondes</span>
               <p className="end-title">Ton score final</p>
               <span className="accent">{finalScore}</span>
            </div>
         ) : (
            <div className="quiz-container">
               <h2>Question {currentQuestionIndex + 1} / {questions.length}</h2>
               <p>{currentQuestion.question}</p>
               <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onFocus={handleStartQuiz}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
               />
               <button onClick={handleSubmit}>Valider</button>
               {isCorrect === true && <p className="correct">Bonne réponse ! ✅</p>}
               {isCorrect === false && <p className="incorrect">❌ La bonne réponse est : {currentQuestion.reponse_fr}</p>}

               {timerActive && <p>Temps écoulé : {elapsedTime} secondes</p>}
            </div>
         )}

         <div className="return">
            <Link to={'/'} className="returnButton">Retour aux quizz</Link>
         </div>
      </>
   );
};

export default QuizQuestions;
