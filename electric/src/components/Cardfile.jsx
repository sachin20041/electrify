import { Link } from 'react-router-dom';
import './Cardfile.css';

function Cardfile() {
  return (
    <div className="cardfile-wrapper">
      <h2 className="heading">Welcome what are you looking for....</h2> {/* Left-aligned heading */}
      
      <div className="cardfile-container">
        <div className="card">
          <h3>Bill Optimizer</h3>
          <p>Optimize your electricity bill by understanding your consumption patterns and finding ways to save more.</p>
          <button className="explore-button">
            <Link to='/form'>Explore</Link>
          </button>
        </div>

        <div className="card">
          <h3>Appliance Usage</h3>
          <p>Check the current usage of your household appliances and monitor how much energy each is consuming.</p>
          <button className="explore-button">
            <Link to='/Billoptimizer'>Explore</Link>
          </button>
        </div>

        {/* New Card for Energy-saving Tips */}
        <div className="card">
          <h3>Energy-saving Tips</h3>
          <p>Learn actionable tips to save energy, reduce bills, and minimize your carbon footprint.</p>
          <button className="explore-button">
            <Link to='/guidance'>Explore</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cardfile;
