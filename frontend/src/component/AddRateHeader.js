import { useNavigate, useParams } from 'react-router-dom';

function AddRateHeader() {
  const navigate = useNavigate();
  const { id, name, userid } = useParams();

  return (
    <header className="rate-header">
      <div className="rate-header-content">
        <button 
          className="header-button"
          onClick={() => navigate(`/search/${name}/${userid}/cafe/${id}/review`)}
        >
          ← Back to review
        </button>
        <h2 className="header-title">RATE IT!</h2>
        <button 
          className="header-button"
          onClick={() => navigate('/')}
        >
          Log Out
        </button>
      </div>
    </header>
  );
}

export default AddRateHeader;