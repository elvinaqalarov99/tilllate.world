import React, { useEffect, useState } from "react";
import Image from "./Image";
import "./App.css";
import axios from "./axios";
function App() {
  // A state variable for managing the images array variable
  const [images, setImage] = useState([]);
  const [maxLength, setLength] = useState(10);
  const [counter, setCounter] = useState(0);
  const [button, setButton] = useState("Load More");
  //Get the iamges from the api when the component renders once
  //once because we are using an empty array as a second argument

  useEffect(() => {
    //asynchronously get the iamges from the api using axios for making requests
    //async function is basically returning the promise and await is returning the resolved result
    //from the result after the resolve is ready (using await)
    const getImages = async () => {
      const response = await axios.get("/photos");
      //axios is returning the object with data, status and so on
      //The one we are interested in is data(the array of the result)
      //filter the response.data array to showing only even id albums
      setImage(response.data.filter((data) => data.albumId % 2 == 0));

      //return a response beccause every async function should return a promise
      return response;
    };
    getImages();
  }, []);

  // create a new array for storing only 1 image per album
  let newArr = [];
  let c = 0; // will increase by 50, because each album has 50 images and hence the next album will start exactly after the 50th image
  for (let i = 0; i <= images.length; i++) {
    // check if the loop has reached to 0,50,100th... image . If yes, push it to the new array and then increase by 50
    if (i == c) {
      newArr.push(images[i]);
      c += 50;
    }
  }
  newArr.pop(); // to get rid of the last undefined. We have it because the image's index is starting with 0 index, but its own id is from 1
  console.log(newArr);
  const showMore = (e) => {
    // max of 54 images in gallery
    if (maxLength < 50) setLength((prevValue) => prevValue + 10);
    else {
      setButton("No More Data"); //Load no data anymore
    }
  };
  //Using the BEM conversion for the naming
  return (
    <div className="app">
      <div className="app__body">
        <div className="row">
          {newArr.slice(0, maxLength).map((image) => (
            //important to have unique keys for repeated components (will render only the component which changed, leaving another ones unreloaded again )
            <Image key={image.id} url={image.url} title={image.title} />
          ))}
        </div>
        <div className="app__showMore">
          <button onClick={showMore}>{button}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
