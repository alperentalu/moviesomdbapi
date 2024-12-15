import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface MovieContextType {
  imdbID: string | null;
  setImdbID: (id: string | null) => void;
}

// Create Context with default value
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Custom Hook for easy access to context
export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

// Provider Component
interface MovieProviderProps {
  children: ReactNode; // ReactNode to allow any valid React child
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [imdbID, setImdbID] = useState<string | null>(null);

  return (
    <MovieContext.Provider value={{ imdbID, setImdbID }}>
      {children}
    </MovieContext.Provider>
  );
};
