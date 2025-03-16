import { useState, useEffect } from "react";
import "../App.css";
import { IoSend } from "react-icons/io5";

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [commentText, setCommentText] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    // Fetch images from MongoDB
    useEffect(() => {
        fetch("http://localhost:5000/api/images")
            .then((res) => res.json())
            .then((data) => setPhotos(data))
            .catch((err) => console.error("Error fetching images:", err));
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return alert("Please select an image to upload.");

        const formData = new FormData();
        formData.append("image", selectedFile);

        const res = await fetch("http://localhost:5000/api/images/upload", {
            method: "POST",
            body: formData,
        });

        const newImage = await res.json();
        setPhotos([...photos, newImage.newImage]); // Add new image to gallery
        setSelectedFile(null);
    };

    return (
        <div className="gallery-container">
            <h2>Photo Gallery</h2>

            {/* Upload Button at Top Left */}
            <div className="upload-section">
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <div className="photos">
                {photos.map((photo) => (
                    <div key={photo._id} className="photo-card">
                        <img src={`http://localhost:5000${photo.url}`} alt="Gallery" />
                        
                        {/* Like & Save Buttons */}
                        <div className="photo-actions">
                            <button>❤️ {photo.liked ? "Unlike" : "Like"}</button>
                            <button>💾 {photo.saved ? "Unsave" : "Save"}</button>
                        </div>

                        {/* Comment Section */}
                        <div className="comments">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentText[photo._id] || ""}
                                onChange={(e) => setCommentText({ ...commentText, [photo._id]: e.target.value })}
                            />
                            <button><IoSend /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Logout Button at Bottom */}
            <button className="logout-button">Logout</button>
        </div>
    );
};

export default Gallery;
