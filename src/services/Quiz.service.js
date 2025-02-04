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

export async function createQuiz(quiz) {

   try {
      const wpApiSettings = window.wpApiSettings;
      const nonce = wpApiSettings?.nonce;

      if (!nonce) {
         console.log('Nonce not found');
         return false;

      }

      const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/quizz', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': nonce,
         },
         body: JSON.stringify({
            title: quiz.title.rendered,
            description: quiz.description,
            difficulty: quiz.difficulte
         }),
         credentials: 'include',
      });

      return response.ok;
   } catch (error) {
      console.error('Error creating quiz:', error);
      return false;
   }
}