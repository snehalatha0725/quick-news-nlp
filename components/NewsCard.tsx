
import React from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Negative': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-200 group">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getSentimentColor(article.sentiment)}`}>
          {article.sentiment}
        </span>
        <span className="text-xs text-slate-400 font-medium">
          {article.source} • {article.timestamp}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>
      
      <ul className="space-y-3 mb-6">
        {article.summary.map((point, idx) => (
          <li key={idx} className="flex items-start text-slate-600 text-sm leading-relaxed">
            <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
            {point}
          </li>
        ))}
      </ul>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 group/link"
        >
          Read full article
          <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
