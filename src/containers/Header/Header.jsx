import './Header.css';
import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';

const Header = () => {

   const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
   const [authModalType, setAuthModalType] = useState("login");

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

   return (
      <>
         <AuthModal
            visible={isAuthModalVisible}
            modalType={authModalType}
            onClose={closeAuthModal}
            switchToLogin={switchToLogin}
            switchToSignup={switchToRegister}
         />
         <header>
            <div className="container">
               <div className="logo">
                  <img src="http://wp-quizz.local/wp-content/uploads/2025/01/qwizzy-logo.png" alt="Qwizzy Logo" />Qwizzy</div>
               <ul>
                  <li><a href="#" onClick={handleLoginModal} >Connexion</a></li>
                  <li><a href="#" onClick={handleRegisterModal} >Inscription</a></li>
               </ul>
            </div>
         </header>
      </>
   );
};

export default Header;