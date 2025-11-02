import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => { 
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    checkSession();
 
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-blue-600 text-lg font-semibold">
        Checking Authentication...
      </div>
    );
  } 
  if (!session) {
    return <Navigate to="/" replace />;
  }
 
  return children;
};

export default ProtectedRoute;
