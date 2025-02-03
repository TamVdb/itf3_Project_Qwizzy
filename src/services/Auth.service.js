const { VITE_URL_WP } = import.meta.env;

export const loginUser = async (username, password) => {
   try {
      const response = await fetch(VITE_URL_WP + 'wp-json/simple-jwt-login/v1/auth', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      // Store JWT Token in local storage
      localStorage.setItem('token', data.data.jwt);

      //Store username in local storage
      localStorage.setItem('username', username);


      return true;

   } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
   }
};

export const registerUser = async (username, email, password) => {
   try {
      const response = await fetch(VITE_URL_WP + 'wp-json/simple-jwt-login/v1/users', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', },
         body: JSON.stringify({
            email: email,
            password: password,
            username: username,
            AUTH_KEY: 'THISISMySpeCiaLAUthCodeForTheApi'
         }),
      });

      const data = await response.json();

      if (response.ok) {
         return { success: true, message: "Inscription réussie !" };
      } else {
         return { success: false, message: data.message || "Une erreur s'est produite." };
      }
   } catch (error) {
      console.error('Erreur lors de la connexion :', err);
      throw err;
   }
};