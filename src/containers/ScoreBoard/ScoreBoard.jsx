import { useState, useEffect } from 'react';
import './ScoreBoard.css';

const ScoreBoard = () => {

   const [scoreBoard, setScoreBoard] = useState([]);

   return (
      <>
         <div className="scoreboard-container">
            <h2>Scoreboard</h2>
            <div className="scoreboardList">
               <p>du texte</p>
            </div>
         </div>
      </>
   );
};

export default ScoreBoard;