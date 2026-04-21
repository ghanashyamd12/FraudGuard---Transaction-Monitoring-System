import { useEffect, useState } from "react";
import BackgroundLayout from "../components/BackgroundLayout";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = () => {
      fetch("http://localhost:5000/api/transactions")
        .then((res) => res.json())
        .then((data) => {
          const fraudOnly = (data.transactions || []).filter(
            (t) => t.is_fraud
          );

          fraudOnly.sort(
            (a, b) => (b.fraud_score || 0) - (a.fraud_score || 0)
          );

          setAlerts(fraudOnly);
        })
        .catch((err) => console.error("Error:", err));
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundLayout>
      <div className="p-6 text-white">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">
          🚨 Fraud Alerts
        </h1>

        {/* NO ALERTS */}
        {alerts.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow text-center text-gray-300 border border-white/20">
            No fraud alerts detected 🎉
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            
            {alerts.map((tx) => (
              <div
                key={tx.id}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border-l-8 border-red-500 border border-white/20 hover:shadow-xl transition"
              >
                
                {/* HEADER ROW */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-lg">
                    Transaction #{tx.id}
                  </h2>

                  {/* FRAUD SCORE BADGE */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      tx.fraud_score > 0.5
                        ? "bg-red-500 text-white"
                        : tx.fraud_score > 0.3
                        ? "bg-orange-400 text-white"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    Score: {(tx.fraud_score ?? 0).toFixed(2)}
                  </span>
                </div>

                {/* DETAILS */}
                <p className="text-sm">
                  <strong>Amount:</strong> {tx.amount} {tx.currency}
                </p>

                <p className="text-sm">
                  <strong>Location:</strong> {tx.location}
                </p>

                {/* REASONS */}
                <p className="mt-2 text-sm text-gray-300">
                  {tx.reasons?.join(", ") || "No reason"}
                </p>

                {/* TIME */}
                <p className="mt-3 text-xs text-gray-400">
                  {new Date(tx.created_at).toLocaleString()}
                </p>
              </div>
            ))}

          </div>
        )}
      </div>
    </BackgroundLayout>
  );
};

export default Alerts;