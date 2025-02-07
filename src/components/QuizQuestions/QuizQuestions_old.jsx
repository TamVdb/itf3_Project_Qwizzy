import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../../services/Quiz.service';
import { Link } from 'react-router-dom';
import './QuizQuestions.css';
import * as fuzzball from 'fuzzball';
import { getCurrentUser } from '../../services/Auth.service';

const QuizQuestions = () => {
   const { id } = useParams();

   const [questions, setQuestions] = useState([]);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [userAnswer, setUserAnswer] = useState('');
   const [isCorrect, setIsCorrect] = useState(null);
   const [score, setScore] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isGameOver, setIsGameOver] = useState(false);
   const [startTime, setStartTime] = useState(null);
   const [elapsedTime, setElapsedTime] = useState(0);
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

   // // Get current user ID
   // useEffect(() => {
   //    getCurrentUser()
   //       .then((result) => {
   //          setUserId(result.data.id);
   //       })
   //       .catch((error) => console.error('Error fetching user:', error));
   // }, []);

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

   // Start the quiz
   const handleStartQuiz = () => {
      setStartTime(Date.now());
      setIsPlaying(true);
   };

   // End of the quiz
   const gameOver = () => {
      const totalTime = (new Date().getTime() - startTime) / 1000;
      setIsGameOver(true);
      setElapsedTime(totalTime);
      setTimerActive(true);
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
         setScore(prevScore => prevScore + 1);
      } else {
         setIsCorrect(false);
      }

      // Go to next question after 1 second
      setTimeout(() => {
         if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setUserAnswer('');
            setIsCorrect(null);
         } else {
            gameOver();
         }
      }, 1000);
   };

   const finalScore = ((score / questions.length) * 100).toFixed(2);
   const feedbackMessage = getFeedbackMessage();

   return (
      <>
         {isGameOver ? (
            <div className="quiz-end-container">
               <h2>{feedbackMessage}</h2>
               <p>Tu as {score} bonne(s) réponse(s) sur {questions.length}</p>
               <p className="end-title">Score final</p>
               <span className="accent">{finalScore}%</span>
               <p className="end-title">Temps total</p>
               <span className="accent">{elapsedTime.toFixed(2)} secondes</span>
            </div>
         ) : (
            <div className="quiz-container">
               <h2>Question {currentQuestionIndex + 1} / {questions.length}</h2>
               <p>{currentQuestion.question}</p>
               <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
               />
               <button onClick={handleSubmit}>Valider</button>
               {isCorrect === true && <p className="correct">Bonne réponse ! ✅</p>}
               {isCorrect === false && <p className="incorrect">❌ La bonne réponse est : {currentQuestion.reponse_fr}</p>}

               {!isPlaying && (
                  <button onClick={handleStartQuiz}>Démarrer le quiz</button>
               )}
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