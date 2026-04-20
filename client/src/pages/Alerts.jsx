import { useEffect, useState } from "react";

const Alerts = () => {
  const [fraudTransactions, setFraudTransactions] = useState([]);

  useEffect(() => {
  const fetchAlerts = () => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        const fraudOnly = (data.transactions || []).filter(
          (t) => t.is_fraud
        );
        setFraudTransactions(fraudOnly);
      })
      .catch((err) => console.error("Error:", err));
  };

  fetchAlerts();

  const interval = setInterval(fetchAlerts, 5000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-red-600">
        🚨 Fraud Alerts
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        {fraudTransactions.length === 0 ? (
          <p className="text-gray-500 text-center">
            No fraud alerts detected 🎉
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-red-50">
                <th className="p-3">Amount</th>
                <th className="p-3">Currency</th>
                <th className="p-3">Location</th>
                <th className="p-3">Reason</th>
              </tr>
            </thead>

            <tbody>
              {fraudTransactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="p-3">{tx.amount}</td>
                  <td className="p-3">{tx.currency || "-"}</td>
                  <td className="p-3">{tx.location}</td>
                  <td className="p-3">{tx.reasons?.join(", ")}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Alerts;