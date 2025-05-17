// App.js - File utama aplikasi
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Komponen Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCourts from './pages/admin/ManageCourts';
import ManageInventory from './pages/admin/ManageInventory';
import ClientDashboard from './pages/client/ClientDashboard';
import OrderCourt from './pages/client/OrderCourt';
import OrderStatus from './pages/client/OrderStatus';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Fungsi autentikasi
  const handleLogin = (credentials) => {
    // Logika autentikasi sederhana sebagai contoh
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true);
      setUserRole(credentials.role); // 'admin' atau 'client'
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Protected Routes
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (allowedRole && userRole !== allowedRole) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={<LoginPage onLogin={handleLogin} isAuthenticated={isAuthenticated} />} 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/manage-courts" 
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageCourts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/manage-inventory" 
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageInventory />
            </ProtectedRoute>
          } 
        />

        {/* Client Routes */}
        <Route 
          path="/client" 
          element={
            <ProtectedRoute allowedRole="client">
              <ClientDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/order" 
          element={
            <ProtectedRoute allowedRole="client">
              <OrderCourt />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/status" 
          element={
            <ProtectedRoute allowedRole="client">
              <OrderStatus />
            </ProtectedRoute>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;