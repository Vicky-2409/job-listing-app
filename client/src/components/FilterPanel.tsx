import React from "react";
import { JobFilters } from "../types/job";

interface FilterPanelProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
}

export default function FilterPanel({
  filters,
  onFilterChange,
}: FilterPanelProps) {
  const employmentTypes = ["Full-time", "Part-time"];
  const experienceLevels = ["Entry level", "Mid-Senior level"];
  const locations = ["Bengaluru", "Chennai", "Hyderabad", "Mumbai", "Delhi"];
  const companies = ["Reliance", "AISemiCon", "Scogo", "Deloitte", "Capgemini"];

  const updateFilter = (key: keyof JobFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="mb-6 p-5 bg-white rounded-lg shadow-sm">
      <h3 className="font-medium mb-4 text-lg text-gray-900">Filters</h3>

      {/* Employment Type */}
      <div className="mb-5">
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Employment Type
        </h4>
        <div className="space-y-2">
          {employmentTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="employment_type"
                checked={filters.employment_type === type}
                onChange={() => updateFilter("employment_type", type)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-5">
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Experience Level
        </h4>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="experience"
                checked={filters.experience === level}
                onChange={() => updateFilter("experience", level)}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Location</h4>
        <select
          className="w-full p-1 border rounded text-sm"
          value={filters.location || ""}
          onChange={(e) => updateFilter("location", e.target.value)}
        >
          <option value="">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Company */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Company</h4>
        <select
          className="w-full p-1 border rounded text-sm"
          value={filters.company || ""}
          onChange={(e) => updateFilter("company", e.target.value)}
        >
          <option value="">All</option>
          {companies.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Button */}
      <button
        className="mt-4 px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
        onClick={() => onFilterChange({"company": "", "location":"", "experience":"", "employment_type":""})}
      >
        Clear All
      </button>
    </div>
  );
}
