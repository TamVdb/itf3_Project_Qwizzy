import { useState } from 'react';

import './AddQuestion.css';

const AddQuestion = () => {

   const [question, setQuestion] = useState('');
   const [answerFR, setAnswerFR] = useState('');
   const [answerEN, setAnswerEN] = useState('');
   const [answerAlt, setAnswerAlt] = useState('');

   const handleAddAllQuestionsSubmit = async (e) => {
      e.preventDefault();


   };

   return (
      <>
         <div className="add-question-container">
            <h2>Ajouter une nouvelle question</h2>
            <form className="add-question-form" onSubmit={handleAddAllQuestionsSubmit}>
               <div>
                  <label htmlFor='question'>Question</label>
                  <input type='text' id='question' value={question} onChange={(e) => setQuestion(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor='answerFR'>Réponse en français</label>
                  <input type='text' id='answerFR' value={answerFR} onChange={(e) => setAnswerFR(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor='answerEN'>Réponse en anglais</label>
                  <input type='text' id='answerEN' value={answerEN} onChange={(e) => setAnswerEN(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor='answerAlt'>Réponse alternative</label>
                  <input type='text' id='answerAlt' value={answerAlt} onChange={(e) => setAnswerAlt(e.target.value)} required />
               </div>
               {/* Passer à la question suivante */}
               <button onClick="">Ajouter la question</button>

               {/* Envoyer toutes les questions au quiz concerné */}
               <div>
                  <button type="submit">Terminer</button>
               </div>
            </form>
         </div>
      </>
   );
};

export default AddQuestion;