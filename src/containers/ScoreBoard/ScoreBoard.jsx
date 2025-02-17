import { useState, useEffect } from 'react';
import { getAllScoreBoard } from '../../services/ScoreBoard.service';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import './ScoreBoard.css';

import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const ScoreBoard = () => {

   const [scoreBoard, setScoreBoard] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const cardsPerPage = 1;

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

   // Fonction pour changer de page
   const goToPage = (page) => setCurrentPage(page);

   const generatePagination = () => {
      // Si le nombre de pages est inferieur ou egal a 7, on affiche toutes les pages
      // Sinon, on applique la pagination avec "..."
      if (totalPages <= 7) {
         let pagesToDisplay = []; // Tableau pour stocker les pages à afficher
         for (let i = 1; i <= totalPages; i++) {
            pagesToDisplay.push(i);
         }
         return pagesToDisplay;
      }

      let pagesToDisplay = [1];

      // Ajouter les pages avant, la page actuelle et après
      if (currentPage > 3) pagesToDisplay.push(currentPage - 1);
      if (currentPage > 2) pagesToDisplay.push(currentPage);
      if (currentPage < totalPages - 1) pagesToDisplay.push(currentPage + 1);
      if (currentPage < totalPages - 2) pagesToDisplay.push(currentPage + 2);

      pagesToDisplay.push(totalPages);

      // Ajouter "..." si des écarts existent
      let formattedPages = [];
      for (let i = 0; i < pagesToDisplay.length; i++) {
         if (i > 0 && pagesToDisplay[i] !== pagesToDisplay[i - 1] + 1) {
            formattedPages.push("...");
         }
         formattedPages.push(pagesToDisplay[i]);
      }

      return formattedPages;
   };

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
               <div className="pagination">
                  <button onClick={() => goToPage(1)} disabled={currentPage === 1}><FaAnglesLeft /></button>
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}><FaAngleLeft /></button>

                  {generatePagination().map((page, index, array) => (
                     <span key={page}>
                        {index > 0 && page !== array[index - 1] + 1 && <span className="dots">...</span>}
                        <button
                           onClick={() => goToPage(page)}
                           className={currentPage === page ? 'active' : ''}
                        >
                           {page}
                        </button>
                     </span>
                  ))}

                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}><FaAngleRight /></button>
                  <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}><FaAnglesRight /></button>
               </div>
            )}
         </div>
      </>
   );
};

export default ScoreBoard;