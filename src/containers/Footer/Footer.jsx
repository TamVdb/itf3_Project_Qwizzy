import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {

   return (
      <>
         <footer>
            <div className="container">
               <p>© 2025 - Qwizzy | All rights reserved •
                  Made with <FaHeart className="icon-heart" /> by <a href="https://www.tamaravdb.be" className="" target="_blank" rel="noreferrer">Tamara Vandebroeck</a></p>
            </div>
         </footer>
      </>
   );
};

export default Footer;