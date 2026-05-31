import { useEffect, useState } from "react";
import api from "../api/api";
import Header from "../components/Header";
import HostNav from "../components/HostNav";
import { useAuth } from "../auth/AuthContext";

const Reservations = () => {
  const { user } = useAuth();
  const isHost = user?.role === "host" || user?.role === "admin";

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchReservations = async () => {
      setLoading(true);
      setError("");

      const hostUser = user.role === "host" || user.role === "admin";

      try {
        const endpoint = hostUser ? "/reservations/host" : "/reservations/user";
        const res = await api.get(endpoint);
        setReservations(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      await api.delete(`/reservations/${id}`);

      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete reservation");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        {isHost && <HostNav />}
        <div className="loading">Loading reservations...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      {isHost && <HostNav />}

      <div className="container">
        <h1 className="title">
          {isHost ? "Reservations" : "My Reservations"}
        </h1>

        {error && <p className="error">{error}</p>}

        {reservations.length === 0 ? (
          <p className="empty">No reservations found.</p>
        ) : (
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  {isHost && <th>Guest</th>}
                  <th>Property</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Guests</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {[...reservations]
                  .sort(
                    (a, b) => new Date(b.startDate) - new Date(a.startDate)
                  )
                  .map((r) => (
                    <tr key={r._id}>
                      {isHost && (
                        <td>{r.user_id?.username || "Guest"}</td>
                      )}

                      <td className="property-cell">
                        <strong>
                          {r.accommodation_id?.title || "Unknown property"}
                        </strong>
                        {r.accommodation_id?.location && (
                          <span>{r.accommodation_id.location}</span>
                        )}
                      </td>

                      <td>
                        {new Date(r.startDate).toLocaleDateString()}
                      </td>

                      <td>
                        {new Date(r.endDate).toLocaleDateString()}
                      </td>

                      <td>{r.guests}</td>

                      <td>${r.totalPrice ?? 0}</td>

                      <td>
                        <button
                          onClick={() => handleDelete(r._id)}
                          disabled={deletingId === r._id}
                          className="deleteBtn"
                        >
                          {deletingId === r._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <style>{`
          .container {
            max-width: 1000px;
            margin: auto;
            padding: 20px var(--page-padding-x);
          }

          .title {
            font-size: 28px;
            margin-bottom: 20px;
          }

          .loading {
            text-align: center;
            padding: 40px;
          }

          .empty {
            padding: 15px;
            background: #f5f5f5;
            border-radius: 6px;
          }

          .error {
            color: red;
            margin-bottom: 10px;
          }

          .tableWrapper {
            overflow-x: auto;
          }

          .table {
            width: 100%;
            border-collapse: collapse;
            min-width: 700px;
          }

          th,
          td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            text-align: left;
          }

          th {
            background: #f9f9f9;
          }

          tr:hover {
            background: #fafafa;
          }

          .property-cell {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }

          .property-cell span {
            color: #717171;
            font-size: 0.9rem;
          }

          .deleteBtn {
            background: #ff385c;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
          }

          .deleteBtn:disabled {
            background: #ccc;
            cursor: not-allowed;
          }

          @media (max-width: 600px) {
            th,
            td {
              padding: 8px;
              font-size: 14px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Reservations;
