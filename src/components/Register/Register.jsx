import { useState } from 'react';
import { registerUser } from '../../services/Auth.service';
import './Register.css';

const Register = ({ onSwitchToLogin }) => {

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);

   const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      try {
         const success = await registerUser(username, email, password);

         if (success) {
            console.log('Inscription reussie');
            onSwitchToLogin();
         }
      } catch (err) {
         setError('Une erreur est survenue');
      }
   };

   return (
      <div className="form-register">
         <h2>Inscription</h2>
         <p>{error}</p>
         <form onSubmit={handleRegisterSubmit}>
            <div>
               <label htmlFor='username'>Nom d'utilisateur</label>
               <input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
               <label htmlFor='email'>Email</label>
               <input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
               <label htmlFor='password'>Mot de passe</label>
               <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type='submit'>S'inscrire</button>
         </form>
         <p className="switch"
            onClick={onSwitchToLogin}>Déjà inscrit ? <span>Se connecter</span></p>
      </div>
   );
};

export default Register;