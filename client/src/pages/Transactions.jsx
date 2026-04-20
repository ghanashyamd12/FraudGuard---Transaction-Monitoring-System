import { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/api/transactions")
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data.transactions || []);
        })
        .catch((err) => console.error("Error:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔍 Search + Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.location.toLowerCase().includes(search.toLowerCase()) ||
      tx.currency?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "fraud" && tx.is_fraud) ||
      (filter === "safe" && !tx.is_fraud);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>

      {/* 🔍 Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location or currency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="fraud">Fraud</option>
          <option value="safe">Safe</option>
        </select>
      </div>

      {/* 📊 Table */}
      <div className="bg-white p-6 rounded-xl shadow">
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
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
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

export default Transactions;