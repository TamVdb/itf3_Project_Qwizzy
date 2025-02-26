import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/Auth.service';
import { createScoreboard } from '../../services/ScoreBoard.service';
import './ResultScreen.css';

const ResultScreen = ({ score, totalQuestions, elapsedTime, id }) => {

   const [userId, setUserId] = useState(null);
   const [scoreData, setScoreData] = useState({ scorePercent: 0, finalScore: 0 });

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

   useEffect(() => {
      calculScore();
   }, [score, totalQuestions, elapsedTime]);

   const calculScore = () => {
      // console.log(score, totalQuestions);

      const scorePercent = Math.round((score / totalQuestions) * 100);
      // console.log(scorePercent);

      const penalty = 0.2;
      const finalScore = Math.round(scorePercent - (penalty * elapsedTime));
      setScoreData({ scorePercent, finalScore });
   };

   useEffect(() => {
      if (userId && scoreData.scorePercent > 0) {
         createScoreboard(userId, id, scoreData.scorePercent, elapsedTime, scoreData.finalScore)
            .catch((error) => console.error('Erreur lors de l\'enregistrement du scoreboard :', error));
      }
   }, [userId, id, scoreData, elapsedTime]);

   const getFeedbackMessage = () => {
      if (score === totalQuestions) return 'Parfait ! 🎉';
      if (score >= totalQuestions * 0.7) return 'Bien joué ! 💪';
      return 'Tu peux encore t\'améliorer ! 😉';
   };

   return (
      <div className="quiz-end-container">
         <h2>{getFeedbackMessage()}</h2>
         <p>Tu as {score} bonne(s) réponse(s) sur {totalQuestions}</p>
         <p className="end-title">Score en pourcentage</p>
         <span className="accent">{scoreData.scorePercent}%</span>
         <p className="end-title">Temps total</p>
         <span className="accent">{elapsedTime - 1} secondes</span>
         <p className="end-title">Ton score final</p>
         <span className="accent">{scoreData.finalScore}</span>
      </div>
   );
};

export default ResultScreen;