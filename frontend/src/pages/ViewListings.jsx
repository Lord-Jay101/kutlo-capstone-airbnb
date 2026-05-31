import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FILTER_TAGS = ["Free cancellation", "Type of place", "Price", "Instant Book", "More filters"];

const ViewListings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || ""
  );
  const [searchText, setSearchText] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/accommodations");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.accommodations || [];
        setListings(data);
        setLocations([...new Set(data.map((item) => item.location).filter(Boolean))]);
      } catch (err) {
        console.error(err);
        setError("Failed to load listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const byLocation =
        !selectedLocation || selectedLocation === "all" || listing.location === selectedLocation;
      const bySearch =
        !searchText ||
        listing.location?.toLowerCase().includes(searchText.toLowerCase()) ||
        listing.title?.toLowerCase().includes(searchText.toLowerCase());
      const maxGuests = Number(listing.guests ?? 1);
      const requestedGuests = Number(guests) || 1;
      const byGuests = maxGuests >= requestedGuests;
      return byLocation && bySearch && byGuests;
    });
  }, [listings, selectedLocation, searchText, guests]);

  return (
    <>
      <Header />

      <main className="browse-page">
        <section className="top-filter-wrap">
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
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
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

            <button type="button" className="search-button" aria-label="search">
              <FaSearch />
            </button>
          </div>
        </section>

        <section className="listings-container">
          <h2 className="page-title">Browse Listings</h2>

          <input
            className="location-search"
            type="text"
            placeholder="Search by location..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="tags-row">
            {FILTER_TAGS.map((tag) => (
              <button key={tag} type="button" className="filter-chip">
                {tag}
              </button>
            ))}
          </div>

          {loading && <p className="status-text">Loading listings...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <p className="results-count">{filteredListings.length} accommodations found</p>
          )}

          {!loading && !error && filteredListings.length === 0 ? (
            <div className="empty-state">No listings found.</div>
          ) : (
            <div className="listings-list">
              {filteredListings.map((listing) => (
                <article
                  key={listing._id}
                  className="listing-row"
                  onClick={() => navigate(`/location/${listing._id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/location/${listing._id}`);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={listing.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={listing.title}
                    className="listing-image"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />

                  <div className="listing-info">
                    <p className="listing-type">Entire {listing.type || "accommodation"} in {listing.location}</p>
                    <h3 className="listing-title">{listing.title}</h3>
                    <p className="listing-meta">
                      {listing.guests || 1} guests · {listing.bedrooms || 1} beds · {listing.bathrooms || 1} bath
                    </p>
                    <p className="listing-amenities">
                      {(listing.amenities || []).slice(0, 3).join(" · ") || "Wifi · kitchen · heating"}
                    </p>
                    <p className="listing-rating">
                      {Number(listing.rating ?? 0).toFixed(1)} ★{" "}
                      <span>({listing.reviews ?? 0} reviews)</span>
                    </p>
                  </div>

                  <p className="listing-price">
                    ${listing.price}
                    <span>/night</span>
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style>{`
        .browse-page {
          min-height: 100vh;
          background: #fff;
        }

        .top-filter-wrap {
          width: 100%;
          padding: 1rem 0 0.5rem;
          border-bottom: 1px solid #efefef;
        }

        .search-filters {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          background: white;
          border-radius: 999px;
          padding: 0.45rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          border: 1px solid #e7e7e7;
        }

        .filter-group {
          flex: 1;
          padding: 0 1.4rem;
          position: relative;
        }

        .filter-group:not(:last-of-type)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 55%;
          width: 1px;
          background-color: #e3e3e3;
        }

        .filter-label {
          font-size: 0.76rem;
          font-weight: 600;
          margin-bottom: 0.1rem;
          color: #666;
        }

        .filter-select,
        .filter-input {
          width: 100%;
          border: none;
          font-size: 0.92rem;
          background: transparent;
          color: #222;
        }

        .filter-select:focus,
        .filter-input:focus {
          outline: none;
        }

        .search-button {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: none;
          background: #ff385c;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-right: 0.2rem;
        }

        .listings-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 1.5rem 1rem 2rem;
        }

        .page-title {
          font-size: 2rem;
          margin-bottom: 0.8rem;
        }

        .location-search {
          width: 340px;
          border: 1px solid #e2e2e2;
          border-radius: 8px;
          padding: 0.7rem 0.8rem;
          margin-bottom: 0.8rem;
          font-size: 0.95rem;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.9rem;
        }

        .filter-chip {
          border: 1px solid #ddd;
          border-radius: 999px;
          background: #f6f6f6;
          color: #333;
          font-size: 0.8rem;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
        }

        .results-count,
        .status-text {
          color: #555;
          margin-bottom: 0.8rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .error {
          color: #c62828;
          margin-bottom: 0.8rem;
        }

        .empty-state {
          border: 1px dashed #ddd;
          padding: 1.1rem;
          border-radius: 10px;
          color: #666;
        }

        .listing-row {
          display: grid;
          grid-template-columns: 250px 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #ededed;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .listing-row:hover {
          background: #fafafa;
        }

        .listing-image {
          width: 100%;
          height: 145px;
          border-radius: 10px;
          object-fit: cover;
        }

        .listing-type {
          color: #6e6e6e;
          font-size: 0.9rem;
          margin-bottom: 0.35rem;
        }

        .listing-title {
          font-size: 2rem;
          line-height: 1.15;
          margin-bottom: 0.4rem;
        }

        .listing-meta,
        .listing-amenities {
          color: #595959;
          font-size: 0.9rem;
          margin-bottom: 0.2rem;
        }

        .listing-rating {
          color: #222;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .listing-rating span {
          color: #6b6b6b;
          font-weight: 500;
        }

        .listing-price {
          font-size: 1.8rem;
          font-weight: 700;
          color: #111;
          white-space: nowrap;
        }

        .listing-price span {
          font-size: 0.95rem;
          font-weight: 500;
          margin-left: 0.2rem;
          color: #4d4d4d;
        }

        @media (max-width: 992px) {
          .listing-row {
            grid-template-columns: 1fr;
          }

          .listing-price {
            justify-self: start;
          }

          .location-search {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .search-filters {
            flex-direction: column;
            border-radius: 12px;
            gap: 0.9rem;
            padding: 1rem;
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
          }

          .page-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default ViewListings;