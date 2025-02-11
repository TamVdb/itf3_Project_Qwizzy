import { useState, useEffect } from 'react';
import { getScoreBoardByUser } from '../../services/ScoreBoard.service';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import './UserScoreBoard.css';
import { useParams } from 'react-router-dom';

const UserScoreBoard = () => {

   const { userId } = useParams();

   const [scoreBoard, setScoreBoard] = useState([]);

   // Get score board for the current user
   useEffect(() => {
      if (userId) {
         getScoreBoardByUser(userId)
            .then((result) => {
               setScoreBoard(result.data);
            })
            .catch((error) => console.error('Erreur lors de la récupération du scoreboard :', error));
      }
   }, [userId]);

   return (
      <>
         <div className="userScoreboard-container">
            <h2>Scoreboard</h2>
            <div className="userScoreboardList">
               {scoreBoard.map((quiz) => (
                  <ScoreCard
                     key={quiz.quizId}
                     quizId={quiz.quizId}
                     title={quiz.title}
                     difficulty={quiz.difficulty}
                     image={quiz.image}
                     scores={quiz.scores} // On passe directement le tableau des scores
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default UserScoreBoard;