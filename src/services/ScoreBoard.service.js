const { VITE_URL_WP } = import.meta.env;

/**
 * Ajouter un score au scoreboard utilisateur via Pods REST API.
 * @param userId        Connected User ID
 * @param quizId        Quiz ID
 * @param finalScore    Score en pourcentage
 * @param time          Temps total en secondes    
 * @returns
 */

export async function createScoreboard(userId, id, scorePercent, elapsedTime, finalScore) {

   try {
      const token = localStorage.getItem('token');

      if (!token) {
         console.log('Token not found');
         return false;
      }

      const postTitle = `Quiz ${id} - User ${userId} - Score ${finalScore}`;

      const scoreboard = {
         title: postTitle,
         user: userId,
         related_quiz: id,
         score: scorePercent,
         time: elapsedTime,
         points: finalScore,
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
            points: scoreboard.points,
            time: scoreboard.time,
            date: scoreboard.date
         });

         // Format the date for french locale
         groupedByQuiz[quizId].scores.forEach(score => {
            const date = new Date(score.date);
            if (!isNaN(date.getTime())) {
               score.date = date.toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
               });
            } else {
               console.error("Date invalide:", score.date); // Si la date est invalide
            }
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
            points: scoreboard.points,
            date: scoreboard.date
         });
      });

      // Traiter les scores pour chaque quiz
      const formattedData = Object.values(groupedByQuiz).map(quiz => {
         const bestScore = quiz.scores.reduce((max, score) => (score.points > max.points ? score : max), quiz.scores[0]); // Trouver le meilleur score
         const lastThreeScores = quiz.scores.slice(0, 3); // Garder les 3 derniers scores (déjà triés en BDD)

         // Vérifier si le meilleur score est déjà dans les 3 derniers, sinon l'ajouter
         const scoresToDisplay = lastThreeScores.some(score => score.id === bestScore.id)
            ? lastThreeScores
            : [bestScore, ...lastThreeScores].slice(0, 4); // Garder max 4 scores (meilleur + 3 derniers)

         // Formatter la date pour l'affichage
         scoresToDisplay.forEach(score => {
            const date = new Date(score.date);
            if (!isNaN(date.getTime())) {
               score.date = date.toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
               });
            } else {
               console.error("Date invalide:", score.date);
            }
         });

         return {
            ...quiz,
            scores: scoresToDisplay
         };
      });

      return { data: formattedData };

   } catch (error) {
      console.error('Error fetching scoreboard:', error);
      return { data: [] };
   }
}
