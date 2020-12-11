import React from "react";
import "./Image.css";
function Image({ url, title }) {
  const clickedImage = (e) => {
    window.open(url);
  };

  //Using the BEM conversion for the namings
  return (
    <div
      className="image col-sm-12 col-md-6 col-lg-4"
      style={{ backgroundImage: `url(${url})` }}
      onClick={clickedImage}
    >
      <div className="overlay"></div>
      <div className="description">{title}</div>
    </div>
  );
}

export default Image;
