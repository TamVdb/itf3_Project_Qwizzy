const { VITE_URL_WP } = import.meta.env;

export async function loginUser(username, password) {

   const formData = new URLSearchParams();
   formData.append('log', username);
   formData.append('pwd', password);

   try {

      const response = await fetch(VITE_URL_WP + 'wp-login.php', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: formData.toString(),
         credentials: 'include',
      });

      return response.ok;
   } catch (err) {
      console.error('Erreur lors de la connexion :', err);
      throw err;
   }
}