import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { LayoutDashboard, UserCircle, Heart, LogOut, ChevronRight } from 'lucide-react';

export default function UserPortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken');
      const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (!token) {
        navigate('/login', { replace: true });
      } else {
        setUserInfo(user);
      }
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    navigate('/login', { replace: true });
    window.location.reload();
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Edit Profile', path: '/dashboard/profile', icon: UserCircle },
    { name: 'Saved Properties', path: '/dashboard/saved', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 lg:px-8 pt-24 pb-12 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm sticky top-28">
            {/* User Meta Summary */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-stone-100">
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg shadow-amber-500/20">
                {userInfo.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 truncate max-w-[150px]">{userInfo.name || 'User'}</h2>
                <p className="text-sm font-bold text-slate-400 capitalize">Client Member</p>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
                
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-between p-3.5 rounded-2xl font-bold transition-all duration-200 group ${
                      isActive 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-stone-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : 'text-slate-400 group-hover:text-amber-500'} transition-colors`} />
                      {item.name}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-amber-500" />}
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-stone-100">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Pane */}
        <main className="flex-1 min-w-0 transition-opacity duration-300">
           <Outlet context={{ userInfo }} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
