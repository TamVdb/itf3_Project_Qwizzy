import { useState } from 'react';
import { loginUser } from '../../services/Auth.service';
import { useId } from 'react';
import './Login.css';
import { handleSuccess, handleError } from '../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onSwitchToRegister, onSuccessfulConnection }) => {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);

   const inputId = useId();

   const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      try {
         const success = await loginUser(username, password);

         if (success) {
            handleSuccess('Connexion reussie');
            onSuccessfulConnection();
            setTimeout(() => window.location.reload(), 2000);
         } else {
            handleError('Identifiants incorrects');
         }
      } catch (err) {
         handleError('Une erreur est survenue');
      }
   };

   return (
      <div className="form-login">
         <ToastContainer />
         <h2>Connexion</h2>
         <form onSubmit={handleLoginSubmit}>
            <div>
               <label htmlFor='username'>Nom d'utilisateur</label>
               <input id={inputId + 'username'} type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
               <label htmlFor='password'>Mot de passe</label>
               <input id={inputId + 'password'} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type='submit'>Se connecter</button>
         </form>
         <p className="switch"
            onClick={onSwitchToRegister}>Pas encore de compte ? <span>S'enregistrer</span></p>
      </div>
   );
};

export default Login;