// localhost:8080/wp/v2/post
const { VITE_URL_WP } = import.meta.env;

export async function getAllQuizz() {
   const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/quizzes');

   if (!response.ok) {
      throw new Error('Failed to fetch quizzes');
   }

   const data = await response.json();

   return { data };
}

export async function getQuizById(id) {
   const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/quizzes/' + id);

   if (!response.ok) {
      throw new Error('Failed to fetch quiz');
   }

   const data = await response.json();

   return { data };
}