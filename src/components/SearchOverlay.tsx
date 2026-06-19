import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { getDatabaseState } from '../data/database';

interface SearchResult {
 type: string;
 text: string;
 url: string;
 id: string;
}

declare global {
 interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
 }
}

export function SearchOverlay({ trigger }: { trigger?: React.ReactNode }) {
 const [query, setQuery] = useState('');
 const [results, setResults] = useState<SearchResult[]>([]);
 const [focusedIndex, setFocusedIndex] = useState(-1);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isListening, setIsListening] = useState(false);
 const inputRef = useRef<HTMLInputElement>(null);
 const navigate = useNavigate();
 const { requestLocation } = useSettings();

 const searchIndex = useMemo(() => {
  const { phones, parts } = getDatabaseState();
  const index: SearchResult[] = [];
  
  phones.forEach(phone => {
   index.push({
    type: 'device',
    text: phone.name,
    id: phone.id,
    url: `/device/${phone.id}`
   });
  });

  parts.forEach(part => {
   const phone = phones.find(p => p.id === part.phone_id);
   if (phone) {
    index.push({
     type: 'part',
     text: `${phone.name} ${part.part_name}`,
     id: part.id,
     url: `/device/${phone.id}#category-${part.category_id}`
    });
    index.push({
     type: 'part',
     text: `${phone.name} ${part.category_id.replace('-', ' ')}`,
     id: `${part.id}-cat`,
     url: `/device/${phone.id}#category-${part.category_id}`
    });
   }
  });
  
  return index;
 }, []);

 const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

 useEffect(() => {
  try {
   const stored = localStorage.getItem('recent_searches');
   if (stored) setRecentSearches(JSON.parse(stored));
  } catch {}
 }, []);

 useEffect(() => {
  const handleGlobalKeyDown = (e: KeyboardEvent) => {
   if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    setIsModalOpen(true);
   } else if (e.key === '/' && !isModalOpen && document.activeElement?.tagName !== 'INPUT') {
    e.preventDefault();
    setIsModalOpen(true);
   }
  };
  window.addEventListener('keydown', handleGlobalKeyDown);
  return () => window.removeEventListener('keydown', handleGlobalKeyDown);
 }, [isModalOpen]);

 useEffect(() => {
  if (isModalOpen) {
   setTimeout(() => inputRef.current?.focus(), 100);
  }
 }, [isModalOpen]);

 const startVoiceSearch = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
   alert('Voice search is not supported in this browser.');
   return;
  }
  
  const recognition = new SpeechRecognition();
  recognition.lang = navigator.language || 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
   setIsListening(true);
  };

  recognition.onresult = (event: any) => {
   const transcript = event.results[0][0].transcript;
   setQuery(transcript);
   setIsListening(false);
   inputRef.current?.focus();
  };

  recognition.onerror = (event: any) => {
   console.error('Speech recognition error', event.error);
   setIsListening(false);
  };

  recognition.onend = () => {
   setIsListening(false);
  };

  recognition.start();
 };

 const addRecentSearch = (result: SearchResult) => {
  setRecentSearches(prev => {
   const filtered = prev.filter(p => p.url !== result.url);
   const newRecent = [result, ...filtered].slice(0, 3);
   localStorage.setItem('recent_searches', JSON.stringify(newRecent));
   return newRecent;
  });
 };

 const POPULAR_SEARCHES: SearchResult[] = [
  { type: 'device', text: 'Nothing Phone (2a)', id: 'pop-1', url: '/device/nothing-phone-2a' },
  { type: 'part', text: 'CMF Phone 1 Display', id: 'pop-2', url: '/device/nothing-cmf-phone-1#category-display' },
  { type: 'utility', text: 'Service Centers', id: 'pop-3', url: '/centers' },
 ];

 useEffect(() => {
  if (query.trim()) {
   const q = query.toLowerCase();
   let matchedResults: SearchResult[] = [];
   
   if (q.includes('center') || q.includes('repair') || q.includes('near me') || q.includes('location')) {
    matchedResults.push({
     type: 'utility',
     text: 'Find nearest authorized service centers',
     id: 'utility-centers',
     url: '/centers'
    });
   }

   const standardMatches = searchIndex.filter(item => {
    const terms = q.split(' ');
    return terms.every(term => item.text.toLowerCase().includes(term));
   });
   
   const uniqueMatches = [];
   const seen = new Set();
   for (const match of standardMatches) {
    const key = `${match.type}-${match.url}-${match.text}`;
    if (!seen.has(key)) {
     seen.add(key);
     uniqueMatches.push(match);
    }
   }

   matchedResults = [...matchedResults, ...uniqueMatches];

   setResults(matchedResults.slice(0, 10));
   setFocusedIndex(-1);
  } else {
   setResults([]);
  }
 }, [query, searchIndex]);

 const handleSelect = (result: SearchResult) => {
  addRecentSearch(result);
  setIsModalOpen(false);
  setQuery('');
  if (result.url === '/centers') {
   requestLocation();
  }
  
  if (result.url.includes('#')) {
   const [path, hash] = result.url.split('#');
   navigate(path);
   setTimeout(() => {
    const el = document.getElementById(hash);
    if (el) {
     el.scrollIntoView({ behavior: 'smooth', block: 'center' });
     el.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
     setTimeout(() => {
      el.style.backgroundColor = 'transparent';
      el.style.transition = 'background-color 0.5s ease';
     }, 500);
    }
   }, 300);
  } else {
   navigate(result.url);
  }
 };

 const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
   e.preventDefault();
   setFocusedIndex(prev => prev < results.length - 1 ? prev + 1 : 0);
  } else if (e.key === 'ArrowUp') {
   e.preventDefault();
   setFocusedIndex(prev => prev > 0 ? prev - 1 : results.length - 1);
  } else if (e.key === 'Enter') {
   e.preventDefault();
   if (focusedIndex >= 0 && results.length > 0) {
    handleSelect(results[focusedIndex]);
   } else if (results.length > 0) {
    handleSelect(results[0]);
   }
  } else if (e.key === 'Escape') {
   setIsModalOpen(false);
   inputRef.current?.blur();
  }
 };

 return (
  <>
   {/* Trigger Button */}
   {trigger ? (
    <div onClick={() => setIsModalOpen(true)} className="inline-block">
     {trigger}
    </div>
   ) : (
    <button 
     onClick={() => setIsModalOpen(true)}
     className="w-full py-5 md:py-6 px-6 md:px-8 flex items-center justify-between text-lg font-medium rounded-[2rem] bg-card hover:bg-muted border border-border text-muted-foreground transition-all duration-300 elevation-subtle hover-lift"
    >
     <div className="flex items-center gap-4">
      <Search className="h-6 w-6" />
      <span className="font-light">Search components or devices...</span>
     </div>
     <div className="hidden sm:flex items-center gap-2">
      <span className="px-3 py-1 rounded-full bg-muted/50 text-xs font-mono border border-border tracking-widest uppercase text-foreground">⌘K</span>
     </div>
    </button>
   )}

   {/* Modal Overlay */}
   <AnimatePresence>
    {isModalOpen && (
     <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
      {/* Backdrop */}
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.2 }}
       className="absolute inset-0 bg-background/80 backdrop-blur-md"
       onClick={() => setIsModalOpen(false)}
      />
      
      {/* Modal Content */}
      <motion.div 
       initial={{ opacity: 0, scale: 0.9, y: -20, transformOrigin: 'top right' }}
       animate={{ opacity: 1, scale: 1, y: 0 }}
       exit={{ opacity: 0, scale: 0.95, y: -10 }}
       transition={{ 
         type: "spring",
         damping: 25,
         stiffness: 300
       }}
       className="relative w-full max-w-3xl bg-card border border-border rounded-[2rem] shadow-2xl overflow-hidden elevation-subtle flex flex-col max-h-[80vh]"
      >
       {/* Search Input Area */}
      <div className="relative flex items-center border-b border-border/50 shrink-0">
       <Search className="absolute left-6 md:left-8 h-[1.375rem] w-[1.375rem] text-foreground pointer-events-none" />
       <input 
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        className="w-full py-6 md:py-8 pl-[3.5rem] md:pl-[4.5rem] pr-24 md:pr-32 text-xl md:text-2xl font-display font-medium bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
       />
       <div className="absolute right-6 flex items-center gap-2">
        {query && (
         <button 
          onClick={(e) => { e.preventDefault(); setQuery(''); inputRef.current?.focus(); }}
          className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
         >
          <X className="h-5 w-5" />
         </button>
        )}
        <button 
         onClick={startVoiceSearch}
         title="Voice Search"
         className={`p-2 rounded-full transition-colors hidden sm:block ${isListening ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
        >
         {isListening ? <Mic className="h-5 w-5 animate-pulse text-red-500" /> : <Mic className="h-5 w-5" />}
        </button>
       </div>
      </div>

      {/* Results Area */}
      <div className="overflow-y-auto flex-1">
       <ul className="py-2">
        {query.trim() && results.length > 0 && results.map((item, index) => (
         <li 
          key={item.id}
          className={`px-6 md:px-8 py-4 flex flex-col cursor-pointer transition-colors ${focusedIndex === index ? 'bg-muted' : 'hover:bg-muted'}`}
          onMouseEnter={() => setFocusedIndex(index)}
          onMouseDown={(e) => {
           e.preventDefault();
           handleSelect(item);
          }}
         >
          <span className="font-display font-medium text-foreground text-xl">{item.text}</span>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-2">{item.type}</span>
         </li>
        ))}

        {!query.trim() && (
          <div className="px-6 md:px-8 py-6">
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <h4 className="section-label mb-4 pl-2">Recent Searches</h4>
                <ul className="space-y-1">
                  {recentSearches.map((item, idx) => (
                    <li 
                      key={`recent-${item.id}-${idx}`}
                      className="py-4 hover:bg-muted rounded-xl px-4 cursor-pointer transition-colors flex flex-col -mx-2"
                      onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
                    >
                      <span className="font-display font-medium text-foreground text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h4 className="section-label mb-4 pl-2">Popular</h4>
              <ul className="space-y-1">
                {POPULAR_SEARCHES.map((item, idx) => (
                  <li 
                    key={`pop-${item.id}-${idx}`}
                    className="py-4 hover:bg-muted rounded-xl px-4 cursor-pointer transition-colors flex flex-col -mx-2"
                    onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
                  >
                    <span className="font-display font-medium text-foreground text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {query.trim() && results.length === 0 && (
         <li className="px-6 md:px-8 py-16 flex flex-col items-center justify-center text-center gap-4 text-muted-foreground">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 border border-border">
           <Search className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <div>
           <h3 className="text-2xl font-display font-medium text-foreground mb-2">No Results Found</h3>
           <p className="text-lg font-light">We couldn't find anything matching "{query}".</p>
          </div>
         </li>
        )}
       </ul>
      </div>
     </motion.div>
    </div>
   )}
   </AnimatePresence>
  </>
 );
}

