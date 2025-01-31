import './QuizCard.css';
import { Link } from 'react-router-dom';

const QuizCard = ({ id, title, difficulty, image, description }) => {

   // console.log(id, title, difficulty, image, description);

   return (
      <>
         <div className="quiz">
            <h3>{title}</h3>
            <span>Difficulté: {difficulty}</span>
            <img src={image} alt={title} />
            <Link
               to={`/quiz/${id}`}
               state={{ description }}
               className="quizButton">JOUER</Link>
         </div>
      </>
   );
};

export default QuizCard;