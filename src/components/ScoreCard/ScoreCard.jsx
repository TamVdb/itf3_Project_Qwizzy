import './ScoreCard.css';

const ScoreCard = ({ quizId, title, difficulty, image, scores }) => {
   return (
      <div className="scoreCard">
         <div className="scoreCard-info">
            <div className="info">
               <h3>{title}</h3>
               <p>{difficulty}</p>
            </div>
            <div className="scores">
               {scores.map((score, index) => (
                  <div key={index} className="scoreItem">
                     <p className="score">Score : {score.score}</p>
                     <p className="time">Temps : {score.time}s</p>
                     <p className="date">{score.date}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className="scoreCard-img">
            <img src={image} alt="" />
         </div>

      </div>
   );
};

export default ScoreCard;