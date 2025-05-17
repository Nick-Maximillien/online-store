"use client"
import React, { useState, useContext } from "react";
import { useAuth } from "context/AuthContext";
import { error } from "console";

const UploadImages = () => {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const { token } = useAuth();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(files);
        
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviews(previews);
    };

    const handleUpload = async () => {
        setUploading(true);
        const resultsArr = [];

        for (const image in images) {
            const formData = new FormData();
            formData.append('image', image);

            try {
                const res = await fetch('http://localhost:8000/upload-images', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                const data = await res.json();
                resultsArr.push({ image: image.name, ...data });
            } catch (err) {
                resultsArr.push({ image: image.name, error: 'Upload failed' })
            }
        }
        setResults(resultsArr);
        setUploading(false)
    };

    return (
        <div>
            <h2>Upload Images for Analysis</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div>
                {previews.map((src, index) => (
                    <img
                       key={index} 
                       src={src}
                       alt={`preview-${index}`}
                       width="100"
                    />
                ))}
            </div>
            <button onClick={handleUpload} disabled={uploading || images.length === 0}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <div>
                {results.map((res, idx) => (
                    <div key={idx}>
                        <strong>{res.image}</strong>: {res.message || res.error}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UploadImages;