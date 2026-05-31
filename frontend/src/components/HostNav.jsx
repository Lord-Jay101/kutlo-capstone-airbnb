import { Link, useLocation } from "react-router-dom";

const tabs = [
  { label: "View Reservations", path: "/reservations" },
  { label: "View Listings", path: "/dashboard" },
  { label: "Create Listing", path: "/listings/create" },
];

const HostNav = () => {
  const location = useLocation();

  return (
    <nav className="host-nav">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`host-nav-tab ${isActive ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        );
      })}

      <style>{`
        .host-nav {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 1100px;
          margin: 1.5rem auto 1.5rem;
          padding: 0 var(--page-padding-x);
          background: #fff;
        }

        .host-nav-tab {
          padding: 0.65rem 1.5rem;
          border: 1px solid #222;
          border-radius: 999px;
          background: #fff;
          color: #222;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .host-nav-tab:hover {
          background: #f7f7f7;
        }

        .host-nav-tab.active {
          background: #222;
          color: #fff;
        }
      `}</style>
    </nav>
  );
};

export default HostNav;
