import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync } from "../features/auth/authSlice";

function RequireAuth({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check auth status when component mounts or when status is idle
    if (status === "idle") {
      dispatch(checkAuthAsync());
    }
  }, [dispatch, status]);

  // Show loading state while checking auth
  if (status === "loading" || status === "idle") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if no user
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
