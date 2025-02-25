import './ScoreCard.css';

const ScoreCard = ({ quizId, title, difficulty, image, scores }) => {

   // Fin the highest score
   const bestScore = scores.reduce((max, score) => (score.points > max.points ? score : max), scores[0]);

   return (
      <div className="ScoreCard">
         <div className="ScoreCard-info">
            <div className="info">
               <h3>{title}</h3>
               <p>{difficulty}</p>
            </div>
            <div className="scores">
               <div className="title">
                  <span>Pseudo</span>
                  <span>Score</span>
                  <span>Temps</span>
                  <span>Points</span>
                  <span className="date">Date</span>
               </div>
               {scores.map((score, index) => (
                  <div key={index} className={`scoreItem ${score.id === bestScore.id ? 'best' : ''}`}>
                     <p className="pseudo">{score.username}</p>
                     <p className="score">{score.score}%</p>
                     <p className="time">{score.time}s</p>
                     <p className="points">{score.points}</p>
                     <p className="date">{score.date}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className="ScoreCard-img">
            <img src={image} alt={`Image du quiz ${title}`} />
         </div>

      </div>
   );
};

export default ScoreCard;