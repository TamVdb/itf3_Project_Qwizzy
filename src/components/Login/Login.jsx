import { useState } from 'react';
import { loginUser } from '../../services/Auth.service';
import './Login.css';

const Login = ({ onSwitchToRegister, onSuccessfulConnection }) => {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);

   const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      try {
         const success = await loginUser(username, password);

         if (success) {
            console.log('Connexion reussie');
            onSuccessfulConnection();
         } else {
            setError('Identifiants incorrects');
         }
      } catch (err) {
         setError('Une erreur est survenue');
      }
   };

   return (
      <div className="form-login">
         <h2>Connexion</h2>
         <p>{error}</p>
         <form onSubmit={handleLoginSubmit}>
            <div>
               <label htmlFor='username'>Nom d'utilisateur</label>
               <input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
               <label htmlFor='password'>Mot de passe</label>
               <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type='submit'>Se connecter</button>
         </form>
         <p className="switch"
            onClick={onSwitchToRegister}>Pas encore de compte ? <span>S'enregistrer</span></p>
      </div>
   );
};

export default Login;