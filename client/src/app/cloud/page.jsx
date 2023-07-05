"use client";
import React, { useState } from "react";
import axios from "axios";

function Page() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        "https://ocean-allies-production.up.railway.app/api/products",
        formData
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
}

export default Page;
