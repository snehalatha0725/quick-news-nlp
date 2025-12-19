
import React, { useState, useEffect, useCallback } from 'react';
import { NewsCategory, NewsArticle, NewsState, LANGUAGES, REGIONS, Language, Region } from './types';
import { fetchNewsByCategory } from './services/geminiService';
import NewsCard from './components/NewsCard';
import CategoryFilter from './components/CategoryFilter';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>(NewsCategory.GENERAL);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);
  
  const [state, setState] = useState<NewsState>({
    articles: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const loadNews = useCallback(async (category: NewsCategory, lang: Language, reg: Region) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const news = await fetchNewsByCategory(category, lang, reg);
      setState({
        articles: news,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Unable to fetch the latest news. Please try again later.' 
      }));
    }
  }, []);

  useEffect(() => {
    loadNews(activeCategory, selectedLanguage, selectedRegion);
  }, [activeCategory, selectedLanguage, selectedRegion, loadNews]);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">60</div>
                Daily News <span className="text-blue-600">in 60s</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium">India Focus • {selectedRegion.name} • {selectedLanguage.name}</p>
            </div>
            
            <div className="flex items-center gap-2">
               <button 
                  onClick={() => loadNews(activeCategory, selectedLanguage, selectedRegion)}
                  className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 border border-transparent hover:border-slate-200"
                  title="Refresh News"
                  disabled={state.loading}
               >
                 <svg className={`w-5 h-5 ${state.loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                 </svg>
               </button>
               <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
               <div className="text-right">
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Last Sync</div>
                 <div className="text-xs text-slate-600 font-bold">
                   {state.lastUpdated ? state.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                 </div>
               </div>
            </div>
          </div>

          {/* Preferences Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Region</label>
              <select 
                value={selectedRegion.code}
                onChange={(e) => setSelectedRegion(REGIONS.find(r => r.code === e.target.value) || REGIONS[0])}
                className="text-xs font-semibold bg-slate-100 border-none rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                {REGIONS.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language</label>
              <select 
                value={selectedLanguage.code}
                onChange={(e) => setSelectedLanguage(LANGUAGES.find(l => l.code === e.target.value) || LANGUAGES[0])}
                className="text-xs font-semibold bg-slate-100 border-none rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />

        {state.loading ? (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Analyzing latest headlines in {selectedLanguage.name}...
              </div>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse">
                <div className="flex justify-between mb-4">
                   <div className="h-4 bg-slate-100 rounded w-20"></div>
                   <div className="h-4 bg-slate-100 rounded w-24"></div>
                </div>
                <div className="h-8 bg-slate-100 rounded w-3/4 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-3 bg-slate-100 rounded w-full"></div>
                  <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                  <div className="h-3 bg-slate-100 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        ) : state.error ? (
          <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-slate-600 mb-6 max-w-sm mx-auto">{state.error}</p>
            <button 
              onClick={() => loadNews(activeCategory, selectedLanguage, selectedRegion)}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Retry Connection
            </button>
          </div>
        ) : state.articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="text-slate-300 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 4v4h4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h8m-8 4h5" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium">No major news found for {activeCategory} in {selectedRegion.name} right now.</p>
            <button 
              onClick={() => setActiveCategory(NewsCategory.GENERAL)}
              className="mt-4 text-blue-600 text-sm font-bold hover:underline"
            >
              Go to General News
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{activeCategory} Highlights</h2>
              <span className="text-xs text-slate-400">{state.articles.length} stories found</span>
            </div>
            {state.articles.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-20 py-12 border-t border-slate-200 text-center px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-900 font-bold mb-1">Daily News in 60s</p>
          <p className="text-slate-400 text-sm mb-6">
            An NLP-based project using Gemini AI to summarize Indian regional and national headlines.
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900">{LANGUAGES.length}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Indian Languages</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900">{REGIONS.length}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Indian Cities</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900">5+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Categories</div>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-xs font-medium">Academic Project</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-xs font-medium">Powered by Gemini 3</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
