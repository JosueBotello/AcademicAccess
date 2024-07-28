import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import Login from './components/Login';
import Register from './components/Register';
import StaffDirectory from './pages/StaffDirectory';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminProfileManagement from './components/AdminProfileManagement';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage'; // Make sure this import is correct

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<HomePage />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route 
            path="/staff-directory" 
            element={
              <ProtectedRoute allowedRoles={['student', 'academic_staff', 'admin']}>
                <StaffDirectory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/staff-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['academic_staff', 'admin']}>
                <StaffDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profiles" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProfileManagement />
              </ProtectedRoute>
            } 
          />

          {/* Error routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/not-found" element={<NotFound />} />
          
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;