export const addToLocalStorage = (likedImages, userName) => {
  localStorage.setItem(`likedImages${userName}`, JSON.stringify(likedImages));
  console.log("image liked");
};

export const checkLocalStorage = (userName) => {
  let likedImages = localStorage.getItem(`likedImages${userName}`);
  likedImages = JSON.parse(likedImages);
  if (!likedImages) return false;
  return true;
};

export const getlikedImages = (userName) => {
  let likedImages = localStorage.getItem(`likedImages${userName}`);
  likedImages = JSON.parse(likedImages);
  return likedImages;
};

export const likeImageURL = (url, userName) => {
  let likedImages = localStorage.getItem(`likedImages${userName}`);
  likedImages = JSON.parse(likedImages);
  console.log("url", url);
  if (Array.isArray(likedImages)) {
    likedImages.push(url);
  } else {
    likedImages = [url];
  }
  localStorage.setItem(`likedImages${userName}`, JSON.stringify(likedImages));
};
