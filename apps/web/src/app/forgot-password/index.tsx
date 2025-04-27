import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "Context/user-context";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    if(!authContext) return null;
    const { setError, forgotPassword, isLoading, error, isLog } = authContext;

    useEffect(() => {
        setError("");

        if(isLog)
            navigate("/");

    }, [setError, isLog, navigate]);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if(authContext) {
                await forgotPassword(email);
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
            { error && (error !== "Check your email for password reset link") && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <strong className="font-bold">Error: </strong>
                <span>{ error }</span>
                </div>
            )}

            { error && (error === "Check your email for password reset link") && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                <strong className="font-bold">Success: </strong>
                <span>{ error }</span>
                </div>
            )}
            <button
                type="submit"
                className="w-full bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition duration-200"
                disabled={ isLoading }
            >
                { isLoading ? "Logging in..." : "Send Email"}
            </button>
            </form>
            <div className="text-center mt-4 text-gray-600">
            Remember password? <Link to="/login" className="text-red-500 hover:underline">Login here</Link>
            </div>
        </div>
        </div>
    );
}

export default ForgotPassword;