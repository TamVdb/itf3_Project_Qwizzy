import { useState, useEffect } from 'react';
import { getScoreBoardByUser } from '../../services/ScoreBoard.service';
import UserScoreCard from '../../components/UserScoreCard/UserScoreCard';
import './UserScoreBoard.css';
import { useParams } from 'react-router-dom';

const UserScoreBoard = () => {

   const { userId } = useParams();

   const [userScoreBoard, setUserScoreBoard] = useState([]);

   // Get score board for the current user
   useEffect(() => {
      if (userId) {
         getScoreBoardByUser(userId)
            .then((result) => {
               setUserScoreBoard(result.data);
            })
            .catch((error) => console.error('Erreur lors de la récupération du scoreboard :', error));
      }
   }, [userId]);

   return (
      <>
         <div className="userScoreboard-container">
            <h2>Mes scores</h2>
            <div className="userScoreboardList">
               {userScoreBoard.map((quiz) => (
                  <UserScoreCard
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