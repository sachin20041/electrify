import Cardfile from './Cardfile';
import { Link } from 'react-router-dom';
import './HomeContent.css';

function HomeContent() {
  return (
    <>
      <div className='slogan'>
        &nbsp;&nbsp;Let's together conserve the energy!<br/>
        "Empower The Future - Conserve Today!!"
      </div>
      <Cardfile/>
  
    </>
  );
}

export default HomeContent;
