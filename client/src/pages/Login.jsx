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
        <p className="text-gray-300 mb-8">
          Intelligent Fraud Monitoring System
        </p>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
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
        </form>
      </div>
    </div>
  );
};

export default Login;