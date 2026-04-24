import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostProperty from './pages/PostProperty';
import UserProfile from './pages/UserProfile';
import UserDashboard from './pages/UserDashboard';
import SavedProperties from './pages/SavedProperties';
import UserPortalLayout from './components/UserPortalLayout';
import Insights from './pages/Insights';
import PropertyListing from './pages/PropertyListing';
import InformationPage from './pages/InformationPage';
import Corporate from './pages/Corporate';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryBrowse from './pages/CategoryBrowse';
import CategoryDetail from './pages/CategoryDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Unified Listing & Discovery Routes */}
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/properties/:category" element={<PropertyListing />} />
        <Route path="/properties/:mainCategory/:subCategory" element={<PropertyListing />} />
        <Route path="/browse" element={<CategoryBrowse />} />
        <Route path="/browse/:mainCategory" element={<CategoryDetail />} />
        
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/projects" element={<PropertyListing />} />
        <Route path="/projects/:status" element={<PropertyListing />} />

        {/* Brand & Service Information Routes */}
        <Route path="/solutions" element={<InformationPage />} />
        <Route path="/solutions/:type" element={<InformationPage />} />
        <Route path="/technologies" element={<InformationPage />} />
        <Route path="/technologies/:topic" element={<InformationPage />} />
        <Route path="/events" element={<InformationPage />} />
        <Route path="/events/:type" element={<InformationPage />} />

        {/* Corporate & Professional Information Routes */}
        <Route path="/about" element={<Corporate />} />
        <Route path="/careers" element={<Corporate />} />
        <Route path="/press" element={<Corporate />} />
        <Route path="/legal" element={<Corporate />} />
        <Route path="/privacy" element={<Corporate />} />

        {/* Core Application Flow Routes */}
        <Route path="/insights" element={<Insights />} />
        <Route 
          path="/post-property" 
          element={
            <ProtectedRoute>
              <PostProperty />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* User Portal Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserPortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="saved" element={<SavedProperties />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
