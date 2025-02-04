const { VITE_URL_WP } = import.meta.env;

export const loginUser = async (username, password) => {
   try {
      const response = await fetch(VITE_URL_WP + 'wp-json/simple-jwt-login/v1/auth', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      console.log(data);

      // Store JWT Token in local storage
      localStorage.setItem('token', data.data.jwt);

      //Store username in local storage
      localStorage.setItem('username', username);


      return true;

   } catch (error) {
      console.error('Error logging in:', error);
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

      if (response.ok) {
         return { success: true, message: 'Login successful' };
      } else {
         return { success: false, message: data.message || 'Login failed' };
      }
   } catch (error) {
      console.error('Login failed :', err);
      throw err;
   }
};

export const logoutUser = async () => {
   try {
      const username = localStorage.getItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      await fetch(VITE_URL_WP + 'wp-json/simple-jwt-login/v1/logout', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            AUTH_KEY: 'THISISMySpeCiaLAUthCodeForTheApi',
            username: username
         })
      });

      await fetch(VITE_URL_WP + 'wp-login.php?action=logout', {
         method: 'GET',
         credentials: 'include'
      });

      console.log("Déconnexion réussie !");

   } catch (error) {
      console.error('Logout failed:', error);
   }
};

