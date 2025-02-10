const { VITE_URL_WP } = import.meta.env;

/**
 * Ajouter un score au scoreboard utilisateur via Pods REST API.
 * @param userId        Connected User ID
 * @param quizId        Quiz ID
 * @param finalScore    Score en pourcentage
 * @param time          Temps total en secondes    
 * @returns
 */

export async function createScoreboard(userId, quizId, finalScore, time, postTitle) {

   try {
      const token = localStorage.getItem('token');

      if (!token) {
         console.log('Token not found');
         return false;
      }

      const postTitle = `Quiz ${quizId} - User ${userId} - Score ${finalScore}%`;

      const scoreboard = {
         title: postTitle,
         user: userId,
         related_quiz: quizId,
         score: finalScore,
         time: time,
         status: "publish"
      };

      const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/scoreboards', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify(scoreboard),
         credentials: 'include',
      });

      if (!response.ok) {
         throw new Error('Failed to create scoreboard');
      }

      return response.ok;

   } catch (error) {
      console.error('Error saving scoreboard :', error);
      return false;
   }
}

export async function getScoreBoard() {
   const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/scoreboard');

   if (!response.ok) {
      throw new Error('Failed to fetch scoreboard');
   }

   const data = await response.json();

   return { data };
}

export async function getScoreBoardByUser(id) {
   const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/scoreboard/' + id);

   if (!response.ok) {
      throw new Error('Failed to fetch scoreboard');
   }

   const data = await response.json();

   return { data };
}