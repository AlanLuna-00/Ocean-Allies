"use client";
import React from "react";
import { CloudinaryContext as OriginalCloudinaryContext } from "cloudinary-react";

const CloudinaryContext = React.createContext(null);

export const CloudinaryProvider = ({ cloudName, children }) => {
  return (
    <CloudinaryContext.Provider value={cloudName}>
      {children}
    </CloudinaryContext.Provider>
  );
};

export const useCloudinaryContext = () => {
  return React.useContext(CloudinaryContext);
};

export { OriginalCloudinaryContext };
