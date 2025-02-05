import { useState } from 'react';
import { createQuiz, uploadImage } from '../../services/Quiz.service';
import './AddQuiz.css';

const AddQuiz = () => {

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [difficulty, setDifficulty] = useState('Facile');
   const [image, setImage] = useState(null);

   const handleAddQuizSubmit = async (e) => {
      e.preventDefault();

      try {
         let vignetteId = null;

         // Si une image est selectionnée, l'uploader
         if (image) {
            vignetteId = await uploadImage(image);
            console.log('Image uploaded with ID:', vignetteId);
         }

         // Création du quiz avec l'ID de l'image
         const success = await createQuiz({ title, description, difficulty, vignette: vignetteId ? { ID: vignetteId } : null });

         if (success) {
            console.log('Quiz ajouté avec succès');
            // Reset form fields
            setTitle('');
            setDescription('');
            setDifficulty('Facile');
            setImage(null);
         }
      } catch (error) {
         console.error('Erreur lors de l\'ajout du quiz:', error);
      }
   };

   return (
      <>
         <div className="add-quiz-container">
            <h2>Ajouter un nouveau quiz</h2>
            <form className="add-quiz-form" onSubmit={handleAddQuizSubmit}>
               <div>
                  <label htmlFor='title'>Titre</label>
                  <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor='description'>Description</label>
                  <textarea id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} rows={5} />
               </div>

               <div>
                  <label htmlFor='difficulty'>Difficulté</label>
                  <select id='difficulty' value={difficulty} onChange={e => setDifficulty(e.target.value)} >
                     <option value='Facile'>Facile</option>
                     <option value='Moyen'>Moyen</option>
                     <option value='Difficile'>Difficile</option>
                  </select>
               </div>
               <div>
                  <label htmlFor='image'>Image</label>
                  <input type='file' id='image' onChange={e => setImage(e.target.files[0])} />
               </div>
               <button type="submit">Ajouter le quiz</button>
            </form>
         </div>
      </>
   );
};

export default AddQuiz;