"use client";

import React, { createContext, useContext, useState } from "react";

interface BookContextType {
  selectedBook: IBook | null;
  setSelectedBook: (book: IBook | null) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used inside BookProvider");
  }
  return context;
};
