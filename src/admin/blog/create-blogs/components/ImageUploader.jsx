import React, { useState, useRef } from "react";
import { uploadToCloudinary } from "../utils/cloudinary";

export const ImageUploader = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Click or drag to upload an image",
  className = "" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setError("");

    try {
      const url = await uploadToCloudinary(file, "image", (pct) => setProgress(pct));
      onChange(url);
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (e) => {
    handleUpload(e.target.files?.[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files?.[0]);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      
      <div
        className={`relative w-full rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging 
            ? "border-[#6C141E] bg-[#6C141E]/10" 
            : error 
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="w-full space-y-2 flex flex-col items-center justify-center py-2">
            <span className="w-6 h-6 border-2 border-[#6C141E] border-t-transparent rounded-full animate-spin"></span>
            <div className="w-full max-w-[200px] h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-[#6C141E] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs font-bold text-neutral-600">{progress}% Uploading...</p>
          </div>
        ) : value ? (
          <div className="w-full h-full relative group min-h-[120px]">
            <img 
              src={value} 
              alt="Uploaded Preview" 
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold bg-black/40 px-3 py-1.5 rounded-full">
                Change Image
              </span>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-sm font-medium text-neutral-600">{placeholder}</p>
            <p className="text-[10px] text-neutral-400 mt-1 uppercase font-bold tracking-wider">
              Supports JPEG, PNG, WEBP
            </p>
          </div>
        )}
      </div>
      
      {error && <p className="mt-2 text-xs font-bold text-red-600">{error}</p>}
    </div>
  );
};
