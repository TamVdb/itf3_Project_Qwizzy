const { VITE_URL_WP, VITE_WP_ADMIN_USER, VITE_WP_ADMIN_PASSWORD } = import.meta.env;

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

export async function registerUser(username, email, password) {
   try {
      const response = await fetch(`${VITE_URL_WP}/wp-json/wp/v2/users`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${VITE_WP_ADMIN_USER}:${VITE_WP_ADMIN_PASSWORD}`)
         },
         body: JSON.stringify({
            username,
            email,
            password,
            roles: ["subscriber"],
         }),
      });

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.message || "Erreur lors de l'inscription");
      }

      return data; // Renvoie l'utilisateur créé
   } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      throw error;
   }
}