import './Header.css';
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import { logoutUser } from '../../services/Auth.service';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

   const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
   const [authModalType, setAuthModalType] = useState("login");
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState('');
   const [userId, setUserId] = useState(null);

   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      const storedUserId = localStorage.getItem('userId');

      if (token && storedUsername && storedUserId) {
         setIsLoggedIn(true);
         setUsername(storedUsername);
         setUserId(storedUserId);
      }
   }, []);

   const handleLoginModal = (e) => {
      e.preventDefault();
      setAuthModalType('login');
      setIsAuthModalVisible(true);
   };

   const handleRegisterModal = (e) => {
      e.preventDefault();
      setAuthModalType('register');
      setIsAuthModalVisible(true);
   };

   const closeAuthModal = () => {
      setIsAuthModalVisible(false);
   };

   const switchToLogin = () => {
      setAuthModalType('login');
   };

   const switchToRegister = () => {
      setAuthModalType('register');
   };

   const onSuccessfulConnection = () => {
      setIsLoggedIn(true);
      setIsAuthModalVisible(false);
      setUsername(localStorage.getItem('username'));
      setUserId(localStorage.getItem('userId'));
   };

   const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
      setUserId(null);
      logoutUser();
      navigate('/');
   };

   return (
      <>
         <AuthModal
            visible={isAuthModalVisible}
            modalType={authModalType}
            onClose={closeAuthModal}
            switchToLogin={switchToLogin}
            switchToRegister={switchToRegister}
            onSuccessfulConnection={onSuccessfulConnection}
         />
         <header>
            <div className="container">
               <div className="logo">
                  <Link to="/"><img src="http://qwizzy.local/wp-content/uploads/2025/01/qwizzy-logo.png" alt="Qwizzy Logo" />Qwizzy</Link></div>
               <ul>
                  {isLoggedIn ? (
                     <>
                        <li className="welcome">Bienvenue {username}</li>
                        <li className="createQuizLink"><Link to="/create-quiz">Créer un Quiz</Link></li>
                        <li className="scoreboard"><Link to={`/scoreboard/user/${userId}`}>Mes scores</Link></li>
                        <li><a href="#" onClick={handleLogout}>Déconnexion</a></li>
                     </>
                  ) : (
                     <>
                        <li><a href="#" onClick={handleLoginModal}>Connexion</a></li>
                        <li><a href="#" onClick={handleRegisterModal}>Inscription</a></li>
                        <li className="scoreboard"><Link to="/scoreboard">Scoreboard</Link></li>
                     </>
                  )}
               </ul>
            </div>
         </header>
      </>
   );
};

export default Header;