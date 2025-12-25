import React, { useState } from "react";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Images from "./images";
import {
  Fullscreen,
  Download,
  Counter,
  Thumbnails,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";

const Search = () => {
  const [imageName, setImageName] = useState("");
  const [loading, setloading] = useState(false);
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const searchImage = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await axios.get(
      `https://api.pexels.com/v1/search?query=${imageName}`,
      {
        headers: {
          Authorization:
            "7Apd550PTThB0hiWvn4qWvfx3EUYmyds5AwoInxRMbHCjYo9H8DxJM4I",
        },
      }
    );
    setloading(false);
    setPhotos(res.data.photos);
    console.log(photos);
  };

  return (
    <>
      <form onSubmit={searchImage}>
        <div className="form-group">
          <input
            type="text"
            value={imageName}
            className="form-control"
            onChange={(e) => setImageName(e.target.value)}
            placeholder="Search image"
          />
        </div>
        <div className="form-group mt-4">
          <input
            type="submit"
            value={"Search Image"}
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
      <div className="row mt-4">
        {!loading ? (
          photos.map((img, index) => (
            <Images
              image={img}
              key={img.id}
              onClick={() => setIndex(index)}
            ></Images>
          ))
        ) : (
          <h1>Loading</h1>
        )}
        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={photos.map((img) => ({
            src: img.src.large,
          }))}
          plugins={[Counter, Download, Fullscreen, Zoom, Thumbnails]}
          counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        />
      </div>
    </>
  );
};

export default Search;
