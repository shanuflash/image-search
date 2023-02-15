import { useState, useMemo } from "react";
// import { createClient } from "pexels";
import { client } from "./pexels";
import "./App.css";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

import { GoSearch } from "react-icons/go";

function App() {
  const [Data, setData] = useState({});
  const [Query, setQuery] = useState(null);
  const [Loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    client.photos
      .search({ query: Query, page: 1, per_page: 50 })
      .then((photos) => {
        setData(...[photos]);
        setLoading(false);
      });
  };

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
          <div>
            {Loading ? (
              <div className="loading">
                <UseAnimations animation={loading2} size={100} />
                Loading...
              </div>
            ) : (
              <>
                {Data.photos?.map((image) => (
                  <img
                    className="image"
                    src={image.src.small}
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
