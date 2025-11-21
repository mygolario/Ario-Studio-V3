"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const filters = [
  { id: "all", label: "همه" },
  { id: "Landing Page", label: "لندینگ پیج" },
  { id: "Website", label: "سایت کامل" },
  { id: "SaaS", label: "SaaS" },
  { id: "E-commerce", label: "فروشگاه" },
];

interface PortfolioFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function PortfolioFilters({
  activeFilter,
  onFilterChange,
}: PortfolioFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? "bg-brand-500 text-white"
              : "glass border border-slate-700 text-slate-300 hover:border-slate-600"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

