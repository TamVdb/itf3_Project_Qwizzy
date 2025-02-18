import { useState } from 'react';
import { loginUser } from '../../services/Auth.service';
import { useId } from 'react';
import { handleError } from '../../utilsToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from '../../services/Auth.service';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './Login.css';

const Login = ({ onSwitchToRegister, onSuccessfulConnection }) => {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const inputId = useId();

   const handleLoginSubmit = async (e) => {
      e.preventDefault();

      try {
         const success = await loginUser(username, password);

         if (success) {
            const token = localStorage.getItem('token'); // Récupérer le token stocké par ton service

            if (token) {
               const user = await getCurrentUser(token);
               localStorage.setItem('userId', user.id);
            } else {
               console.error("❌ Aucun token trouvé dans localStorage !");
            }
            onSuccessfulConnection();
            window.location.href = '/';
         } else {
            handleError('Identifiants incorrects');
         }
      } catch (err) {
         handleError('Une erreur est survenue');
      }
   };

   return (
      <>
         <ToastContainer className="toast-container" />
         <div className="form-login">
            <h2>Connexion</h2>
            <form onSubmit={handleLoginSubmit}>
               <div>
                  <label htmlFor='username'>Nom d'utilisateur</label>
                  <input id={inputId + 'username'} type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
               </div>
               <div>
                  <label htmlFor='password'>Mot de passe</label>
                  <div className="password-icon">
                     <input id={inputId + 'password'} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                     {showPassword ? (
                        <FaEye
                           className="eye-icon"
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     ) : (
                        <FaEyeSlash
                           className="eye-icon"
                           onClick={() => setShowPassword(!showPassword)}
                        />
                     )}
                  </div>
               </div>

               <button type='submit'>Se connecter</button>
            </form>
            <p className="switch"
               onClick={onSwitchToRegister}>Pas encore de compte ? <span>S'enregistrer</span></p>
         </div>
      </>
   );
};

export default Login;