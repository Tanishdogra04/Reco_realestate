import { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  {
    name: 'Properties',
    path: '/properties',
    subitems: [
      { name: 'Buy a Home', path: '/properties/buy' },
      { name: 'Rent a Home', path: '/properties/rent' },
      { name: 'Commercial Spaces', path: '/properties/commercial' },
    ]
  },
  {
    name: 'Projects',
    path: '/projects',
    subitems: [
      { name: 'New Launches', path: '/projects/new' },
      { name: 'Under Construction', path: '/projects/under-construction' },
      { name: 'Ready to Move', path: '/projects/ready' },
    ]
  },
  {
    name: 'Solutions',
    path: '/solutions',
    subitems: [
      { name: 'For Buyers', path: '/solutions/buyers' },
      { name: 'For Sellers', path: '/solutions/sellers' },
      { name: 'For Investors', path: '/solutions/investors' },
    ]
  },
  {
    name: 'Technologies',
    path: '/technologies',
    subitems: [
      { name: 'Smart Home Integration', path: '/technologies/smart-home' },
      { name: 'Virtual Tours', path: '/technologies/vr-tours' },
      { name: 'AI Valuation', path: '/technologies/ai-valuation' },
    ]
  },
  {
    name: 'Events',
    path: '/events',
    subitems: [
      { name: 'Upcoming Expos', path: '/events/upcoming' },
      { name: 'Webinars', path: '/events/webinars' },
      { name: 'Property Fairs', path: '/events/fairs' },
    ]
  }
];

export default function Navbar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      {/* Top Row */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-stone-100">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-slate-900 tracking-tighter">
            Reco<span className="text-amber-500">.</span>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Collapsible Search */}
            <form
              onSubmit={handleSearch}
              className={`relative flex items-center transition-all duration-300 ease-in-out ${isSearchExpanded ? 'w-64' : 'w-10 hover:w-64'} h-10 bg-stone-100 rounded-full overflow-hidden`}
              onMouseEnter={() => setIsSearchExpanded(true)}
              onMouseLeave={(e) => {
                // Keep expanded if input is focused
                if (document.activeElement !== e.currentTarget.querySelector('input') && searchQuery === '') {
                  setIsSearchExpanded(false);
                }
              }}
            >
              <button type="submit" className="absolute left-0 pl-3 flex items-center h-full">
                <Search className="h-4 w-4 text-slate-400 hover:text-amber-500 transition-colors" />
              </button>
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full h-full pl-10 pr-4 bg-transparent outline-none text-sm text-slate-700 transition-opacity duration-300 ${isSearchExpanded ? 'opacity-100' : 'opacity-0 cursor-pointer'}`}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => {
                  if (searchQuery === '') setIsSearchExpanded(false);
                }}
              />
            </form>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {localStorage.getItem('userToken') || localStorage.getItem('adminToken') ? (
                <div 
                  className="relative group profile-dropdown-container cursor-pointer"
                  onMouseEnter={() => setIsProfileDropdownOpen(true)}
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full border border-stone-200 group-hover:border-amber-400 group-hover:bg-amber-50 transition-colors">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${localStorage.getItem('adminToken') ? 'bg-slate-900 border border-amber-500/50' : 'bg-amber-500'}`}>
                      {localStorage.getItem('adminToken') 
                        ? (JSON.parse(localStorage.getItem('adminInfo'))?.name?.charAt(0) || 'A')
                        : (JSON.parse(localStorage.getItem('userInfo'))?.name?.charAt(0) || 'U')}
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      {localStorage.getItem('adminToken')
                        ? (JSON.parse(localStorage.getItem('adminInfo'))?.name?.split(' ')[0] || 'Admin')
                        : (JSON.parse(localStorage.getItem('userInfo'))?.name?.split(' ')[0] || 'User')}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-amber-500" />
                  </div>

                  {/* Dropdown Menu */}
                  <div className={`absolute right-0 mt-0 pt-2 w-48 transition-all duration-200 origin-top-right z-[100] ${isProfileDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    <div className="bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden flex flex-col p-1 border border-stone-100 relative z-[101]">
                      {localStorage.getItem('adminToken') ? (
                        <Link 
                          to="/admin/dashboard"
                          className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-stone-50 hover:text-amber-600 rounded-lg transition-colors flex items-center justify-between"
                        >
                          Admin Dashboard
                        </Link>
                      ) : (
                        <>
                          <Link 
                            to="/dashboard"
                            className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-stone-50 hover:text-amber-600 rounded-lg transition-colors flex items-center justify-between"
                          >
                            Dashboard
                          </Link>
                          <Link 
                            to="/dashboard/profile"
                            className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-stone-50 hover:text-amber-600 rounded-lg transition-colors flex items-center justify-between"
                          >
                            Edit Profile
                          </Link>
                        </>
                      )}
                      
                      <button 
                        onClick={() => {
                          localStorage.removeItem('userToken');
                          localStorage.removeItem('userInfo');
                          localStorage.removeItem('adminToken');
                          localStorage.removeItem('adminInfo');
                          navigate('/login', { replace: true });
                          window.location.reload();
                        }}
                        className="px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                    Log In
                  </Link>
                  <Link to="/signup" className="px-5 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl shadow-sm hover:bg-slate-800 hover:shadow transition-all">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Navigation Links */}
      <div className="hidden lg:block bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <nav className="flex space-x-1 border-none focus:outline-none">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className="flex items-center px-4 py-3 text-sm font-bold text-slate-600 hover:text-amber-600 hover:bg-stone-50/50 rounded-t-md transition-colors"
                  >
                    {link.name}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className={`absolute left-0 mt-0 w-56 rounded-b-md rounded-tr-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-left ${activeDropdown === link.name ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    <div className="py-2 px-1">
                      {link.subitems.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.path}
                          className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 rounded-md transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            <Link to="/post-property" className="group flex items-center pr-2">
              <span className="text-sm font-bold text-slate-700 group-hover:text-amber-600 transition-colors mr-2">Post Property</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm uppercase tracking-wider">
                Free
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Simplified) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 h-screen overflow-y-auto pb-32">
            {navLinks.map((link) => (
              <div key={link.name} className="py-2">
                <div className="px-3 py-2 text-base font-bold text-slate-900 border-l-4 border-amber-500 bg-amber-50">
                  {link.name}
                </div>
                <div className="pl-6 space-y-1">
                  {link.subitems.map((subitem) => (
                    <Link
                      key={subitem.name}
                      to={subitem.path}
                      className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-amber-600"
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="px-4 py-6 flex gap-4 border-t border-stone-100 mt-4">
              {localStorage.getItem('userToken') || localStorage.getItem('adminToken') ? (
                <div className="flex flex-col gap-2 w-full">
                  <div className="grid grid-cols-2 gap-2">
                    {localStorage.getItem('adminToken') ? (
                      <Link 
                        to="/admin/dashboard"
                        className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl text-sm font-bold text-center transition-colors shadow-sm"
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link 
                          to="/dashboard"
                          className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl text-sm font-bold text-center transition-colors shadow-sm"
                        >
                          Dashboard
                        </Link>
                        <Link 
                          to="/dashboard/profile"
                          className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl text-sm font-bold text-center transition-colors shadow-sm"
                        >
                          Edit Profile
                        </Link>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('userToken');
                      localStorage.removeItem('userInfo');
                      localStorage.removeItem('adminToken');
                      localStorage.removeItem('adminInfo');
                      navigate('/login', { replace: true });
                      window.location.reload();
                    }}
                    className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold shadow-sm text-center transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="flex-1 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 text-center">Log In</Link>
                  <Link to="/signup" className="flex-1 py-3 bg-slate-900 rounded-xl text-sm font-bold text-white shadow-sm text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
