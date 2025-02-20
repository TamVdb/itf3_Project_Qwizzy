import { useState, useEffect } from 'react';
import { getAllScoreBoard } from '../../services/ScoreBoard.service';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import Pagination from '../../components/Pagination/Pagination';
import './ScoreBoard.css';

const ScoreBoard = () => {

   const [scoreBoard, setScoreBoard] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const cardsPerPage = 2;

   // Get all scoreboards
   useEffect(() => {
      getAllScoreBoard()
         .then((result) => {
            setScoreBoard(result.data);
         })
         .catch((error) => console.error('Error fetching scoreboards:', error));
   }, []);

   // Nombre total de pages
   const totalPages = Math.ceil(scoreBoard.length / cardsPerPage);

   /** Fixe le nombre de cards à afficher sur la page actuelle
   * Sur la page 1 : les cards 1 et 2 -> scoreBoard.slice(0, 2)
   * Sur la page 2 : les cards 3 et 4 -> scoreBoard.slice(2, 4)
   **/
   const startIndex = (currentPage - 1) * cardsPerPage;
   const endIndex = startIndex + cardsPerPage;
   // Obtenir les cards à afficher sur la page actuelle
   const currentCards = scoreBoard.slice(startIndex, endIndex);

   // // Fonction pour changer de page
   // const goToPage = (page) => setCurrentPage(page);

   return (
      <>
         <div className="scoreboard-container">
            <h2>Scoreboard</h2>
            <div className="scoreboardList">
               {currentCards.length > 0 ? (
                  currentCards.map((quiz) => (
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
               ) : (
                  <p className="message">Pas de scoreboards disponibles</p>
               )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={setCurrentPage}
               />
            )}
         </div>
      </>
   );
};

export default ScoreBoard;