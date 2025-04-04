import React, { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserDetails } from "actions/users";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (email && password) {
      const storedUser = await getUserDetails(email);

      if (storedUser && storedUser.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(storedUser));
        navigate("/dashboard");
      } else {
        alert("No account found. Please sign up first.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 pt-4 rounded-lg shadow-md w-full max-w-md">
        <figure className="flex justify-center mb-6">
          <img
            src="/icon.png"
            alt="Emergency Response"
            width={300}
            height={200}
            className="w-3/4"
          />
        </figure>
        <form onSubmit={ handleLogin }>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4 text-gray-600">
          Don't have an account? <Link to="/signup" className="text-red-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;