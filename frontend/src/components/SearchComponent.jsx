import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../api/api";
import Header from "./Header";
import Footer from "./Footer";

const SearchComponent = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/accommodations");
        const data = Array.isArray(res.data) ? res.data : [];
        setAccommodations(data);
        const uniqueLocations = [
          ...new Set(data.map((acc) => acc.location).filter(Boolean)),
        ];
        setLocations(uniqueLocations);
      } catch (err) {
        console.error("Failed to load locations:", err);
      }
    };
    fetchLocations();
  }, []);

  const handleSearch = () => {
    if (!selectedLocation || selectedLocation === "all") {
      navigate("/view-listings");
      return;
    }

    const matches = accommodations.filter(
      (acc) =>
        acc.location?.toLowerCase() === selectedLocation.toLowerCase() &&
        Number(acc.guests ?? 1) >= (Number(guests) || 1)
    );

    if (matches.length === 1) {
      navigate(`/location/${matches[0]._id}`);
      return;
    }

    if (matches.length > 1) {
      navigate(
        `/view-listings?location=${encodeURIComponent(selectedLocation)}&guests=${guests}`
      );
      return;
    }

    alert(`No listings found in ${selectedLocation} for ${guests} guest(s).`);
  };

  return (
    <>
      <Header />
      <div className="search-container">
        <div className="search-filters">
          <div className="filter-group">
            <div className="filter-label">Location</div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              <option value="">Select Location</option>
              <option value="all">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <div className="filter-label">Check in</div>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <div className="filter-label">Check out</div>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <div className="filter-label">Guests</div>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value) || 1)}
              className="filter-input"
            />
          </div>

          <button type="button" className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
      {createPortal(<Footer />, document.body)}

      <style>{`
        .search-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto 2rem;
          padding: 1rem;
        }

        .search-filters {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 999px;
          padding: 0.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid #ddd;
        }

        .filter-group {
          flex: 1;
          padding: 0 2rem;
          position: relative;
        }

        .filter-group:not(:last-of-type)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 60%;
          width: 1px;
          background-color: #ddd;
        }

        .filter-label {
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #555;
          padding-left: 0.5rem;
        }

        .filter-select,
        .filter-input {
          width: 100%;
          padding: 0.5rem;
          border: none;
          font-size: 0.95rem;
          background-color: transparent;
        }

        .filter-select:focus,
        .filter-input:focus {
          outline: none;
        }

        .search-button {
          background: #ff385c;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: background 0.2s;
          flex-shrink: 0;
        }

        .search-button:hover {
          background: #e61e4d;
        }

        @media (max-width: 768px) {
          .search-filters {
            flex-direction: column;
            border-radius: 12px;
            padding: 1.5rem;
            gap: 1rem;
          }

          .filter-group {
            width: 100%;
            padding: 0;
          }

          .filter-group:not(:last-of-type)::after {
            display: none;
          }

          .search-button {
            width: 100%;
            border-radius: 8px;
            height: auto;
            padding: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default SearchComponent;
