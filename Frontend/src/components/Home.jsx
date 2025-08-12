import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import SideView from './SideView';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v6h8V1" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome Home!</h1>
                {user && (
                  <p className="text-white/70 text-sm">
                    Hello, {user.name || user.email || 'User'}
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            🎉 Login Successful!
          </h2>
          <p className="text-white/70 text-lg">
            You have successfully logged in and reached the home page.
          </p>
        </div>

        {/* Debug Info */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Debug Info:</h3>
          <div className="text-white/70 space-y-2">
            <p><strong>User Data:</strong> {user.name ? JSON.stringify(user.name, null, 2) : 'No user data'}</p>
            <p><strong>Token:</strong> {localStorage.getItem('token') ? 'Present' : 'Missing'}</p>
            <p><strong>Stored User:</strong> {localStorage.getItem('user') ? 'Present' : 'Missing'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Dashboard</h3>
            <p className="text-white/70 mb-4">View your analytics and insights</p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg">
              Open Dashboard
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Profile</h3>
            <p className="text-white/70 mb-4">Manage your account settings</p>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg">
              View Profile
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
            <p className="text-white/70 mb-4">Customize your preferences</p>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg">
              Open Settings
            </button>
          </div>
        </div>

        {/* Uncomment when ready */}
        {/* <SideView /> */}
        {/* <Dashboard /> */}
      </main>
    </div>
  );
};

export default Home;