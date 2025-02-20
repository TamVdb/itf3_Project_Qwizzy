import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddQuestion from '../AddQuestion/AddQuestion';

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
   const [showQuestions, setShowQuestions] = useState(false); // État pour afficher le formulaire des questions

   const navigate = useNavigate();

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
            status: "publish",
            description,
            difficulty,
            vignette: { ID: vignetteId },
            user: user.id,
            questions_du_quiz: questions,
         };

         const quizId = await createQuiz(quizData); // Get quiz ID
         // console.log("Quiz created:", quizId);

         if (quizId) {
            // Add questions related to the quiz
            for (const question of questions) {
               await createQuestion({
                  ...question,
                  quiz: [quizId]
               });
            }

            //Toast
            handleSuccess("Quiz bien ajouté !");

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
            {!showQuestions ? (
               <>
                  <h2>Ajouter un nouveau quiz</h2>
                  <form className="add-quiz-form">
                     <div>
                        <label htmlFor='title'>Titre<span className="required">*</span></label>
                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                        {title.trim().length > 0 && title.trim().length < 10 && (
                           <p className="error">Le titre doit contenir au moins 10 caractères.</p>
                        )}
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

                     <button type="button"
                        onClick={() => setShowQuestions(true)}
                        disabled={title.trim().length < 10}>Ajouter des questions</button>
                  </form>
               </>
            ) : (
               <AddQuestion questions={questions} setQuestions={setQuestions} onFinish={handleAddQuizSubmit} />
            )}
         </div>
      </>
   );
};

export default AddQuiz;
