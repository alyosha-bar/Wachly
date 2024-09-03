'use client'

// components/SearchBar.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ placeholder = "Search for a Youtube video you recently watched ... ", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
    setQuery("")
  };

  return (
    <div className="flex items-center w-4/6 mx-auto mt-5">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => {setQuery(e.target.value)}}
          placeholder={placeholder}
          className="text-indigo-500 w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </form>
    </div>
  );
}
