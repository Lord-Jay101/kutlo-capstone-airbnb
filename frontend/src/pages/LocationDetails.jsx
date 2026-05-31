import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaStar,
  FaUserFriends,
  FaBed,
  FaBath,
  FaCheck,
  FaHome,
  FaUser,
  FaKey,
  FaCalendarAlt,
  FaUndo,
  FaShieldAlt,
  FaSprayCan,
  FaUserShield,
  FaMedal,
  FaBan,
  FaSmokingBan,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";

const sampleReviews = [
  { name: "Pedro", date: "June 2025", content: "I had no issues at all during my stay. The apartment was comfortable, well organised, and easy to live in, even after a few days."},
  { name: "Gigi", date: "October 2025", content: "I highly recommend this place and would absolutely stay here again." },
  { name: "Palesa", date: "March 2026", content: "The listing was accurate, and the place met all expectations. Everything worked as described, and communication was efficient without being intrusive." },
];

const ratingLabels = {
  cleanliness: "Cleanliness",
  communication: "Communication",
  checkIn: "Check-in",
  accuracy: "Accuracy",
  location: "Location",
  value: "Value",
};

const formatDate = (date) =>
  date?.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }) || "";

const PhotoGallery = ({ images, title }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const count = images.length;
  const extraCount = count > 5 ? count - 5 : 0;

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current - 1 + count) % count);
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % count);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, count]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = (event) => {
    event.stopPropagation();
    setLightboxIndex((current) => (current - 1 + count) % count);
  };

  const showNext = (event) => {
    event.stopPropagation();
    setLightboxIndex((current) => (current + 1) % count);
  };

  const GalleryItem = ({ src, alt, index, className = "", overlay = null }) => (
    <button
      type="button"
      className={`ld-gallery-item ${className}`.trim()}
      onClick={() => openLightbox(index)}
      aria-label={`View photo ${index + 1} of ${count}`}
    >
      <img src={src} alt={alt} />
      <span className="ld-gallery-hover" aria-hidden="true" />
      {overlay}
    </button>
  );

  const lightbox =
    lightboxIndex !== null ? (
      <div
        className="ld-lightbox"
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        <button
          type="button"
          className="ld-lightbox-close"
          onClick={closeLightbox}
          aria-label="Close photo viewer"
        >
          <FaTimes />
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              className="ld-lightbox-nav ld-lightbox-nav--prev"
              onClick={showPrev}
              aria-label="Previous photo"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              className="ld-lightbox-nav ld-lightbox-nav--next"
              onClick={showNext}
              aria-label="Next photo"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        <img
          className="ld-lightbox-image"
          src={images[lightboxIndex]}
          alt={`${title} ${lightboxIndex + 1}`}
          onClick={(event) => event.stopPropagation()}
        />

        <span className="ld-lightbox-count">
          {lightboxIndex + 1} / {count}
        </span>
      </div>
    ) : null;

  if (count === 1) {
    return (
      <>
        <section className="ld-gallery ld-gallery--1">
          <GalleryItem src={images[0]} alt={title} index={0} />
        </section>
        {lightbox}
      </>
    );
  }

  if (count === 2) {
    return (
      <>
        <section className="ld-gallery ld-gallery--2">
          {images.map((img, index) => (
            <GalleryItem
              key={index}
              src={img}
              alt={`${title} ${index + 1}`}
              index={index}
            />
          ))}
        </section>
        {lightbox}
      </>
    );
  }

  if (count === 3) {
    return (
      <>
        <section className="ld-gallery ld-gallery--3">
          <GalleryItem
            src={images[0]}
            alt={title}
            index={0}
            className="ld-gallery-hero"
          />
          <div className="ld-gallery-stack">
            <GalleryItem src={images[1]} alt={`${title} 2`} index={1} />
            <GalleryItem src={images[2]} alt={`${title} 3`} index={2} />
          </div>
        </section>
        {lightbox}
      </>
    );
  }

  if (count === 4) {
    return (
      <>
        <section className="ld-gallery ld-gallery--4">
          <GalleryItem
            src={images[0]}
            alt={title}
            index={0}
            className="ld-gallery-hero"
          />
          <GalleryItem src={images[1]} alt={`${title} 2`} index={1} />
          <GalleryItem src={images[2]} alt={`${title} 3`} index={2} />
          <GalleryItem src={images[3]} alt={`${title} 4`} index={3} />
        </section>
        {lightbox}
      </>
    );
  }

  const visible = images.slice(0, 5);

  return (
    <>
      <section className="ld-gallery ld-gallery--5plus">
        <GalleryItem
          src={visible[0]}
          alt={title}
          index={0}
          className="ld-gallery-hero"
        />
        <div className="ld-gallery-grid">
          {visible.slice(1).map((img, index) => (
            <GalleryItem
              key={index}
              src={img}
              alt={`${title} ${index + 2}`}
              index={index + 1}
              overlay={
                index === 3 && extraCount > 0 ? (
                  <span className="ld-gallery-more">+{extraCount} photos</span>
                ) : null
              }
            />
          ))}
        </div>
      </section>
      {lightbox}
    </>
  );
};

const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/accommodations/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  const nights =
    startDate && endDate
      ? Math.max(0, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)))
      : 0;

  const basePrice = (listing?.price || 0) * nights;
  const weeklyDiscountAmount =
    nights >= 7 ? listing?.weeklyDiscount || 0 : 0;
  const cleaningFee = listing?.cleaningFee || 0;
  const serviceFee = listing?.serviceFee || 0;
  const taxes = listing?.occupancyTaxes || 0;
  const total = Math.max(
    0,
    basePrice - weeklyDiscountAmount + cleaningFee + serviceFee + taxes
  );

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const clearDates = () => {
    setStartDate(new Date());
    setEndDate(null);
  };

  const handleReservation = async () => {
    if (!user) {
      alert("Please log in to make a reservation");
      return;
    }

    if (!endDate) {
      toast.error("Please select check-out date");
      return;
    }

    setIsReserving(true);

    try {
      await api.post("/reservations", {
        accommodation_id: listing._id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests: Number(guests),
      });

      alert("Reservation Successful!🎉");
      navigate("/reservations");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reservation failed");
    } finally {
      setIsReserving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="ld-loading">Loading listing...</div>
        <Footer />
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Header />
        <div className="ld-loading">Listing not found.</div>
        <Footer />
      </>
    );
  }

  const images =
    listing.images?.length > 0
      ? listing.images
      : ["https://via.placeholder.com/800x500?text=No+Image"];

  const bedroomImage =
    listing.bedroomImage?.trim() ||
    images[Math.min(1, images.length - 1)] ||
    images[0];

  const hostName = listing.host || "Admin";
  const reviewCount = listing.reviews ?? 0;
  const ratingDisplay = Number(listing.rating ?? 0).toFixed(1);
  const amenities = listing.amenities || [];
  const visibleAmenities = showAllAmenities ? amenities : amenities.slice(0, 4);
  const description = listing.description || "";
  const shortDescription =
    description.length > 160 && !showFullDescription
      ? `${description.slice(0, 160)}...`
      : description;

  const bookingCard = (
    <aside className="ld-booking-card">
      <div className="ld-booking-header">
        <p className="ld-price">
          <strong>${listing.price}</strong> <span>/ night</span>
        </p>
        <p className="ld-booking-rating">
          <FaStar /> {ratingDisplay} · {reviewCount} reviews
        </p>
      </div>

      <div className="ld-date-box">
        <div className="ld-date-field">
          <label>CHECK-IN</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="ld-date-field">
          <label>CHECKOUT</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            dateFormat="MM/dd/yyyy"
          />
        </div>
      </div>

      <div className="ld-guests-field">
        <label>GUESTS</label>
        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
          {Array.from({ length: listing.guests || 1 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} guest{i + 1 > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="ld-reserve-btn"
        onClick={handleReservation}
        disabled={isReserving}
      >
        {isReserving ? "Booking..." : "Reserve"}
      </button>

      <div className="ld-price-breakdown">
        <p>
          <span>
            ${listing.price} x {nights} night{nights !== 1 ? "s" : ""}
          </span>
          <span>${basePrice}</span>
        </p>
        <p>
          <span>Weekly discount</span>
          <span>-${weeklyDiscountAmount}</span>
        </p>
        <p>
          <span>Cleaning fee</span>
          <span>${cleaningFee}</span>
        </p>
        <p>
          <span>Service fee</span>
          <span>${serviceFee}</span>
        </p>
        <p>
          <span>Occupancy taxes and fees</span>
          <span>${taxes}</span>
        </p>
        <p className="ld-total">
          <span>Total</span>
          <span>${total}</span>
        </p>
      </div>
    </aside>
  );

  return (
    <>
      <Header />
      <ToastContainer />

      <main className="ld-page">
        <div className="ld-container">
          <h1 className="ld-title">{listing.title}</h1>

          <div className="ld-title-meta">
            <span className="ld-meta-item ld-meta-rating">
              <FaStar /> {ratingDisplay}
            </span>
            <span className="ld-meta-dot">·</span>
            <span className="ld-meta-item">
              {reviewCount} review{reviewCount !== 1 ? "s" : ""}
            </span>
            <span className="ld-meta-dot">·</span>
            <span className="ld-meta-item ld-meta-superhost">
              <FaMedal /> Superhost
            </span>
            <span className="ld-meta-dot">·</span>
            <span className="ld-meta-item ld-meta-location">
              <FaMapMarkerAlt /> {listing.location}
            </span>
          </div>

          <PhotoGallery images={images} title={listing.title} />

          <div className="ld-layout">
            <div className="ld-main">
              <section className="ld-section ld-host-intro">
                <h2>
                  Entire {listing.type?.toLowerCase() || "rental unit"} hosted by {hostName}
                </h2>
                <p className="ld-capacity">
                  <FaUserFriends /> {listing.guests} guests · {listing.bedrooms} bedroom
                  {listing.bedrooms !== 1 ? "s" : ""} · <FaBed /> {listing.bedrooms} bed
                  {listing.bedrooms !== 1 ? "s" : ""} · <FaBath /> {listing.bathrooms} bath
                </p>

                <ul className="ld-highlights">
                  <li>
                    <FaHome />
                    <div>
                      <strong>Entire home</strong>
                      <p>You&apos;ll have the {listing.type?.toLowerCase() || "place"} to yourself</p>
                    </div>
                  </li>
                  {listing.enhancedCleaning && (
                    <li>
                      <FaSprayCan />
                      <div>
                        <strong>Enhanced Clean</strong>
                        <p>This host committed to Airbnb&apos;s enhanced cleaning process.</p>
                      </div>
                    </li>
                  )}
                  {listing.selfCheckIn && (
                    <li>
                      <FaKey />
                      <div>
                        <strong>Self check-in</strong>
                        <p>Check yourself in with the keypad.</p>
                      </div>
                    </li>
                  )}
                  <li>
                    <FaUndo />
                    <div>
                      <strong>Free cancellation before Jun 27</strong>
                    </div>
                  </li>
                </ul>

                <p className="ld-description">
                  {shortDescription}
                  {description.length > 160 && (
                    <button
                      type="button"
                      className="ld-link-btn"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? " Show less" : " Show more"}
                    </button>
                  )}
                </p>
              </section>

              <section className="ld-section">
                <h2>Where you&apos;ll sleep</h2>
                <div className="ld-sleep-card">
                  <img src={bedroomImage} alt={`${listing.title} bedroom`} />
                  <p>
                    <FaBed /> Bedroom
                  </p>
                  <span>{listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}</span>
                </div>
              </section>

              <section className="ld-section">
                <h2>What this place offers</h2>
                <div className="ld-amenities-grid">
                  {visibleAmenities.map((amenity, i) => (
                    <div key={i} className="ld-amenity">
                      <FaCheck />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                {amenities.length > 4 && (
                  <button
                    type="button"
                    className="ld-underline-btn"
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                  >
                    {showAllAmenities
                      ? "Show less amenities"
                      : `Show all ${amenities.length} amenities`}
                  </button>
                )}
              </section>

              <section className="ld-section ld-calendar-section">
                <h3>
                  {nights} night{nights !== 1 ? "s" : ""} in {listing.location}
                </h3>
                <p className="ld-date-range">
                  {formatDate(startDate)}
                  {endDate ? ` – ${formatDate(endDate)}` : ""}
                </p>
                <div className="ld-calendar-wrap">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    monthsShown={2}
                    minDate={new Date()}
                  />
                </div>
                <button type="button" className="ld-underline-btn" onClick={clearDates}>
                  Clear dates
                </button>
              </section>

              <section className="ld-section ld-reviews-section">
                <h2 className="ld-reviews-title">
                  <FaStar /> {ratingDisplay} · {reviewCount} reviews
                </h2>

                {listing.specificRatings && (
                  <div className="ld-ratings-grid">
                    {Object.entries(listing.specificRatings).map(([key, value]) => (
                      <div key={key} className="ld-rating-row">
                        <span>{ratingLabels[key] || key}</span>
                        <span>{Number(value).toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="ld-reviews-list">
                  {sampleReviews
                    .slice(0, showAllReviews ? sampleReviews.length : 2)
                    .map((review, i) => (
                      <article key={i} className="ld-review">
                        <div className="ld-review-head">
                          <strong>
                            <FaUser /> {review.name}
                          </strong>
                          <span>{review.date}</span>
                        </div>
                        <p>{review.content}</p>
                      </article>
                    ))}
                </div>

                <button
                  type="button"
                  className="ld-underline-btn"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  {showAllReviews
                    ? "Show less reviews"
                    : `Show all ${reviewCount} reviews`}
                </button>
              </section>

              <section className="ld-section ld-host-section">
                <h2>Hosted by {hostName}</h2>
                <div className="ld-host-badges">
                  <span>
                    <FaCalendarAlt /> Joined May 2021
                  </span>
                  <span>
                    <FaStar /> {reviewCount} Reviews
                  </span>
                  <span>
                    <FaUserShield /> Identity verified
                  </span>
                  <span>
                    <FaMedal /> Superhost
                  </span>
                </div>
                <p className="ld-host-desc">
                  {hostName} is a Superhost. Superhosts are experienced, highly rated hosts
                  who are committed to providing great stays for guests.
                </p>
                <p>Response rate: 100%</p>
                <p>Response time: within an hour</p>
                <button type="button" className="ld-contact-btn">
                  Contact Host
                </button>
                <p className="ld-payment-note">
                  To protect your payment, never transfer money or communicate outside of
                  the Airbnb website or app.
                </p>
              </section>

              <section className="ld-section ld-things-section">
                <h2>Things to know</h2>
                <div className="ld-things-grid">
                  <div>
                    <h3>House rules</h3>
                    <ul>
                      <li>
                        <FaCalendarAlt /> Check-in: After 4:00 PM
                      </li>
                      <li>
                        <FaCalendarAlt /> Checkout: 10:00 AM
                      </li>
                      {listing.selfCheckIn && (
                        <li>
                          <FaKey /> Self check-in with lockbox
                        </li>
                      )}
                      <li>
                        <FaBan /> Not suitable for infants (under 2 years)
                      </li>
                      <li>
                        <FaSmokingBan /> No smoking
                      </li>
                      <li>
                        <FaBan /> No parties or events
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>Health &amp; safety</h3>
                    <ul>
                      {listing.enhancedCleaning && (
                        <li>
                          <FaSprayCan /> Committed to Airbnb&apos;s enhanced cleaning process
                        </li>
                      )}
                      <li>
                        <FaUserFriends /> Airbnb&apos;s social-distancing guidelines apply
                      </li>
                      <li>
                        <FaShieldAlt /> Carbon monoxide alarm
                      </li>
                      <li>
                        <FaShieldAlt /> Smoke alarm
                      </li>
                    </ul>
                    <button type="button" className="ld-underline-btn">
                      Show more
                    </button>
                  </div>
                  <div>
                    <h3>Cancellation policy</h3>
                    <ul>
                      <li>
                        <FaUndo /> Free cancellation before Jun 27
                      </li>
                    </ul>
                    <button type="button" className="ld-underline-btn">
                      Show more
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <div className="ld-sidebar">{bookingCard}</div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .ld-loading {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
        }

        .ld-page {
          background: #fff;
          padding-bottom: 2rem;
        }

        .ld-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.5rem 2.5rem 0;
        }

        .ld-title {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .ld-title-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 1.25rem;
          font-size: 0.95rem;
          color: #222;
        }

        .ld-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .ld-meta-rating {
          font-weight: 600;
        }

        .ld-meta-rating svg,
        .ld-meta-superhost svg {
          font-size: 0.85rem;
        }

        .ld-meta-superhost {
          font-weight: 600;
        }

        .ld-meta-location svg {
          font-size: 0.8rem;
          color: #717171;
        }

        .ld-meta-dot {
          color: #717171;
        }

        .ld-gallery {
          --ld-gallery-h: calc(100svh - 11rem);
          margin-bottom: 2.5rem;
          gap: 4px;
          height: var(--ld-gallery-h);
          min-height: var(--ld-gallery-h);
          max-height: var(--ld-gallery-h);
          background: transparent;
        }

        .ld-gallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          border-radius: 3px;
          transition: transform 0.25s ease;
        }

        .ld-gallery-item {
          position: relative;
          padding: 0;
          border: none;
          background: none;
          overflow: hidden;
          border-radius: 3px;
          cursor: pointer;
          width: 100%;
          height: 100%;
          min-height: 0;
          min-width: 0;
          display: block;
          text-align: left;
        }

        .ld-gallery-item:hover img {
          transform: scale(1.04);
        }

        .ld-gallery-hover {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.25s ease;
          pointer-events: none;
          border-radius: 3px;
        }

        .ld-gallery-item:hover .ld-gallery-hover {
          background: rgba(0, 0, 0, 0.12);
        }

        .ld-gallery-stack,
        .ld-gallery-grid {
          min-height: 0;
        }

        .ld-gallery--1 .ld-gallery-item {
          height: 100%;
        }

        .ld-gallery--2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .ld-gallery--3 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          column-gap: 4px;
          row-gap: 4px;
        }

        .ld-gallery--3 .ld-gallery-hero {
          grid-row: 1 / span 2;
          grid-column: 1;
        }

        .ld-gallery-stack {
          grid-row: 1 / span 2;
          grid-column: 2;
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 4px;
          height: 100%;
          min-height: 0;
        }

        .ld-gallery--4 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 4px;
        }

        .ld-gallery--4 .ld-gallery-hero {
          grid-row: 1 / span 2;
          grid-column: 1;
        }

        .ld-gallery--5plus {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          column-gap: 4px;
          row-gap: 4px;
        }

        .ld-gallery--5plus .ld-gallery-hero {
          grid-row: 1 / span 2;
          grid-column: 1;
        }

        .ld-gallery-grid {
          grid-row: 1 / span 2;
          grid-column: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 4px;
          height: 100%;
          min-height: 0;
        }

        .ld-gallery-more {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.45);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          pointer-events: none;
          z-index: 1;
        }

        .ld-lightbox {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .ld-lightbox-image {
          max-width: min(95vw, 1400px);
          max-height: 90vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 4px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }

        .ld-lightbox-close,
        .ld-lightbox-nav {
          position: absolute;
          border: none;
          background: rgba(255, 255, 255, 0.95);
          color: #222;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .ld-lightbox-close:hover,
        .ld-lightbox-nav:hover {
          background: #fff;
        }

        .ld-lightbox-close {
          top: 1.25rem;
          right: 1.25rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.1rem;
        }

        .ld-lightbox-nav {
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 1rem;
        }

        .ld-lightbox-nav--prev {
          left: 1.25rem;
        }

        .ld-lightbox-nav--next {
          right: 1.25rem;
        }

        .ld-lightbox-count {
          position: absolute;
          bottom: 1.25rem;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 500;
          background: rgba(0, 0, 0, 0.55);
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
        }

        .ld-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 5rem;
          align-items: stretch;
        }

        .ld-section {
          border-bottom: 1px solid #ebebeb;
          padding: 1.75rem 0;
        }

        .ld-section h2 {
          font-size: 1.35rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .ld-host-intro h2 {
          font-size: 1.45rem;
        }

        .ld-capacity {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          align-items: center;
          color: #222;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #ebebeb;
        }

        .ld-highlights {
          list-style: none;
          margin-bottom: 1.25rem;
        }

        .ld-highlights li {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .ld-highlights li svg {
          font-size: 1.5rem;
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .ld-highlights strong {
          display: block;
          margin-bottom: 0.2rem;
        }

        .ld-highlights p {
          color: #717171;
          font-size: 0.95rem;
        }

        .ld-description {
          color: #222;
          line-height: 1.6;
        }

        .ld-link-btn,
        .ld-underline-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
          color: #222;
        }

        .ld-sleep-card {
          max-width: 280px;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
        }

        .ld-sleep-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .ld-sleep-card p {
          padding: 0.75rem 0.75rem 0.25rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .ld-sleep-card span {
          display: block;
          padding: 0 0.75rem 0.75rem;
          color: #717171;
          font-size: 0.9rem;
        }

        .ld-amenities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem 1.5rem;
        }

        .ld-amenity {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ld-underline-btn {
          margin-top: 1rem;
        }

        .ld-calendar-section h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .ld-date-range {
          color: #717171;
          margin: 0.25rem 0 1rem;
        }

        .ld-calendar-wrap {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1rem;
          display: inline-block;
        }

        .ld-reviews-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .ld-reviews-title svg {
          color: #ff385c;
        }

        .ld-ratings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 2rem;
          margin-bottom: 1.5rem;
        }

        .ld-rating-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
        }

        .ld-reviews-list {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .ld-review-head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }

        .ld-review-head strong {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .ld-review-head span {
          color: #717171;
          font-size: 0.9rem;
        }

        .ld-host-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
          color: #444;
          font-size: 0.9rem;
        }

        .ld-host-badges span {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .ld-host-desc {
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .ld-contact-btn {
          margin: 1rem 0;
          padding: 0.75rem 1.25rem;
          border: 1px solid #222;
          border-radius: 8px;
          background: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .ld-payment-note {
          font-size: 0.85rem;
          color: #717171;
        }

        .ld-things-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .ld-things-grid h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .ld-things-grid ul {
          list-style: none;
        }

        .ld-things-grid li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
          font-size: 0.9rem;
          color: #444;
        }

        .ld-sidebar {
          position: relative;
          align-self: stretch;
          min-height: 100%;
        }

        .ld-booking-card {
          position: sticky;
          top: 5.5rem;
          z-index: 20;
          align-self: flex-start;
          width: 100%;
          max-height: calc(100vh - 6.5rem);
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

        .ld-booking-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .ld-price strong {
          font-size: 1.25rem;
        }

        .ld-price span {
          font-weight: 400;
          color: #444;
        }

        .ld-booking-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.85rem;
        }

        .ld-booking-rating svg {
          color: #ff385c;
          font-size: 0.75rem;
        }

        .ld-date-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid #b0b0b0;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .ld-date-field {
          padding: 0.5rem 0.75rem;
          border-right: 1px solid #b0b0b0;
        }

        .ld-date-field:last-child {
          border-right: none;
        }

        .ld-date-field label,
        .ld-guests-field label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 0.25rem;
        }

        .ld-date-field .react-datepicker-wrapper,
        .ld-date-field input {
          width: 100%;
          border: none;
          padding: 0;
          font-size: 0.9rem;
        }

        .ld-date-field input:focus {
          outline: none;
        }

        .ld-guests-field {
          border: 1px solid #b0b0b0;
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          margin-bottom: 1rem;
        }

        .ld-guests-field select {
          width: 100%;
          border: none;
          font-size: 0.9rem;
          background: transparent;
        }

        .ld-guests-field select:focus {
          outline: none;
        }

        .ld-reserve-btn {
          width: 100%;
          padding: 0.9rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(to right, #e61e4d, #e31c5f, #d70466);
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1rem;
        }

        .ld-reserve-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ld-price-breakdown p {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: #222;
        }

        .ld-total {
          border-top: 1px solid #ddd;
          padding-top: 0.75rem;
          margin-top: 0.5rem;
          font-weight: 700;
        }

        @media (max-width: 950px) {
          .ld-layout {
            grid-template-columns: 1fr;
          }

          .ld-booking-card {
            position: static;
          }

          .ld-things-grid {
            grid-template-columns: 1fr;
          }

          .ld-container {
            padding: 1.25rem 1.25rem 0;
          }

          .ld-gallery {
            --ld-gallery-h: calc(100svh - 9rem);
            height: var(--ld-gallery-h);
            min-height: var(--ld-gallery-h);
            max-height: var(--ld-gallery-h);
          }

          .ld-gallery--1 .ld-gallery-item {
            height: var(--ld-gallery-h);
          }

          .ld-gallery--2,
          .ld-gallery--3,
          .ld-gallery--4,
          .ld-gallery--5plus {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }

          .ld-gallery--2 {
            height: var(--ld-gallery-h);
          }

          .ld-gallery--3 .ld-gallery-stack,
          .ld-gallery--5plus .ld-gallery-grid {
            grid-row: auto;
            grid-column: auto;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            height: min(40vh, 280px);
          }

          .ld-gallery--3 .ld-gallery-hero,
          .ld-gallery--4 .ld-gallery-hero,
          .ld-gallery--5plus .ld-gallery-hero {
            grid-row: auto;
            grid-column: auto;
            height: min(45vh, 320px);
          }

          .ld-gallery--4 {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }

          .ld-gallery--4 .ld-gallery-item:not(.ld-gallery-hero) {
            height: min(22vh, 160px);
          }
        }
      `}</style>
    </>
  );
};

export default LocationDetails;
