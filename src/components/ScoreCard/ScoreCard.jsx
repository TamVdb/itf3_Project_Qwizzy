import './ScoreCard.css';

const ScoreCard = ({ quizId, username, title, difficulty, image, scores }) => {

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
                  <span>Date</span>
               </div>
               {scores.map((score, index) => (
                  <div key={index} className="scoreItem">
                     <p className="pseudo">{username}</p>
                     <p className="score">{score.score}%</p>
                     <p className="time">{score.time}s</p>
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