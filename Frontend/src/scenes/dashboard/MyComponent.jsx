import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageDisplay() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/image', {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error(error);
      }
    }
    fetchImage();
  }, []);

  return (
    <div>
      <img src={imageUrl} alt="Image" crossOrigin="anonymous" />

      {/* {imageUrl ? <img src={imageUrl} alt="Image" /> : <p>Loading...</p>} */}
    </div>
  );
}

export default ImageDisplay;