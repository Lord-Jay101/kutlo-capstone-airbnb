import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Header from '../components/Header';
import HostNav from '../components/HostNav';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/accommodations/host');
      setListings(res.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this listing?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/accommodations/${id}`);

      // update UI instantly (no refetch needed)
      setListings((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error('Failed to delete listing:', err);
    }
  };

  return (
    <>
      <Header />
      <HostNav />
      <div className="dashboard-container">
      <h1 className="title">My Listings</h1>

      {/* Action Buttons */}
      <div className="actions">
        <button
          className="btn"
          onClick={() => navigate('/reservations')}
        >
          View Reservations
        </button>

        <button
          className="btn primary"
          onClick={() =>
            navigate('/listings/create')
          }
        >
          Create Listing
        </button>

        <button
          className="btn"
          onClick={() =>
            navigate('/listings')
          }
        >
          View All Listings
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="info">Loading listings...</p>
      )}

      {/* Empty State */}
      {!loading && listings.length === 0 && (
        <p className="info">
          No listings found. Create your first listing.
        </p>
      )}

      {/* Listings */}
      <div className="listings">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="card"
          >
            {/* Image */}
            <img
              src={
                listing.images?.[0] ||
                '/placeholder.jpg'
              }
              alt={listing.title}
              className="image"
            />

            {/* Info */}
            <div className="content">
              <p className="type">
                {listing.type} •{' '}
                {listing.location}
              </p>

              <h2 className="title-text">
                {listing.title}
              </h2>

              <p className="details">
                {listing.guests} guests •{' '}
                {listing.bedrooms} beds •{' '}
                {listing.bathrooms} baths
              </p>

              <p className="amenities">
                {listing.amenities?.slice(0, 3).join(
                  ' • '
                )}
              </p>

              {/* Meta */}
              <div className="meta">
                <span>
                  ⭐{' '}
                  {Number(
                    listing.rating || 0
                  ).toFixed(1)}{' '}
                  ({listing.reviews || 0})
                </span>

                <span className="price">
                  ${listing.price}/night
                </span>
              </div>

              {/* Actions */}
              <div className="buttons">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/listings/edit/${listing._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() =>
                    handleDelete(listing._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .dashboard-container {
          padding: 1rem var(--page-padding-x) 20px;
          max-width: 1100px;
          margin: auto;
        }

        .title {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 10px 14px;
          border: 1px solid #ddd;
          background: #f8f8f8;
          cursor: pointer;
          border-radius: 6px;
        }

        .btn:hover {
          background: #eee;
        }

        .primary {
          background: #ff385c;
          color: white;
          border: none;
        }

        .primary:hover {
          background: #e03150;
        }

        .info {
          color: #666;
          margin-top: 20px;
        }

        .listings {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card {
          display: flex;
          gap: 15px;
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
        }

        .image {
          width: 220px;
          height: 160px;
          object-fit: cover;
          border-radius: 10px;
        }

        .content {
          flex: 1;
        }

        .type {
          font-size: 13px;
          color: #777;
        }

        .title-text {
          font-size: 18px;
          margin: 5px 0;
        }

        .details,
        .amenities {
          font-size: 14px;
          color: #555;
          margin: 5px 0;
        }

        .meta {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 14px;
        }

        .price {
          font-weight: bold;
        }

        .buttons {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }

        .edit {
          padding: 8px 12px;
          border: none;
          background: #3b82f6;
          color: white;
          border-radius: 6px;
          cursor: pointer;
        }

        .delete {
          padding: 8px 12px;
          border: none;
          background: #ef4444;
          color: white;
          border-radius: 6px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .card {
            flex-direction: column;
          }

          .image {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>
      </div>
    </>
  );
};

export default Dashboard;