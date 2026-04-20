import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    fraud: 0,
    safe: 0,
  });

  // Fetch data from backend
 useEffect(() => {
  const fetchData = () => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        const tx = data.transactions || [];

        setTransactions(tx);

        const total = tx.length;
        const fraud = tx.filter((t) => t.is_fraud).length;
        const safe = total - fraud;

        setStats({ total, fraud, safe });
      })
      .catch((err) => console.error("Error fetching:", err));
  };

  // Initial fetch
  fetchData();

  // Poll every 5 seconds
  const interval = setInterval(fetchData, 5000);

  return () => clearInterval(interval);
}, []);

  // 📊 Chart Data
  const chartData = [
    { name: "Fraud", value: stats.fraud },
    { name: "Safe", value: stats.safe },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Transactions</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        {/* Fraud */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Fraud Detected</p>
          <p className="text-3xl font-bold text-red-500">
            {stats.fraud}
          </p>
        </div>

        {/* Safe */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Safe Transactions</p>
          <p className="text-3xl font-bold text-green-500">
            {stats.safe}
          </p>
        </div>
      </div>

      {/* 📊 Chart Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow flex justify-center">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Fraud Analysis
          </h2>

          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              <Cell fill="#ef4444" />
              <Cell fill="#22c55e" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">Amount</th>
              <th className="p-3">Currency</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reasons</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No transactions available
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                 <td className="p-3">{tx.amount}</td>
                 <td className="p-3">{tx.currency || "-"}</td>
                 <td className="p-3">{tx.location}</td>

                  <td className="p-3">
                    {tx.is_fraud ? (
                      <span className="text-red-500 font-semibold">
                        🚨 Fraud
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium">
                        ✅ Safe
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {tx.reasons?.join(", ") || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;