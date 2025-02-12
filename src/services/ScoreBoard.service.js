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

export async function getAllScoreBoard() {

   try {

      const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/scoreboards');

      if (!response.ok) {
         throw new Error('Failed to fetch scoreboard');
      }

      const data = await response.json();

      // Group data by quiz ID
      const groupedByQuiz = {};

      data.forEach(scoreboard => {
         const quizId = scoreboard.related_quiz[0]?.ID;

         if (!quizId) return;

         if (!groupedByQuiz[quizId]) {
            groupedByQuiz[quizId] = {
               quizId,
               username: scoreboard.user[0].display_name,
               title: scoreboard.related_quiz[0].post_title,
               difficulty: scoreboard.related_quiz[0].difficulte,
               image: scoreboard.related_quiz[0].vignette,
               scores: [],
            };
         }

         groupedByQuiz[quizId].scores.push({
            id: scoreboard.id,
            score: scoreboard.score,
            time: scoreboard.time,
            date: scoreboard.date
         });

         // Format the date for french locale
         groupedByQuiz[quizId].scores.forEach(score => {
            const date = new Date(score.date);
            score.date = date.toLocaleDateString('fr-FR', {
               day: '2-digit',
               month: '2-digit',
               year: 'numeric'
            });
         });
      });

      return { data: Object.values(groupedByQuiz) };

   } catch (error) {
      console.error('Error fetching scoreboard:', error);
      return { data: [] };
   }
}

export async function getScoreBoardByUser(userId) {

   try {
      const response = await fetch(VITE_URL_WP + 'wp-json/wp/v2/scoreboards?user=' + userId);

      if (!response.ok) {
         throw new Error('Failed to fetch scoreboard');
      }

      const data = await response.json();

      // Filtrer les scoreboards pour ne garder que ceux du userId donné
      const userScoreboards = data.filter(scoreboard =>
         scoreboard.user && scoreboard.user[0]?.ID == userId
      );

      // Group data by quiz ID
      const groupedByQuiz = {};

      userScoreboards.forEach(scoreboard => {
         const quizId = scoreboard.related_quiz[0]?.ID;

         if (!quizId) return;

         if (!groupedByQuiz[quizId]) {
            groupedByQuiz[quizId] = {
               quizId,
               title: scoreboard.related_quiz[0].post_title,
               difficulty: scoreboard.related_quiz[0].difficulte,
               image: scoreboard.related_quiz[0].vignette,
               scores: [],
            };
         }

         groupedByQuiz[quizId].scores.push({
            id: scoreboard.id,
            score: scoreboard.score,
            time: scoreboard.time,
            date: scoreboard.date
         });

         // Format the date for french locale
         groupedByQuiz[quizId].scores.forEach(score => {
            const date = new Date(score.date);
            score.date = date.toLocaleDateString('fr-FR', {
               day: '2-digit',
               month: '2-digit',
               year: 'numeric'
            });
         });
      });

      // Only keep the latest 3 scores for each quiz
      const formattedData = Object.values(groupedByQuiz).map(quiz => ({
         ...quiz,
         scores: quiz.scores.slice(-3)
      }));

      return { data: formattedData };

   } catch (error) {
      console.error('Error fetching scoreboard:', error);
      return { data: [] };
   }
}