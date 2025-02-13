import { useState } from 'react';
import * as fuzzball from 'fuzzball';
import './QuizQuestion.css';

const QuizQuestion = ({ question, currentQuestionIndex, totalQuestions, onAnswerSubmit, onStartQuiz, isPlaying, elapsedTime }) => {
   const [userAnswer, setUserAnswer] = useState('');
   const [isCorrect, setIsCorrect] = useState(null);

   const handleSubmit = () => {
      const acceptedAnswers = [
         question.reponse_fr,
         question.reponse_en,
         question.reponse_alternative
      ];

      const scores = acceptedAnswers.map((answer) => ({
         answer,
         score: fuzzball.ratio(userAnswer.trim().toLowerCase(), answer.toLowerCase())
      }));

      const bestMatch = scores.reduce((best, current) =>
         current.score > best.score ? current : best,
         { answer: '', score: 0 }
      );

      const isMatch = bestMatch.score >= 80;
      setIsCorrect(isMatch);
      onAnswerSubmit(isMatch);

      // Reset input after 1 second
      setTimeout(() => {
         setUserAnswer('');
         setIsCorrect(null);
      }, 1000);
   };

   return (
      <div className="quiz-container">
         <h2>Question {currentQuestionIndex + 1} / {totalQuestions}</h2>
         <p>{question.question}</p>
         <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onFocus={onStartQuiz}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
         />
         <button onClick={handleSubmit}>Valider</button>
         {isCorrect === true && <p className="correct">Bonne réponse ! ✅</p>}
         {isCorrect === false && <p className="incorrect">❌ La bonne réponse est : {question.reponse_fr}</p>}
         {isPlaying && <p>Temps écoulé : {elapsedTime} secondes</p>}
      </div>
   );
};

export default QuizQuestion;