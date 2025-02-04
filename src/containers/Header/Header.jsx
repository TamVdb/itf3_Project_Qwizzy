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

   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      if (token && storedUsername) {
         setIsLoggedIn(true);
         setUsername(storedUsername);
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
      setUsername(localStorage.getItem('username'));
      setIsLoggedIn(true);
      setIsAuthModalVisible(false);
   };

   const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
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
                  <img src="http://qwizzy.local/wp-content/uploads/2025/01/qwizzy-logo.png" alt="Qwizzy Logo" />Qwizzy</div>
               <ul>
                  {isLoggedIn ? (
                     <>
                        <li className="welcome">Bienvenue {username}</li>
                        <li className="createQuizLink"><Link to="/create-quiz">Créer un Quiz</Link></li>
                        <li><a href="#" onClick={handleLogout}>Déconnexion</a></li>
                     </>
                  ) : (
                     <>
                        <li><a href="#" onClick={handleLoginModal}>Connexion</a></li>
                        <li><a href="#" onClick={handleRegisterModal}>Inscription</a></li>
                     </>
                  )}
               </ul>
            </div>
         </header>
      </>
   );
};

export default Header;