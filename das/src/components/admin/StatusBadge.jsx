import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "Pending",
          icon: "🟡",
        };
      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Approved",
          icon: "🟢",
        };
      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Rejected",
          icon: "🔴",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          label: "Unknown",
          icon: "⚪",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 ${config.bg} ${config.text} text-xs font-semibold rounded-full`}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
