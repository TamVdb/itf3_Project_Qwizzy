import { useState, useEffect } from 'react';
import { getAllScoreBoard } from '../../services/ScoreBoard.service';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import './ScoreBoard.css';

const ScoreBoard = () => {

   const [scoreBoard, setScoreBoard] = useState([]);

   // Get all scoreboards
   useEffect(() => {
      getAllScoreBoard()
         .then((result) => {
            setScoreBoard(result.data);
         })
         .catch((error) => console.error('Error fetching scoreboards:', error));
   }, []);

   return (
      <>
         <div className="scoreboard-container">
            <h2>Scoreboard</h2>
            <div className="scoreboardList">
               {scoreBoard.map((quiz) => (
                  <ScoreCard
                     key={quiz.quizId}
                     username={quiz.username}
                     quizId={quiz.quizId}
                     title={quiz.title}
                     difficulty={quiz.difficulty}
                     image={quiz.image}
                     scores={quiz.scores}
                  />
               ))
               }
            </div>
         </div>
      </>
   );
};

export default ScoreBoard;