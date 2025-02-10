import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/Auth.service';
import { getScoreBoardByUser } from '../../services/ScoreBoard.service';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import './UserScoreBoard.css';

const UserScoreBoard = () => {

   const [userId, setUserId] = useState(null);
   const [scoreBoard, setScoreBoard] = useState([]);

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

   // Get score board for the current user
   useEffect(() => {
      if (userId) {
         getScoreBoardByUser(userId)
            .then((result) => {
               setScoreBoard(result.data);
            })
            .catch((error) => console.error('Error fetching score board:', error));
      }
   }, [userId]);

   return (
      <>
         <div className="scoreboardList-container">
            <h2>Scoreboard</h2>
            <div className="scorebardList">
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