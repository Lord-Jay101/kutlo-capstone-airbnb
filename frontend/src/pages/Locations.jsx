import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import {
  FaStar,
  FaSearch,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaSnowflake,
} from 'react-icons/fa';

const Locations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/accommodations');

        setAccommodations(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to load accommodations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;

    setLocation(value);

    if (!value.trim()) {
      setFiltered(accommodations);
      return;
    }

    const results = accommodations.filter((acc) =>
      acc.location.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(results);
  };

  const handleClick = (id) => {
    navigate(`/location/${id}`);
  };

  const amenityIcons = {
    WiFi: <FaWifi />,
    Parking: <FaParking />,
    Pool: <FaSwimmingPool />,
    'Air conditioning': <FaSnowflake />,
  };

  return (
    <div className="locations-page">
      {/* HERO */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Find your next stay</h1>
          <p>Discover unique homes, apartments and experiences</p>

          <div className="search-bar">
            <FaSearch className="search-icon" />

            <input
              type="text"
              value={location}
              onChange={handleFilter}
              placeholder="Search by city or location..."
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters-container">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Apartments</button>
        <button className="filter-btn">Cabins</button>
        <button className="filter-btn">Beach</button>
        <button className="filter-btn">Luxury</button>
        <button className="filter-btn">Trending</button>
      </div>

      {/* RESULTS */}
      <div className="results-header">
        <h2>
          {filtered.length} stay{filtered.length !== 1 && 's'} available
        </h2>

        {location && <p>Showing results for "{location}"</p>}
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton-card"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h2>No listings found</h2>
          <p>Try searching another location.</p>
        </div>
      ) : (
        <div className="listings-grid">
          {filtered.map((acc) => (
            <div
              key={acc._id}
              className="listing-card"
              onClick={() => handleClick(acc._id)}
            >
              <div className="image-wrapper">
                <img
                  src={acc.images?.[0] || '/placeholder.jpg'}
                  alt={acc.title}
                />

                <div className="price-badge">${acc.price}/night</div>
              </div>

              <div className="listing-content">
                <div className="listing-top">
                  <div>
                    <h3>{acc.title}</h3>

                    <p className="location-text">
                      <FaMapMarkerAlt /> {acc.location}
                    </p>
                  </div>

                  <div className="rating-box">
                    <FaStar />
                    <span>{acc.rating || 4.8}</span>
                  </div>
                </div>

                <p className="listing-type">
                  {acc.type} · {acc.guests} guests · {acc.bedrooms} bedrooms
                </p>

                <div className="amenities-row">
                  {acc.amenities?.slice(0, 3).map((item, index) => (
                    <span key={index} className="amenity-pill">
                      {amenityIcons[item] || <FaWifi />}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .locations-page {
          min-height: 100vh;
          background: #f7f7f7;
          padding-bottom: 4rem;
        }

        /* HERO */
        .hero-section {
          height: 320px;
          background-image: url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85');
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .hero-overlay {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 1rem;
        }

        .hero-overlay h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .hero-overlay p {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        /* SEARCH */
        .search-bar {
          background: white;
          width: 100%;
          max-width: 600px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          padding: 0.9rem 1.3rem;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
        }

        .search-icon {
          color: #ff385c;
          margin-right: 10px;
          font-size: 1rem;
        }

        .search-bar input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 1rem;
        }

        /* FILTERS */
        .filters-container {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0 2rem 1rem;
          margin-bottom: 1rem;
        }

        .filter-btn {
          border: none;
          background: white;
          padding: 0.75rem 1.2rem;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 500;
          transition: 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: #ff385c;
          color: white;
        }

        /* RESULTS */
        .results-header {
          padding: 0 2rem;
          margin-bottom: 2rem;
        }

        .results-header h2 {
          font-size: 1.8rem;
          margin-bottom: 0.25rem;
        }

        .results-header p {
          color: #666;
        }

        /* GRID */
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          padding: 0 2rem;
        }

        /* CARD */
        .listing-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 18px rgba(0,0,0,0.08);
        }

        .listing-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .image-wrapper {
          position: relative;
          height: 240px;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .price-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: white;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .listing-content {
          padding: 1.2rem;
        }

        .listing-top {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .listing-top h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .location-text {
          color: #666;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 0.4rem;
          font-size: 0.95rem;
        }

        .rating-box {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #ff385c;
          font-weight: 600;
        }

        .listing-type {
          margin: 1rem 0;
          color: #555;
          line-height: 1.5;
        }

        .amenities-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .amenity-pill {
          background: #f1f1f1;
          padding: 0.45rem 0.75rem;
          border-radius: 999px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* LOADING */
        .loading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 0 2rem;
        }

        .skeleton-card {
          height: 350px;
          border-radius: 24px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #f7f7f7 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* EMPTY */
        .empty-state {
          text-align: center;
          padding: 5rem 1rem;
        }

        .empty-state h2 {
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #666;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .hero-overlay h1 {
            font-size: 2rem;
          }

          .hero-overlay p {
            font-size: 1rem;
          }

          .listings-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
          }

          .filters-container,
          .results-header {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Locations;
