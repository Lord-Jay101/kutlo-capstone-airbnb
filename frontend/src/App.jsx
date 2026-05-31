import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth pages
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

// Admin / Dashboard pages
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Reservations from "./pages/Reservations";
import ViewListings from "./pages/ViewListings";

// public pages
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";

// Route guards
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/view-listings" element={<ViewListings />} />
        <Route path="/location" element={<Locations />} />
        <Route path="/location/:id" element={<LocationDetails />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected user routes */}
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes (HOST DASHBOARD AREA) */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/listings"
          element={
            <AdminRoute>
              <ViewListings />
            </AdminRoute>
          }
        />

        <Route
          path="/listings/create"
          element={
            <AdminRoute>
              <CreateListing />
            </AdminRoute>
          }
        />

        <Route
          path="/listings/edit/:id"
          element={
            <AdminRoute>
              <EditListing />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;