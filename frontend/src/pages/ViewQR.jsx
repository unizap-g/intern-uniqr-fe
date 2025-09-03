import React, { useState, useEffect } from "react";
import axios from "axios";
import QrDetails from "../components/QrDetails";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DeleteQrModal from "../components/DeleteQrModal";

const ViewQR = () => {
  const [qrData, setQrData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  
  const filteredData =
    qrData?.filter((qr) => {
      const name = (qr.qrName || "").toLowerCase().trim();
      const term = (search || "").toLowerCase().trim();
      return name.includes(term);
    }) || [];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleDelete = async (qrId) => {
    try{
      const res = await axios.delete(`http://10.1.3.91:1031/mock/5/api/qrcode/${qrId}`);
      if(res.status === 200 || res.status === 204){
        setQrData((prev) => prev.filter((qr) => qr.id !== qrId));
      }
    }catch(err){
      console.error("Error deleting QR code:", err);
    }
  }

  const confirmDelete = () => {
    if(deleteId){
    handleDelete(deleteId);
    setDeleteId(null);
    }
  };

  const handleDuplicate = async (qr) => {
    try{
      const newQrData = {
        ...qr,
        qrName: `Copy of ${qr.qrName}`,
      };
      const res = await axios.post("http:////10.1.3.91:1031/mock/5/api/qrcode", newQrData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(res.data){
        setQrData((prev) => [...prev, res.data]);
      }
    }catch(err){
      console.error("Error duplicating QR code:", err);
    }
  }



  useEffect(() => {
    const fetchQrData = async () => {
      try {
        const res = await axios.get(
          "http://10.1.3.91:1031/mock/5/api/qrcode?env=dev"
        );
        if (res.data && res.data.data) {
          setQrData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching QR data:", error);
      }
    };

    fetchQrData();
  }, []);

  return (
    <div className="flex flex-col w-full bg-blue-100">
      {/* Main content */}
      <div className="flex flex-row w-full">
        {/* Sidebar */}
        <Sidebar className="w-1/5" />

        <div className="w-4/5 flex flex-col py-4 px-6 gap-6">
          <Navbar title="My QR Codes" />

          {/* Search and button */}
          <div className="flex justify-between items-center">
            <div className="relative w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search QR code name"
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full bg-white"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <button className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600">
              Create QR Code
            </button>
          </div>

          {/* White Box */}
          <div className="bg-white rounded-lg shadow-md w-full max-w-5xl h-full self-center">
            {/* Header */}

            <div className="overflow-x-auto">
              <div className={rowsPerPage >= 10 ? "max-h-[420px] overflow-y-auto" : ""}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 py-3 text-left font-semibold">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Details</span>
                        </div>
                      </th>
                      <th className="px-2 py-3 text-left font-semibold">Link</th>
                      <th className="px-2 py-3 text-left font-semibold">Scan</th>
                      <th className="px-2 py-3 text-left font-semibold">Status</th>
                      <th className="px-2 py-3 text-left font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((qr) => (
                      <QrDetails key={qr.id} qr={qr} onDuplicate={handleDuplicate}
                      onDelete = {(id) => setDeleteId(id)} />
                    ))}
                  </tbody>
                </table>

                <DeleteQrModal
                  isOpen={!!deleteId}
                  title="Delete QR Code"
                  message="Are you sure you want to delete this QR code?"
                  onConfirm={confirmDelete}
                  onCancel={() => setDeleteId(null)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 p-2 border-t border-gray-300 text-sm text-gray-600">
              <div>
                Row per page
                <select
                  className="border rounded px-2 py-1 ml-2"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  Page {page} of {totalPages || 1}
                </span>
                <button
                  className="px-2"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  &lt;
                </button>
                <button
                  className="px-2"
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQR;
