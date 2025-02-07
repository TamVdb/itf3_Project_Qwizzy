import './QuizCard.css';
import { Link } from 'react-router-dom';

const QuizCard = ({ id, title, difficulty, image, description }) => {

   // console.log(id, title, difficulty, image, description);
   return (
      <>
         <div className="quiz">
            <h3>{title}</h3>
            <span>{difficulty}</span>
            <img src={image} alt={title} />
            <p>{description}</p>
            <Link
               to={`/quiz/${id}`}
               className="quizButton">JOUER</Link>
         </div>
      </>
   );
};

export default QuizCard;