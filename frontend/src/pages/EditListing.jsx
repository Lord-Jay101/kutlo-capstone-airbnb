import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditListing = () => {
  const { id } = useParams();
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
    weeklyDiscount: 0,
    cleaningFee: 0,
    serviceFee: 0,
    occupancyTaxes: 0,
  });

  const [locations, setLocations] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingRes, accommodationsRes] = await Promise.all([
          api.get(`/accommodations/${id}`),
          api.get("/accommodations"),
        ]);

        const listing = listingRes.data;
        const uniqueLocations = [
          ...new Set(
            accommodationsRes.data.map((acc) => acc.location).filter(Boolean)
          ),
        ];

        if (listing.location && !uniqueLocations.includes(listing.location)) {
          uniqueLocations.push(listing.location);
        }

        setLocations(uniqueLocations);
        setAmenities(listing.amenities || []);
        setImages(listing.images || []);

        setForm({
          title: listing.title || "",
          location: listing.location || "",
          type: listing.type || "",
          guests: listing.guests || 1,
          bedrooms: listing.bedrooms || 1,
          bathrooms: listing.bathrooms || 1,
          price: listing.price ?? "",
          description: listing.description || "",
          enhancedCleaning: listing.enhancedCleaning || false,
          selfCheckIn: listing.selfCheckIn || false,
          bedroomImage: listing.bedroomImage || "",
          weeklyDiscount: listing.weeklyDiscount || 0,
          cleaningFee: listing.cleaningFee || 0,
          serviceFee: listing.serviceFee || 0,
          occupancyTaxes: listing.occupancyTaxes || 0,
        });
      } catch (err) {
        console.error(err);
        setMessage("Failed to load listing");
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

    const maxSize = 5 * 1024 * 1024;

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setMessage("Please upload image files only.");
        setIsError(true);
        return;
      }

      if (file.size > maxSize) {
        setMessage("Each image must be 5MB or smaller.");
        setIsError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
        setMessage("");
        setIsError(false);
      };
      reader.onerror = () => {
        setMessage("Failed to read image file.");
        setIsError(true);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleAddImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setImageUrl("");
    setMessage("");
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setIsError(false);

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
        weeklyDiscount: Number(form.weeklyDiscount) || 0,
        cleaningFee: Number(form.cleaningFee) || 0,
        serviceFee: Number(form.serviceFee) || 0,
        occupancyTaxes: Number(form.occupancyTaxes) || 0,
      };

      await api.put(`/accommodations/${id}`, payload);

      setMessage("Listing updated successfully!");
      setIsError(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      let errorMessage =
        err.response?.data?.message || "Failed to update listing";

      if (status === 401) {
        errorMessage = "Please log in as a host to update this listing.";
      } else if (status === 403) {
        errorMessage = "You are not authorized to update this listing.";
      } else if (status === 413) {
        errorMessage =
          "Images are too large. Use smaller photos or paste image URLs instead.";
      }

      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <HostNav />
        <div className="edit-page">
          <p className="loading-text">Loading listing...</p>
        </div>
        <style>{`
          .edit-page {
            max-width: 1100px;
            margin: 0 auto;
            padding: 5px var(--page-padding-x) 2rem;
          }

          .loading-text {
            text-align: center;
            padding: 3rem 0;
            color: #666;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Header />
      <HostNav />

      <div className="edit-page">
        <h1 className="edit-title">Edit Listing</h1>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="edit-columns">
            <div className="edit-left">
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

              <div className="fees-section">
                <span className="field-label">Fees &amp; discounts</span>
                <div className="field-row">
                  <label className="field-label">
                    Weekly Discount ($)
                    <input
                      name="weeklyDiscount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={form.weeklyDiscount}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="field-label">
                    Cleaning Fee ($)
                    <input
                      name="cleaningFee"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={form.cleaningFee}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="field-row">
                  <label className="field-label">
                    Service Fee ($)
                    <input
                      name="serviceFee"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={form.serviceFee}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="field-label">
                    Occupancy Taxes &amp; Fees ($)
                    <input
                      name="occupancyTaxes"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={form.occupancyTaxes}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="edit-right">
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

                <div className="image-url-row">
                  <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImageUrl();
                      }
                    }}
                  />
                  <button type="button" className="add-btn" onClick={handleAddImageUrl}>
                    Add URL
                  </button>
                </div>

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

          {message && (
            <p className={`form-message ${isError ? "form-message--error" : ""}`}>
              {message}
            </p>
          )}

          <div className="form-actions">
            <button type="submit" className="update-btn" disabled={saving}>
              {saving ? "Updating..." : "Update"}
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
        .edit-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5px var(--page-padding-x) 2rem;
          background: #fff;
        }

        .edit-title {
          font-size: 28px;
          margin: 0 0 20px;
          text-align: left;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .edit-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .edit-left,
        .edit-right {
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

        .fees-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .fees-section > .field-label:first-child {
          margin-bottom: 0;
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

        .image-url-row {
          display: flex;
          gap: 0.75rem;
        }

        .image-url-row input {
          flex: 1;
          padding: 0.65rem 0.75rem;
          border: 1px solid #222;
          border-radius: 4px;
          font-size: 0.95rem;
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

        .form-message--error {
          color: #dc2626;
        }

        .form-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 0.5rem;
          padding-bottom: 3rem;
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
          .edit-columns {
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

export default EditListing;
