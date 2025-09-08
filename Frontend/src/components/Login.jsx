import { useForm } from 'react-hook-form';
import { useLoginUser } from '../../hooks/Useuser';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import {enqueueSnackbar } from 'notistack';


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const navigate = useNavigate();
  const { setUser } = useAuth(); // Get setUser from context
  const { mutate, error } = useLoginUser();
  

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (data) => { 

        // ✅ IMPORTANT: Set user context BEFORE navigation
        if (data?.user) {
          setUser(data.user); // This will also update localStorage
        }
        if (data?.token) {
          localStorage.setItem('token', data.token);
        }
        enqueueSnackbar('Login successful!',  {variant:"success"});
        reset();
        
        navigate('/');
      },
      onError: (err) => {
        console.error('Login error:', err); 
        enqueueSnackbar(err?.response?.data?.message || 'Login failed', {variant:"error"});
      }
    });
  };


 

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        {/* Background Effects */}


        <div className="relative w-full max-w-md">
          {/* Main Form Container */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Premium Access Login</h1>
              <p className="text-white/70">Join our exclusive community</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-white/90 mb-2 transition-colors group-focus-within:text-purple-300">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100"></div>
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 animate-pulse">{errors.name.message}</p>
                )}
              </div>
              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-white/90 mb-2 transition-colors group-focus-within:text-purple-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      } 
                    })}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                  />

                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100"></div>
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 animate-pulse">{errors.name.message}</p>
                )}
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>


            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/50 text-sm">
                By submitting, you agree to our
                <span className="text-purple-300 hover:text-purple-200 cursor-pointer transition-colors"> Terms & Conditions</span>
                <p className="text-sm mt-4 text-center text-white/70">
                  Don’t have an account?{' '}
                  <Link to="/register" className="text-purple-300 hover:underline">
                    Register
                  </Link>
                </p>
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
        </div>

      </div>
    </>
  );
}