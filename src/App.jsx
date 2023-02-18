import { useState, useContext } from "react";
import "./App.css";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import { GoSearch } from "react-icons/go";
import { DataContext } from "./context/DataProvider";

function App() {
  const { handleSearch, Data, Loading, Query, setQuery } =
    useContext(DataContext);

  return (
    <div className="App">
      <div className="head">
        <div className="title">Image Search</div>
        <form className="form" onSubmit={handleSearch}>
          <input
            className="input"
            placeholder="Type here"
            value={Query}
            onChange={(e) => setQuery((prev) => e.target.value)}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="sep" />
      <div className="image-container">
        {Object.keys(Data).length ? (
          <div className="images">
            {Loading ? (
              <div className="loading">
                <UseAnimations animation={loading2} size={100} />
                Loading...
              </div>
            ) : (
              <>
                {Data.photos?.map((image, i) => (
                  <img
                    className="image"
                    loading="lazy"
                    src={image.src.small}
                    // height="100px"
                    // width="150vw"
                    key={image.id}
                    title={image.alt}
                    alt={image.alt}
                  />
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="loading">
            <GoSearch style={{ fontSize: "5vw" }} />
            Search to find images!
          </div>
        )}
      </div>
      <div className="sep" />
      <div className="credits">Photos provided by Pexels™</div>
    </div>
  );
}

export default App;
