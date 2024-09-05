'use client'

import './searchbar.css'
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
    <div className="searchbar-container">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => {setQuery(e.target.value)}}
          placeholder={placeholder}
          className="search-input"
        />
        <button
          type="submit"
          className="search-submit"
        >
          Search
        </button>
        <button 
          className='search-reset'
          onClick={(e) => { e.preventDefault(); setQuery("")}}
        > Clear </button>
      </form>
    </div>
  );
}
