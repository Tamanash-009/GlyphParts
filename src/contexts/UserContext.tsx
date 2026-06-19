import React, { createContext, useContext, useEffect, useState } from 'react';
import { Phone, getDatabaseState } from '../data/database';

interface UserContextType {
  savedDevices: string[];
  recentlyViewed: string[];
  comparisonDevices: string[];
  theme: 'light' | 'dark';
  addSavedDevice: (id: string) => void;
  removeSavedDevice: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  setComparisonDevices: (ids: string[]) => void;
  toggleComparisonDevice: (id: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  isSaved: (id: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [savedDevices, setSavedDevices] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [comparisonDevices, setComparisonDevicesState] = useState<string[]>([]);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedDevices');
      if (saved) setSavedDevices(JSON.parse(saved));
      
      const recent = localStorage.getItem('recentlyViewed');
      if (recent) setRecentlyViewed(JSON.parse(recent));

      const comp = localStorage.getItem('comparisonDevices');
      if (comp) setComparisonDevicesState(JSON.parse(comp));

      const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (storedTheme) {
        setThemeState(storedTheme);
      } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeState('dark');
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('savedDevices', JSON.stringify(savedDevices));
  }, [savedDevices]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const setComparisonDevices = (ids: string[]) => {
    setComparisonDevicesState(ids);
    localStorage.setItem('comparisonDevices', JSON.stringify(ids));
  };

  const toggleComparisonDevice = (id: string) => {
    setComparisonDevicesState(prev => {
      const next = prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id];
      localStorage.setItem('comparisonDevices', JSON.stringify(next));
      return next;
    });
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.body.style.backgroundColor = newTheme === 'dark' ? '#000000' : '#FAFAFA';
    document.body.style.color = newTheme === 'dark' ? '#ffffff' : '#2A2A2A';
  };

  const addSavedDevice = (id: string) => {
    setSavedDevices(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeSavedDevice = (id: string) => {
    setSavedDevices(prev => prev.filter(deviceId => deviceId !== id));
  };

  const isSaved = (id: string) => savedDevices.includes(id);

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(deviceId => deviceId !== id);
      const newRecent = [id, ...filtered].slice(0, 10); // Keep max 10
      return newRecent;
    });
  };

  return (
    <UserContext.Provider value={{ 
      savedDevices, recentlyViewed, comparisonDevices, theme, 
      addSavedDevice, removeSavedDevice, addRecentlyViewed, 
      setComparisonDevices, toggleComparisonDevice, setTheme, isSaved 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
