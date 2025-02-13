import './ResultScreen.css';

const ResultScreen = ({ score, totalQuestions, elapsedTime, scoreData }) => {
   const { scorePercent, finalScore } = scoreData;

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
         <span className="accent">{scorePercent}%</span>
         <p className="end-title">Temps total</p>
         <span className="accent">{elapsedTime - 1} secondes</span>
         <p className="end-title">Ton score final</p>
         <span className="accent">{finalScore}</span>
      </div>
   );
};

export default ResultScreen;