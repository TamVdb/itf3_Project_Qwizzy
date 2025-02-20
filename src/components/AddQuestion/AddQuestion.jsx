import { useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { handleSuccess, handleError } from '../../utilsToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AddQuestion.css';

const AddQuestion = ({ questions, setQuestions, onFinish }) => {
   const [newQuestion, setNewQuestion] = useState({
      question: '',
      answerFR: '',
      answerEN: '',
      answerAlt: ''
   });

   const handleAddQuestion = () => {

      setQuestions([...questions, newQuestion]);
      setNewQuestion({ question: '', answerFR: '', answerEN: '', answerAlt: '' });

      //Toast
      handleSuccess("Question ajoutée 👍");
   };

   return (
      <div className="add-question-section">
         <h2>Ajouter des questions</h2>
         <p>Ajoutez vos questions une par une, puis cliquez sur "Terminer" lorsque vous avez fini.</p>
         <div className="add-question-container">
            <div className="add-question-form">
               <div>
                  <label htmlFor='question'>Question<span className="required">*</span></label>
                  <input type="text" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />
                  {newQuestion.question.trim().length > 0 && newQuestion.question.trim().length < 5 && (
                     <p className="error">La question est requise et doit contenir au moins 5 caractères.</p>
                  )}
               </div>
               <div>
                  <label htmlFor='answerFR'>Réponse FR<span className="required">*</span></label>
                  <input type="text" value={newQuestion.answerFR} onChange={(e) => setNewQuestion({ ...newQuestion, answerFR: e.target.value })} />
                  {newQuestion.answerFR.trim().length > 0 && newQuestion.answerFR.trim().length < 5 && (
                     <p className="error">La réponse en français est requise et doit contenir au moins 5 caractères.</p>
                  )}
               </div>
               <div>
                  <label htmlFor='answerEN'>Réponse EN</label>
                  <input type="text" value={newQuestion.answerEN} onChange={(e) => setNewQuestion({ ...newQuestion, answerEN: e.target.value })} />
               </div>
               <div>
                  <label htmlFor='answerAlt'>Réponse alternative<span className="required">*</span></label>
                  <input type="text" value={newQuestion.answerAlt} onChange={(e) => setNewQuestion({ ...newQuestion, answerAlt: e.target.value })} />
                  {newQuestion.answerAlt.trim().length > 0 && newQuestion.answerAlt.trim().length < 5 && (
                     <p className="error">La réponse alternative est requise et doit contenir au moins 5 caractères.</p>
                  )}
               </div>

               <button type="button"
                  onClick={handleAddQuestion}
                  disabled={newQuestion.question.trim().length < 5 || newQuestion.answerFR.trim().length < 5 || newQuestion.answerAlt.trim().length < 5}><FaCirclePlus />Ajouter cette question</button>
            </div>

            {/* Liste des questions ajoutées */}
            <div className="add-question-list">
               {questions.length > 0 && (
                  <div>
                     <h3>Questions ajoutées :</h3>
                     <div className="question-list">
                        {questions.slice(-5).map((q, index) => (
                           <div key={index} className="question">
                              <p className="question-title">{questions.length - 5 + index + 1}. {q.question}</p>
                              <p className="question-answers">FR: {q.answerFR} | EN: {q.answerEN} | Alt: {q.answerAlt}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
         <button className="save-quiz" type="button" onClick={onFinish}><FaSave />Terminer et enregistrer le quiz</button>
      </div>
   );
};

export default AddQuestion;
