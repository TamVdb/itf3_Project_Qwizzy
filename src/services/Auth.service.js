const { VITE_URL_WP } = import.meta.env;

export const loginUser = async (username, password) => {

   try {
      const response = await fetch(VITE_URL_WP + 'wp-json/simple-jwt-login/v1/auth', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
         console.error('Login error:', data);
         return false;
      }

      // Check if token is received
      if (!data.data || !data.data.jwt) {
         console.error('No token received!');
         return false;
      }

      // Store JWT Token in local storage
      localStorage.setItem('token', data.data.jwt);
      localStorage.setItem('username', username);

      // // Création d'une session WordPress
      // const wpSessionResponse = await fetch(import.meta.env.VITE_URL_WP + 'wp-login.php', {
      //    method: 'POST',
      //    credentials: 'include', // Important pour gérer les cookies de session
      //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //    body: new URLSearchParams({
      //       log: username,
      //       pwd: password
      //    })
      // });

      // if (!wpSessionResponse.ok) {
      //    console.warn('Failed to create WP session');
      // }

      return true;

   } catch (error) {
      console.error('Login failed :', error);
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
            user_login: username,
            AUTH_KEY: 'THISISMySpeCiaLAUthCodeForTheApi'
         }),
      });

      const data = await response.json();

      // If response is ok, return true
      return response.ok;

   } catch (error) {
      console.error('Login failed :', error);
      return false;
   }
};

export const logoutUser = async () => {
   try {
      // Suppression du token JWT et du username du Local Storage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');

      // Déconnexion WordPress via wp-login.php
      await fetch(import.meta.env.VITE_URL_WP + 'wp-login.php?action=logout', {
         method: 'GET'
      });
   } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
   }
};


export const getCurrentUser = async (token) => {
   try {
      const response = await fetch(import.meta.env.VITE_URL_WP + 'wp-json/wp/v2/users/me', {
         method: 'GET',
         headers: {
            'Authorization': `Bearer ${token}`,
         }
      });

      if (!response.ok) {
         console.error('Failed to get current user');
         return false;
      }

      const userData = await response.json();

      return userData;

   } catch (error) {
      console.error('Cannot get current user:', error);
   }
};

