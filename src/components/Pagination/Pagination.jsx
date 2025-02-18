import './Pagination.css';
import { FaAnglesLeft, FaAngleLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, goToPage }) => {

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
         <div className="pagination">
            <button
               onClick={() => goToPage(1)}
               disabled={currentPage === 1}>
               <FaAnglesLeft />
            </button>
            <button
               onClick={() => goToPage(currentPage - 1)}
               disabled={currentPage === 1}>
               <FaAngleLeft />
            </button>

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

            <button
               onClick={() => goToPage(currentPage + 1)}
               disabled={currentPage === totalPages}>
               <FaAngleRight />
            </button>
            <button
               onClick={() => goToPage(totalPages)}
               disabled={currentPage === totalPages}>
               <FaAnglesRight />
            </button>
         </div>
      </>
   );

};

export default Pagination;