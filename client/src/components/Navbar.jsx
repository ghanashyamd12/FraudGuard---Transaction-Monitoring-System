import { Link } from "react-router-dom";

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");

    // Force full reload to clear all React state
    window.location.href = "/";
  };

  return (
    <nav className="bg-indigo-600 text-white px-8 py-4 shadow-md flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-semibold tracking-wide">
        FraudGuard
      </h1>

      {/* Navigation */}
      <div className="space-x-6 text-sm font-medium">

        <Link to="/dashboard" className="hover:text-gray-200 transition">
          Dashboard
        </Link>

        <Link to="/transactions" className="hover:text-gray-200 transition">
          Transactions
        </Link>

        <Link to="/alerts" className="hover:text-gray-200 transition">
          Alerts
        </Link>

        <button
          onClick={handleLogout}
          className="hover:text-gray-200 transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;