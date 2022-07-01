import React from "react";
import "./styles.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import { useEffect } from "react";
function ImageGallery() {
  const [isOpen, setIsopen] = useState(false);
  const [image,setImage] = useState('')
  const arr = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/1181329/pexels-photo-1181329.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/261895/pexels-photo-261895.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/92331/pexels-photo-92331.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/4492126/pexels-photo-4492126.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/3153199/pexels-photo-3153199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/3755707/pexels-photo-3755707.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/1326947/pexels-photo-1326947.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];
  
  const setData = (img) =>{
    setIsopen(!isOpen)
    setImage(img)
  }
  return (
    <div className="image-container body-container">
      <div className="image-main-title">
        <h2>IMAGE GALLERY SIMPLE CODE</h2>
      </div>
      <div className="image-gallery">
        <div
          className="image-gallery-item"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {arr.map((e, index) => {
            return (
              <div className="image-item-content" style={{ width: "25%" }} key={index} onClick={() => setData(e.img)}>
                <figure className="image-gs2">
                  <a className="hover_effect h_lightbox h_blue">
                    <img
                      src={e?.img}
                      className="img-responsive"
                      alt="Image"
                    />
                  </a>
                </figure>
              </div>
            );
          })}

        </div>
        <Popup open={isOpen} position="right center">
          <div  onClick={()=>setIsopen(!setIsopen)}>
            <img src={image} />
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default ImageGallery;
