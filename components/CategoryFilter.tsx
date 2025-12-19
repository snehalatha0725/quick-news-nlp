
import React from 'react';
import { NewsCategory } from '../types';

interface CategoryFilterProps {
  activeCategory: NewsCategory;
  onSelect: (category: NewsCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelect }) => {
  const categories = Object.values(NewsCategory);

  return (
    <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
            activeCategory === cat
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
              : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
