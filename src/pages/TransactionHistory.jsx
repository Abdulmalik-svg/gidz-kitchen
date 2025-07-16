import { useEffect, useState } from "react";
import { CreditCard, Clock, Trash2, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isAdmin = true; // adjust for actual auth logic

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    const reversed = data.reverse();
    setTransactions(reversed);
    setFiltered(reversed);
  }, []);

  useEffect(() => {
    let filteredData = [...transactions];

    if (statusFilter !== "all") {
      filteredData = filteredData.filter((txn) => txn.status === statusFilter);
    }

    if (startDate) {
      filteredData = filteredData.filter(
        (txn) => new Date(txn.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredData = filteredData.filter(
        (txn) => new Date(txn.date) <= new Date(endDate)
      );
    }

    setFiltered(filteredData);
  }, [statusFilter, startDate, endDate, transactions]);

  // 🔽 Convert to PDF and download
  const downloadReceipt = (txn) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(255, 87, 34);
    doc.text("NaijaFlex Payment Receipt", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text(`Transaction ID: ${txn.id}`, 14, 35);
    doc.text(`Date: ${new Date(txn.date).toLocaleString()}`, 14, 43);
    doc.text(`Status: ${txn.status}`, 14, 51);
    doc.text(`Payment: ${txn.paymentMethod}`, 14, 59);
    doc.text(`Customer: ${txn.name}`, 14, 67);
    doc.text(`Email: ${txn.email}`, 14, 75);
    doc.text(`Address: ${txn.address}`, 14, 83);

    const items = txn.items.map((item, index) => [
      index + 1,
      item.title,
      item.qty,
      `${txn.currency === "NGN" ? "₦" : "$"}${(item.qty * item.price).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 95,
      head: [["#", "Item", "Qty", "Total"]],
      body: items,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 87, 34] },
    });

    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(
      `Grand Total: ${txn.currency === "NGN" ? "₦" : "$"}${txn.total.toFixed(2)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for shopping with NaijaFlex!", 105, 285, {
      align: "center",
    });

    doc.save(`NaijaFlex_Receipt_${txn.id}.pdf`);
  };

  const clearTransactions = () => {
    localStorage.removeItem("transactions");
    setTransactions([]);
    setFiltered([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
          Transaction History
        </h1>

        {/* Filters + Admin Tools */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            />
          </div>

          {isAdmin && (
            <button
              onClick={clearTransactions}
              className="flex items-center gap-1 text-sm bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Transactions */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No matching transactions.</div>
        ) : (
          <div className="space-y-6">
            {filtered.map((txn) => (
              <div
                key={txn.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Transaction #{txn.id.slice(0, 8)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(txn.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-orange-600">
                      {txn.currency === "NGN" ? "₦" : "$"}
                      {txn.total.toFixed(2)}
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${
                        txn.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <p><strong>By:</strong> {txn.name} ({txn.email})</p>
                  <p><strong>Address:</strong> {txn.address}</p>
                </div>

                <div className="mb-4">
                  <p className="font-medium text-sm text-gray-800 mb-1">Items:</p>
                  <ul className="ml-4 list-disc text-sm text-gray-700">
                    {txn.items.map((item, index) => (
                      <li key={index}>
                        {item.title} × {item.qty}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4 mt-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-orange-500" />
                    <span>{txn.paymentMethod}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{new Date(txn.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="text-right mt-4">
                  <button
                    onClick={() => downloadReceipt(txn)}
                    className="flex items-center gap-2 text-sm bg-orange-100 text-orange-600 px-3 py-1.5 rounded hover:bg-orange-200"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
