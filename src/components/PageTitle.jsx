import React from "react";

export default function PageTitle({ title, subtitle }) {
  return (
    <div className="text-center py-6 bg-[#E6F4EA] rounded-lg shadow-sm mb-6">
      <h1 className="text-3xl font-bold text-[#0B6623]">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
