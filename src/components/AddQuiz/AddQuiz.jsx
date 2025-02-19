import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createQuiz, uploadImage, createQuestion } from '../../services/Quiz.service';
import { getCurrentUser } from '../../services/Auth.service';

import { handleSuccess, handleError } from '../../utilsToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AddQuiz.css';

const AddQuiz = () => {

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [difficulty, setDifficulty] = useState('Facile');
   const [image, setImage] = useState(null);
   const [questions, setQuestions] = useState([]);
   const [newQuestion, setNewQuestion] = useState({
      question: '',
      answerFR: '',
      answerEN: '',
      answerAlt: ''
   });

   const navigate = useNavigate();

   const handleAddQuestion = () => {
      if (newQuestion.question.trim()) {
         setQuestions([...questions, newQuestion]);
         setNewQuestion({ question: '', answerFR: '', answerEN: '', answerAlt: '' });
      }
   };

   const handleAddQuizSubmit = async (e) => {
      e.preventDefault();

      try {
         // Check if user is logged in
         const token = localStorage.getItem('token');
         if (!token) {
            handleError("Vous n'êtes pas connecté !");
            return;
         }

         // Get current user
         const user = await getCurrentUser(token);
         if (!user) {
            console.error("Utilisateur non trouvé !");
            return;
         }

         // If image is provided, upload it
         let vignetteId = image ? await uploadImage(image) : 221;
         // console.log('Image uploaded with ID:', vignetteId);

         const quizData = {
            title,
            status: "published",
            description,
            difficulty,
            vignette: { ID: vignetteId },
            user: user.id,
            questions_du_quiz: questions,
         };

         const quizId = await createQuiz(quizData); // Récupérer l'ID du quiz
         console.log("Quiz created:", quizId);

         if (quizId) {
            // Add questions related to the quiz
            for (const question of questions) {
               await createQuestion({
                  ...question,
                  quiz: [quizId]
               });
            }

            //Toast
            handleSuccess("Quiz et questions ajoutés avec succès");

            // Reset form fields
            setTitle('');
            setDescription('');
            setDifficulty('Facile');
            setImage(null);
            setQuestions([]);
            setTimeout(() => navigate('/'), 2000);
         }
      } catch (error) {
         handleError("Une erreur est survenue !");
         console.error("Erreur lors de l'ajout du quiz:", error);
      }
   };

   return (
      <>
         <ToastContainer className="toast-container" />
         <div className="add-quiz-container">
            <h2>Ajouter un nouveau quiz</h2>
            <form className="add-quiz-form" onSubmit={handleAddQuizSubmit}>
               <div>
                  <label htmlFor='title'>Titre</label>
                  <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor='description'>Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} />
               </div>
               <div>
                  <label htmlFor='difficulty'>Difficulté</label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value)} >
                     <option value='Facile'>Facile</option>
                     <option value='Moyen'>Moyen</option>
                     <option value='Difficile'>Difficile</option>
                  </select>
               </div>
               <div>
                  <label htmlFor='image'>Image</label>
                  <input type='file' onChange={e => setImage(e.target.files[0])} />
               </div>

               {/* Ajout des questions */}
               <div className="add-question-section">
                  <h3>Ajouter des questions</h3>
                  <div>
                     <label htmlFor='question'>Question</label>
                     <input type="text" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />
                  </div>
                  <div>
                     <label htmlFor='answerFR'>Réponse FR</label>
                     <input type="text" value={newQuestion.answerFR} onChange={(e) => setNewQuestion({ ...newQuestion, answerFR: e.target.value })} />
                  </div>
                  <div>
                     <label htmlFor='answerEN'>Réponse EN</label>
                     <input type="text" value={newQuestion.answerEN} onChange={(e) => setNewQuestion({ ...newQuestion, answerEN: e.target.value })} />
                  </div>
                  <div>
                     <label htmlFor='answerAlt'>Réponse alternative</label>
                     <input type="text" value={newQuestion.answerAlt} onChange={(e) => setNewQuestion({ ...newQuestion, answerAlt: e.target.value })} />
                  </div>
                  <button type="button" onClick={handleAddQuestion}>Ajouter la question</button>
               </div>

               <button type="submit">Ajouter le quiz</button>
            </form>

            {/* Liste des questions ajoutées */}
            <ul>
               {questions.map((q, index) => (
                  <li key={index}>
                     {q.question} - FR: {q.answerFR} | EN: {q.answerEN} | Alt: {q.answerAlt}
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};

export default AddQuiz;
