import API_URL from "../config/api";
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
  const [formData, setFormData] = useState({
  amount: "",
  location: "",
  currency: "USD",
});
const [loading, setLoading] = useState(false);
const [adding, setAdding] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    fraud: 0,
    safe: 0,
  });

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/api/transactions`)
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
      if (transactions.length === 0) {
    generateTransactions();
  }
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: "Fraud", value: stats.fraud },
    { name: "Safe", value: stats.safe },
  ];
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const addTransaction = async () => {
  if (!formData.amount || !formData.location) {
    alert("Please enter amount and location");
    return;
  }

  setAdding(true);

  try {
    await fetch(`${API_URL}/api/transactions/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(formData.amount),
        location: formData.location,
        currency: formData.currency || "USD",
      }),
    });

    setFormData({
      amount: "",
      location: "",
      currency: "USD",
    });

  } catch (err) {
    console.error(err);
  }

  setAdding(false);
};
const generateTransactions = async () => {
  setLoading(true);

  const locations = ["Mumbai", "Delhi", "New York", "London", "Dubai"];

  try {
    for (let i = 0; i < 10; i++) {
      await fetch(`${API_URL}/api/transactions/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.floor(Math.random() * 100000),
          location: locations[Math.floor(Math.random() * locations.length)],
          currency: "USD",
        }),
      });
    }
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};

  return (
    <BackgroundLayout>
      <div className="p-6 text-white">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">
          FraudGuard Dashboard
        </h1>
         <div className="mb-6 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/10">

  <h2 className="font-semibold mb-3">Simulate Transaction</h2>

  <input
    type="number"
    name="amount"
    placeholder="Amount"
    value={formData.amount}
    onChange={handleChange}
    className="p-2 mr-2 rounded text-black"
  />

  <input
    type="text"
    name="location"
    placeholder="Location"
    value={formData.location}
    onChange={handleChange}
    className="p-2 mr-2 rounded text-black"
  />

  <button
  onClick={addTransaction}
  className="bg-indigo-500 px-4 py-2 rounded text-white"
>
  {adding ? "Adding..." : "Add Transaction"}
</button>

  <button
  onClick={generateTransactions}
  className="bg-green-500 px-4 py-2 rounded text-white ml-2"
>
  {loading ? "Generating..." : "Generate Sample Data"}
</button>

</div>
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
