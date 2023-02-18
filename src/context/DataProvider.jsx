import React, { useState, createContext } from "react";
import { client } from "../pexels";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [Data, setData] = useState({});
  const [Query, setQuery] = useState("");
  const [Loading, setLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(50);

  const handleImageLoad = () => {
    setImagesLoaded((prevLoaded) => prevLoaded + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setImagesLoaded(0);
    if (Query) {
      setLoading(true);
      client.photos
        .search({ query: Query, page: 1, per_page: 50 })
        .then((photos) => {
          setData(...[photos]);
          setLoading(false);
        });
    } else {
      setData({});
    }
  };

  return (
    <DataContext.Provider
      value={{
        handleSearch,
        Data,
        Loading,
        Query,
        setQuery,
        imagesLoaded,
        setImagesLoaded,
        totalImages,
        setTotalImages,
        handleImageLoad,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
