import './UserScoreCard.css';

const UserScoreCard = ({ quizId, title, difficulty, image, scores }) => {

   return (
      <div className="UserScoreCard">
         <div className="UserScoreCard-info">
            <div className="info">
               <h3>{title}</h3>
               <p>{difficulty}</p>
            </div>
            <div className="scores">
               <div className="title">
                  <span>Score</span>
                  <span>Temps</span>
                  <span>Date</span>
               </div>
               {scores.map((score, index) => (
                  <div key={index} className="scoreItem">
                     <p className="score">{score.score}%</p>
                     <p className="time">{score.time}s</p>
                     <p className="date">{score.date}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className="UserScoreCard-img">
            <img src={image} alt="" />
         </div>

      </div>
   );
};

export default UserScoreCard;