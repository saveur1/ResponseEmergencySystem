import { AuthContext } from "Context/user-context";
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  
  if (!authContext) return null;
  const { user, logout, isLog, setError } = authContext;

  useEffect(() => {
    setError("");

    if (!isLog)
        navigate("/login");
    
  }, [navigate]);
  
   const handleLogout = async() => {
    await logout();
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center bg-red-600 text-white px-5 py-2 my-2 mx-2 shadow-md rounded-md">
      <div className="text-white text-xl font-bold">
        <Link to="/">Emergency Response System</Link>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/" className="text-white no-underline cursor-pointer px-3 py-1 rounded hover:bg-white/20 transition">
          Dashboard
        </Link>

        <div className="relative cursor-pointer py-2 group">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex justify-center items-center border-2 border-white/50">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt={user.fullName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-white">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>

          <div className="absolute top-full right-0 w-48 bg-white rounded shadow-md py-2 text-gray-800 hidden group-hover:block z-10">
            <div className="font-bold px-4">{user?.fullName}</div>
            <div className="text-sm text-gray-500 px-4 pb-2 capitalize">{user?.role}</div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div
              className="px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;