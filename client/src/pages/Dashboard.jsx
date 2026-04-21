import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import BackgroundLayout from "../components/BackgroundLayout";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    fraud: 0,
    safe: 0,
  });

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
        .catch((err) => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: "Fraud", value: stats.fraud },
    { name: "Safe", value: stats.safe },
  ];

  return (
    <BackgroundLayout>
      <div className="p-6 text-white">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">
          FraudGuard Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20">
            <p className="text-gray-300">Total Transactions</p>
            <p className="text-3xl font-bold mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20">
            <p className="text-gray-300">Fraud Detected</p>
            <p className="text-3xl font-bold text-red-400 mt-2">
              {stats.fraud}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20">
            <p className="text-gray-300">Safe Transactions</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {stats.safe}
            </p>
          </div>

        </div>

        {/* CHART */}
        <div className="mt-10 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 flex justify-center">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Fraud Analysis
            </h2>

            <PieChart width={320} height={320}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
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

        {/* TABLE */}
        <div className="mt-10 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20">
          <h2 className="text-lg font-semibold mb-4">
            Recent Transactions
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-3">Amount</th>
                <th className="p-3">Currency</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Fraud Score</th>
                <th className="p-3">Reasons</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-300">
                    No transactions available
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-3 font-medium">
                      {tx.amount}
                    </td>

                    <td className="p-3">
                      {tx.currency || "-"}
                    </td>

                    <td className="p-3">
                      {tx.location}
                    </td>

                    <td className="p-3">
                      {tx.is_fraud ? (
                        <span className="text-red-400 font-semibold">
                          🚨 Fraud
                        </span>
                      ) : (
                        <span className="text-green-400">
                          ✅ Safe
                        </span>
                      )}
                    </td>

                    {/* FRAUD SCORE */}
                    <td className="p-3">
                      <span
                        className={
                          tx.fraud_score > 0.5
                            ? "text-red-400 font-bold"
                            : tx.fraud_score > 0.3
                            ? "text-orange-400 font-semibold"
                            : "text-green-400"
                        }
                      >
                        {(tx.fraud_score ?? 0).toFixed(2)}
                      </span>
                    </td>

                    <td className="p-3 text-sm text-gray-300">
                      {tx.reasons?.join(", ") || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </BackgroundLayout>
  );
};

export default Dashboard;