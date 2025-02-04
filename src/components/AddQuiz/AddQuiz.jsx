import { useState } from 'react';
import { createQuiz } from '../../services/Quiz.service';
import './AddQuiz.css';

const AddQuiz = () => {

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [difficulty, setDifficulty] = useState('Facile');

   const handleAddQuizSubmit = async (e) => {
      e.preventDefault();

      try {
         const success = await createQuiz({ title, description, difficulty });

         if (success) {
            console.log('Quiz added successfully');
            // Reset form fields
            setTitle('');
            setDescription('');
            setDifficulty('');
         }
      } catch (error) {
         console.error('Error adding quiz:', error);
      }
   };

   return (
      <>
         <div className="add-quiz-container">
            <h2>Ajouter un nouveau quiz</h2>
            <form className="add-quiz-form" onSubmit={handleAddQuizSubmit}>
               <label htmlFor='title'>Titre</label>
               <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
               <label htmlFor='description'>Description</label>
               <textarea id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} />
               <div>
                  <label htmlFor='difficulty'>Difficulté</label>
                  <select id='difficulty' value={difficulty} onChange={e => setDifficulty(e.target.value)} >
                     <option value='easy'>Facile</option>
                     <option value='middle'>Moyen</option>
                     <option value='hard'>Difficile</option>
                  </select>
               </div>
               <button type="submit">Ajouter le quiz</button>
            </form>
         </div>
      </>
   );
};

export default AddQuiz;