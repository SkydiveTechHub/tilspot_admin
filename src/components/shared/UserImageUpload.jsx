import React, { useRef, useState } from 'react';

const UserImageUpload = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize) {
        setError("File size exceeds 2MB");
        return;
      }

      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onImageUpload(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        style={{ display: 'none' }} 
      />
        <button onClick={handleButtonClick} className='rounded-md px-6 py-2 bg-transparent border font-mont border-primary text-primary font-semibold flex '>
          Upload Image
        </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};

export default UserImageUpload;
