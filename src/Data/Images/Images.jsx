import React, { createContext, useContext, useState } from 'react';
import { storage, ref, getDownloadURL, uploadBytes } from '../../Firebase/firebase.js';

const ImageContext = createContext();

export const useImage = () => useContext(ImageContext);

export function ImageProvider({ children }){
  const [images, setImages] = useState([]);

  async function uploadImage(file, path) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImages((prevImages) => [...prevImages, { path, url }]);
    return url;
  };

  async function fetchImageURL(path) {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  return (
    <ImageContext.Provider value={{ images, uploadImage, fetchImageURL }}>
      {children}
    </ImageContext.Provider>
  );
};