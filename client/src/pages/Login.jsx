import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/fraudguard-bg.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@fraudguard.com" &&
      password === "adminghana@123"
    ) {
      localStorage.setItem("isAdmin", "true");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md text-center">

        <h1 className="text-5xl font-bold text-white mb-2">
          FraudGuard
        </h1>
        <p className="text-gray-300 mt-2 text-sm tracking-wide text-center">
  Real-time transaction monitoring & fraud detection
</p>

<div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3 rounded-full opacity-60"></div>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6">
            Admin Login
          </h2>

          {/* 🔥 Hidden fake fields (KEY FIX) */}
          <input
            type="text"
            name="fake-username"
            autoComplete="username"
            className="hidden"
          />
          <input
            type="password"
            name="fake-password"
            autoComplete="new-password"
            className="hidden"
          />

          {/* REAL EMAIL */}
          <input
            type="text" // 🔥 NOT email (important)
            name="real-email"
            autoComplete="off"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* REAL PASSWORD */}
          <input
            type="password"
            name="real-password"
            autoComplete="new-password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Login
          </button>

          <button
  type="button"
  onClick={() => {
    setEmail("admin@fraudguard.com");
    setPassword("adminghana@123");
  }}
  className="mt-3 w-full bg-purple-500 hover:bg-purple-600 py-2 rounded text-white transition"
>
  Use Demo Account
</button>

<div className="mt-4 text-sm bg-gray-100 p-3 rounded-lg">

<div className="mt-3 text-sm bg-gray-100 p-3 rounded-lg">
  <p className="font-semibold text-gray-800">Demo Credentials:</p>
  <p className="text-gray-700">
    Email: <span className="text-blue-600 font-medium">admin@fraudguard.com</span>
  </p>
  <p className="text-gray-700">
    Password: <span className="text-green-600 font-medium">adminghana@123</span>
  </p>
</div>
</div>
       </form>
      </div>
    </div>
  );
};

export default Login;
