import { useState } from 'react';
import { registerUser } from '../../services/Auth.service';
import { useId } from 'react';
import { handleSuccess, handleError } from '../../utilsToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './Register.css';

const Register = ({ onSwitchToLogin }) => {

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const inputId = useId();

   const handleRegisterSubmit = async (e) => {
      e.preventDefault();

      try {
         const success = await registerUser(username, email, password);

         if (success) {
            handleSuccess('Inscription réussie');
            setTimeout(() => onSwitchToLogin(), 2000);
         }

      } catch (error) {
         handleError('Erreur lors de l\'inscription');
      }
   };

   return (
      <>
         <ToastContainer className="toast-container" />
         <div className="form-register">
            <h2>Inscription</h2>
            <form onSubmit={handleRegisterSubmit}>
               <div>
                  <label htmlFor='username'>Nom d'utilisateur</label>
                  <input id={inputId + 'username'} type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
               </div>
               <div>
                  <label htmlFor='email'>Email</label>
                  <input id={inputId + 'email'} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
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

               <button type='submit'>S'inscrire</button>
            </form>
            <p className="switch"
               onClick={onSwitchToLogin}>Déjà inscrit ? <span>Se connecter</span></p>
         </div>
      </>
   );
};

export default Register;