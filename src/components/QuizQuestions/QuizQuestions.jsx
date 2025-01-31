import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getQuizById } from '../../services/Quiz.service';
import { Link } from 'react-router-dom';
import './QuizQuestions.css';
import * as fuzzball from 'fuzzball';

const QuizQuestions = () => {
   const { id } = useParams();
   const location = useLocation();
   const description = location.state?.description ?? '';

   const [questions, setQuestions] = useState([]);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [userAnswer, setUserAnswer] = useState('');
   const [isCorrect, setIsCorrect] = useState(null);
   const [score, setScore] = useState(0);

   useEffect(() => {
      getQuizById(id)
         .then((result) => {
            setQuestions(result.data.questions_du_quiz);
         })
         .catch((error) => console.error('Error fetching quiz:', error));
   }, [id]);

   if (questions.length === 0) return <p>Chargement...</p>;

   const currentQuestion = questions[currentQuestionIndex];

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
            alert(`Quiz terminé ! Votre score : ${score + (isMatch ? 1 : 0)}/${questions.length}`);
         }
      }, 1000);
   };

   return (
      <>
         <p className="description">{description}</p>
         <div className="quiz-container">
            <h2>Question {currentQuestionIndex + 1} / {questions.length}</h2>
            <p>{currentQuestion.question}</p>
            <input
               type="text"
               value={userAnswer}
               onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button onClick={handleSubmit}>Valider</button>
            {isCorrect === true && <p className="correct">Bonne réponse ! ✅</p>}
            {isCorrect === false && <p className="incorrect">Mauvaise réponse ❌</p>}
         </div>

         <div className="return">
            <Link to={'/'} className="returnButton">Retour aux quizz</Link>
         </div>
      </>
   );
};

export default QuizQuestions;