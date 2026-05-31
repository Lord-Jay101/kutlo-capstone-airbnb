import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Header from "../components/Header";
import HostNav from "../components/HostNav";

const PROPERTY_TYPES = [
  "Apartment",
  "Condo",
  "Cottage",
  "Villa",
  "Loft",
  "Guesthouse",
  "Home",
];

const CreateListing = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: "",
    description: "",
    enhancedCleaning: false,
    selfCheckIn: false,
    bedroomImage: "",
  });

  const [locations, setLocations] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/accommodations");
        const uniqueLocations = [
          ...new Set(res.data.map((acc) => acc.location).filter(Boolean)),
        ];
        setLocations(uniqueLocations);
      } catch (err) {
        console.error("Failed to load locations:", err);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAmenity = () => {
    const value = amenityInput.trim().toLowerCase();
    if (!value || amenities.includes(value)) return;
    setAmenities((prev) => [...prev, value]);
    setAmenityInput("");
  };

  const handleAmenityKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAmenity();
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title: form.title,
        location: form.location,
        type: form.type,
        description: form.description,
        guests: Number(form.guests),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        price: Number(form.price),
        amenities,
        images,
        bedroomImage: form.bedroomImage || images[0] || "",
        enhancedCleaning: form.enhancedCleaning,
        selfCheckIn: form.selfCheckIn,
        weeklyDiscount: 0,
        cleaningFee: 0,
        serviceFee: 0,
        occupancyTaxes: 0,
      };

      await api.post("/accommodations", payload);

      setMessage("Listing created successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to create listing"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <HostNav />

      <div className="create-page">
        <h1 className="create-title">Create Listing</h1>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-columns">
            <div className="create-left">
              <label className="field-label">
                Listing Title
                <input
                  name="title"
                  placeholder="Charming Home in Paris"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="field-label">
                Location
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-label">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="enhancedCleaning"
                    checked={form.enhancedCleaning}
                    onChange={handleChange}
                  />
                  Enhanced Cleaning
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="selfCheckIn"
                    checked={form.selfCheckIn}
                    onChange={handleChange}
                  />
                  Self Check-In
                </label>
              </div>

              <div className="amenities-section">
                <span className="field-label">Amenities</span>
                <div className="amenity-input-row">
                  <input
                    type="text"
                    placeholder="Add amenity"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    onKeyDown={handleAmenityKeyDown}
                  />
                  <button
                    type="button"
                    className="add-btn"
                    onClick={handleAddAmenity}
                  >
                    Add
                  </button>
                </div>

                {amenities.length > 0 && (
                  <ul className="amenity-list">
                    {amenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="create-right">
              <div className="field-row">
                <label className="field-label">
                  Price
                  <input
                    name="price"
                    type="number"
                    min="0"
                    placeholder="400"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="field-label">
                  Type
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="field-row field-row--three">
                <label className="field-label">
                  Guests
                  <input
                    name="guests"
                    type="number"
                    min="1"
                    value={form.guests}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="field-label">
                  Bedrooms
                  <input
                    name="bedrooms"
                    type="number"
                    min="1"
                    value={form.bedrooms}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="field-label">
                  Bathrooms
                  <input
                    name="bathrooms"
                    type="number"
                    min="1"
                    value={form.bathrooms}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="upload-section">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Images
                </button>

                <div className="upload-preview">
                  {images.length === 0 ? (
                    <p>No images uploaded</p>
                  ) : (
                    <div className="image-grid">
                      {images.map((img, index) => (
                        <img key={index} src={img} alt={`Upload ${index + 1}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {message && <p className="form-message">{message}</p>}

          <div className="form-actions">
            <button type="submit" className="update-btn" disabled={loading}>
              {loading ? "Creating..." : "Update"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .create-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1rem var(--page-padding-x) 3rem;
          background: #fff;
        }

        .create-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #222;
        }

        .create-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .create-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .create-left,
        .create-right {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .field-label {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #222;
        }

        .field-label input,
        .field-label select,
        .field-label textarea,
        .amenity-input-row input {
          width: 100%;
          padding: 0.65rem 0.75rem;
          border: 1px solid #222;
          border-radius: 4px;
          font-size: 0.95rem;
          font-weight: 400;
          background: #fff;
        }

        .field-label textarea {
          min-height: 140px;
          resize: vertical;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .field-row--three {
          grid-template-columns: repeat(3, 1fr);
        }

        .checkbox-row {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #222;
          cursor: pointer;
        }

        .checkbox-label input {
          width: 16px;
          height: 16px;
          accent-color: #222;
        }

        .amenities-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .amenity-input-row {
          display: flex;
          gap: 0.75rem;
        }

        .amenity-input-row input {
          flex: 1;
        }

        .add-btn,
        .upload-btn {
          border: none;
          background: #2563eb;
          color: #fff;
          padding: 0.65rem 1.25rem;
          border-radius: 4px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .add-btn:hover,
        .upload-btn:hover {
          background: #1d4ed8;
        }

        .amenity-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .amenity-list li {
          padding: 0.55rem 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fafafa;
          font-size: 0.92rem;
          color: #333;
        }

        .upload-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .upload-preview {
          min-height: 220px;
          border: 1px solid #222;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: #fff;
        }

        .upload-preview p {
          color: #666;
          font-size: 0.95rem;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 0.75rem;
          width: 100%;
        }

        .image-grid img {
          width: 100%;
          height: 90px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #ddd;
        }

        .form-message {
          text-align: center;
          color: #059669;
          font-weight: 500;
        }

        .form-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .update-btn,
        .cancel-btn {
          padding: 0.85rem 1rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }

        .update-btn {
          background: #2563eb;
          color: #fff;
        }

        .update-btn:hover:not(:disabled) {
          background: #1d4ed8;
        }

        .update-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-btn {
          background: #dc2626;
          color: #fff;
        }

        .cancel-btn:hover {
          background: #b91c1c;
        }

        @media (max-width: 900px) {
          .create-columns {
            grid-template-columns: 1fr;
          }

          .field-row--three {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default CreateListing;
