import React, { useState, useEffect } from "react";
import {
  Share2,
  Download,
  Copy,
  EllipsisVertical,
  Pencil,
  Printer,
  Trash,
  EyeOff,
  Eye,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useOverLayers from "../../hooks/useOverLayers";

const QrDetails = ({ qr, onDuplicate, onDelete }) => {
  const navigate = useNavigate();

  const {setEditedData} = useOverLayers();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(qr.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // console.log("QR Details Component Rendered with QR:", qr);
  useEffect(() => {
    setStatus(qr.status);
  }, [qr.status]);

  const createdDate = new Date(qr.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const handleCopy = () => {
    if (!qr?.basicInfo[0].website) return;
    navigator.clipboard.writeText(qr.basicInfo[0].website);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((open) => !open);
  };

  // Close dropdown when clicking anywhere else
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [dropdownOpen]);

  const toggleStatus = async () => {
    const prev = status;
    const newStatus = prev === "active" ? "inactive" : "active";
    setStatus(newStatus);
    setDropdownOpen(false);
    try {
      const res = await fetch(
        `http://10.1.3.91:1031/mock/5/api/qrcode/${qr.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      setStatus(prev);
      console.error("Failed to update status:", err);
    }
  };

  const handlePrint = () => {
    const qrUrl = qr.qrImageUrl || "QR_code_for_mobile_English_Wikipedia.svg";

    const printWindow = window.open("", "_blank", "width=500,height=500");
    printWindow.document.write(`
      <html>
      <head>
        <title>Print QR</title>
      </head>
      <body style="text-align: center;margin: 50px;">
        <img src="data:image/png;base64,${qrUrl}" alt="QR Code" style="max-width: 100%; height: auto;" />
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const editQr = () => {
    navigate('/dashboard/qrdetails/editQr');
    setEditedData(qr);
    setDropdownOpen(false);
  };
  return (
    <tr className="border-b border-gray-300 text-sm relative">
      {/* Details */}
      <td className="px-2 py-3">
        <div className="flex items-center gap-3">
          <input type="checkbox" />
          <img
            src={`data:image/png;base64,${qr.qrImageUrl}`}
            alt="QR code"
            className="w-18 h-18"
          />
          <div>
            <p className="font-semibold text-xs text-orange-400">{qr.qrType}</p>
            <p className="text-gray-500">{qr.qrName}</p>
            <p className="text-xs text-gray-400">Created: {createdDate}</p>
          </div>
        </div>
      </td>

      {/* Link */}
      <td className="px-2 py-3 text-black font-semibold text-xs truncate">
        <div className="flex items-center gap-3 relative">
          {qr?.basicInfo[0].website
          ? qr.basicInfo[0].website.length > 20
              ? `${qr.basicInfo[0].website.slice(0, 20)}...`
              : qr.basicInfo[0].website
            : ""}
          <Copy
            className="w-4 h-4 text-blue-700 hover:text-blue-600 cursor-pointer"
            onClick={handleCopy}
          />
          {copied && (
            <span className="absolute -top-7 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow z-20">
              Copied!
            </span>
          )}
        </div>
      </td>

      {/* Scan */}
      <td className="px-2 py-3 w-16 text-xs">{qr.scan || 10}</td>

      {/* Status */}
      <td className="px-2 py-3 w-16">
        <span
          className={`px-3 py-1 rounded-full text-xs capitalize ${
            status === "active"
              ? "bg-green-100 text-green-600"
              : status === "expired"
              ? "bg-red-100 text-red-600"
              : status === "inactive"
              ? "bg-gray-300 text-gray-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-2 py-3 relative">
        <div className="flex items-center gap-2 justify-center">
          <button className="border px-4 py-1 rounded-2xl text-blue-500 hover:bg-blue-50 flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="border px-4 py-1 rounded-2xl text-blue-500 hover:bg-blue-50 flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            className="border border-gray-300 mr-1 px-1 py-1 rounded-2xl text-black hover:bg-gray-50 flex items-center gap-1 relative"
            onClick={handleDropdown}
          >
            <EllipsisVertical className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-10 left-40 top-18 z-10 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col min-w-[140px] py-3">
              <button
                onClick={editQr}
                className="px-6 py-2 text-left hover:bg-gray-100 cursor-pointer"
              >
                <Pencil className="w-4 h-4 inline-block mr-3 text-gray-500" />
                Edit
              </button>

              <button
                className="px-6 py-2 text-left hover:bg-gray-100 cursor-pointer"
                onClick={() => onDuplicate(qr)}
              >
                <Copy className="w-4 h-4 inline-block mr-3 text-gray-500" />
                Duplicate
              </button>

              <button
                className="px-6 py-2 text-left hover:bg-gray-100 cursor-pointer"
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4 inline-block mr-3 text-gray-500" />
                Print
              </button>

              <button
                className="px-6 py-2 text-left hover:bg-gray-100 cursor-pointer"
                onClick={toggleStatus}
              >
                {status === "active" ? (
                  <>
                    <EyeOff className="w-4 h-4 inline-block mr-3 text-gray-500" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 inline-block mr-3 text-gray-500" />
                    Activate
                  </>
                )}
              </button>

              <button
                className="px-6 py-2 text-left hover:bg-gray-100 cursor-pointer"
                onClick={() => onDelete(qr._id)}
              >
                <Trash className="w-4 h-4 inline-block mr-3 text-gray-500" />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default QrDetails;
