const { VITE_URL_WP } = import.meta.env;

export async function getAllQuizz() {
   const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/quizz');

   if (!response.ok) {
      throw new Error('Failed to fetch quizz');
   }

   const data = await response.json();

   return { data };
}

export async function getQuizById(id) {
   const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/quizz/' + id);

   if (!response.ok) {
      throw new Error('Failed to fetch quiz');
   }

   const data = await response.json();

   return { data };
}

export async function uploadImage(image) {

   try {
      const token = localStorage.getItem('token');

      if (!token) {
         console.log('Token not found');
         return false;
      }

      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/media', {
         method: 'POST',
         headers: {
            'Authorization': `Bearer ${token}`,
         },
         body: formData,
         credentials: 'include',
      });

      if (!response.ok) {
         throw new Error('Failed to upload image');
      }

      const data = await response.json();

      // Return the ID of the uploaded image
      return data.id;

   } catch (error) {
      console.error('Error uploading image:', error);
      return false;
   }
}

/**
 * Crée un quiz via Pods REST API.
 * @param title         Quiz title
 * @param description   Quiz description
 * @param difficulty    Quiz difficulty
 * @param vignette      Vignette ID
 * @param user          User ID
 */
export async function createQuiz(quiz) {

   try {
      const token = localStorage.getItem('token');

      if (!token) {
         console.log('Token not found');
         return false;
      }

      const body = {
         title: quiz.title,
         description: quiz.description,
         difficulte: [quiz.difficulty],
         vignette: { ID: quiz.vignette.ID },
         user: quiz.user
      };

      const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/quizz', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify(body),
         credentials: 'include',
      });

      if (!response.ok) {
         throw new Error('Failed to create quiz');
      }

      return response.ok;

   } catch (error) {
      console.error('Error creating quiz:', error);
      return false;
   }
}