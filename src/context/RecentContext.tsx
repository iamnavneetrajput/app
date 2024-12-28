// src/context/RecentContext.tsx
import React, { createContext, useContext, useState } from 'react';

type RecentContextType = {
  recentPosts: any[];
  addRecentPost: (post: any) => void;
};

const RecentContext = createContext<RecentContextType | undefined>(undefined);

export const RecentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  const addRecentPost = (post: any) => {
    setRecentPosts((prev) => {
      const exists = prev.find((p) => p.id === post.id);
      if (exists) return prev; // Avoid duplicates
      return [post, ...prev].slice(0, 10); // Keep the most recent 10
    });
  };

  return (
    <RecentContext.Provider value={{ recentPosts, addRecentPost }}>
      {children}
    </RecentContext.Provider>
  );
};

export const useRecent = () => {
  const context = useContext(RecentContext);
  if (!context) throw new Error('useRecent must be used within a RecentProvider');
  return context;
};
