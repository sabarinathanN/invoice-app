import React, { ChangeEvent, useState, useEffect } from "react";
import Input from "./Input";

interface SingleImageUploadProps {
  label: string;
  name: string;
  image: File | null;
  onChange: (file: File | null) => void;
  onDeleteImage: () => void;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  label,
  name,
  image,
  onChange,
  onDeleteImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(image);

  useEffect(() => {
    setSelectedImage(image);
  }, [image]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = e.target.files[0];
      setSelectedImage(newImage);
      onChange(newImage);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
    onDeleteImage();
  };

  return (
    <div className="mb-6">
      <label htmlFor="businessImage" className="mb-2 block font-semibold">
        {label}
      </label>
      <input
        type="file"
        id="businessImage"
        name={name}
        onChange={handleFileChange}
        className="border-gray-300 w-full rounded border px-3 py-2 focus:border-primary focus:outline-none"
      />
      {selectedImage && (
        <div className="border-gray-900 my-2 flex items-center rounded-lg border bg-gray-200 p-2">
          <p className="mr-2">{selectedImage.name}</p>
          <div
            className="hover:cursor-pointer text-black"
            onClick={deleteImage}
          >
            &#x2715;
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
