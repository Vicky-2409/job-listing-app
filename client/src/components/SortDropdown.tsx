import React from 'react';
import { SortOption } from '../types/job';

interface SortDropdownProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <label htmlFor="sort-by" className="text-sm font-medium">Sort by:</label>
      <select
        id="sort-by"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="relevance">Relevance</option>
      </select>
    </div>
  );
}
