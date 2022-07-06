import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeImageURL } from "../storage/storeImages";
import Backdrop from "./Backdrop";
import AppContext from "../store/AppContext";
import Modal from "../components/modal";

export default function Image({
  image,
  handleRemove,
  index,
  description,
  createdAt,
  imageId,
  imageLarge,
}) {
  const [, user, , likedImages, setLikedImages] = useContext(AppContext);
  const userName = user.email
    ? user.email.substring(0, user.email.indexOf("@"))
    : null;
  const date = createdAt ? createdAt.split("T") : null; // only get the date and cut out the time
  const imageRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const inUser = location.pathname === "/user";
  const isLiked = Array.isArray(likedImages) && likedImages?.includes(image);
  console.log("likedImages", likedImages);

  const handleLike = () => {
    setLikedImages([...(Array.isArray(likedImages) ? likedImages : []), image]);
    likeImageURL(image, userName, true);
  };

  return (
    <div>
      <div className="relative">
        {!inUser && !isLiked && (
          <i
            className="fa fas fa-thumbs-up	absolute right-2 cursor-pointer mt-2 mr-2 hidden"
            onClick={handleLike}
          ></i>
        )}
        {isLiked && (
          <i
            className="fa fas fa-thumbs-down	absolute right-2 cursor-pointer mt-2 mr-2 hidden"
            onClick={() => handleRemove(image)}
          ></i>
        )}

        <img
          ref={imageRef}
          className="object-cover h-48 w-96"
          onClick={() => setShowPreview(true)}
          src={image}
          alt=""
          width="100%"
          height="auto"
          crossOrigin="anonymous"
        />
      </div>

      <AnimatePresence>
        {showPreview && (
          <Backdrop onClick={() => setShowPreview(false)}>
            <Modal
              imageId={imageId}
              text={description}
              type="result"
              data={date}
              url={imageLarge ? imageLarge : image}
            />
          </Backdrop>
        )}
      </AnimatePresence>
    </div>
  );
}
