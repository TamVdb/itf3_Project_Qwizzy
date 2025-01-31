import './AuthModal.css';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

const AuthModal = ({
   visible,
   modalType,
   onClose,
   switchToLogin,
   switchToRegister
}) => {
   if (!visible) return null;

   return (
      <div className="modal-container">
         <div className="modal">
            <button className="close" onClick={onClose}>X</button>

            {modalType === 'login' ? (
               <Login
                  onSwitchToRegister={switchToRegister}
                  onSuccessfulConnection={onClose}
               />
            ) : (
               <Register
                  onSwitchToLogin={switchToLogin}
                  onSuccessfulConnection={onClose}
               />
            )}
         </div>
      </div>
   );
};

export default AuthModal;