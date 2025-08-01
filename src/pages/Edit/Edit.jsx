import React, { useState, useEffect } from "react";
import "./Edit.css";
import Post from "../Post/Post";
import { useLocation } from 'react-router-dom';
import { usePosts } from "../../Data/Posts/Posts.jsx";
import { useImage } from "../../Data/Images/Images.jsx";

function Edit() {
    const { createOrUpdatePost } = usePosts();
    const { uploadImage } = useImage();
    const location = useLocation();

    const [postData, setPostData] = useState({
        title: "",
        SEO: { description: "", keywords: [] },
        image: "",
        content: [],
        status: "unpublished",
    });

    const handlePostChange = (field, value) => {
        setPostData(prev => ({ ...prev, [field]: value }));
    };

    const handleSEOChange = (field, value) => {
        setPostData(prev => ({
            ...prev,
            SEO: { ...prev.SEO, [field]: value }
        }));
    };

    const addSection = () => {
        setPostData(prev => ({
            ...prev,
            content: [...prev.content, { type: "text", text: "" }]
        }));
    };

    const updateSection = (index, value) => {
        const updated = [...postData.content];
        updated[index] = { ...updated[index], ...value };
        setPostData(prev => ({ ...prev, content: updated }));
    };

    const deleteSection = (index) => {
        const filtered = postData.content.filter((_, i) => i !== index);
        setPostData(prev => ({ ...prev, content: filtered }));
    };

    function handleImageUpload (index, file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof index === "number" && reader.result) {
                updateSection(index, {"ImageFile": file, "ImageURL": reader.result});
            } else {
                handlePostChange("imageFile", file);
                handlePostChange("image", reader.result);
            }
        };
        if (file) reader.readAsDataURL(file);
    };

    async function uploadImages() {
        const promises = postData.content.map(async (section, index) => {
            // Check if section is image type and imageURL is a File (not a string URL)
            if (section.ImageFile && !section.ImageURL.startsWith("http")){
                const url = await uploadImage(section.ImageFile , `posts/${postData.title}/section-${index}.jpg`);
                // Update the section's imageURL with the uploaded URL
                postData.content[index].ImageURL = url;
                delete postData.content[index].ImageFile; // Remove the ImageFile after upload
            }
        });
        await Promise.all(promises);
        if (postData.imageFile && !postData.image.startsWith("http")) {
            const url = await uploadImage(postData.imageFile, `posts/${postData.title}/header-image.jpg`);
            handlePostChange("image", url);
            delete postData.imageFile; // Remove the imageFile after upload
        }
    }

    async function savePost() {
        try {
            await uploadImages(); // Ensure images are uploaded before saving
            await createOrUpdatePost((postData?.id ? postData.id : null), postData);
        } catch (err) {
            console.error("Error saving post:", err);
        }
    }

    async function saveAndPublishPost() {
        try {
            await uploadImages(); // Ensure images are uploaded before saving
            await createOrUpdatePost((postData?.id ? postData.id : null), { ...postData, "status": "published" });
        } catch (err) {
            console.error("Error saving and publishing post:", err);
        }
    }

    useEffect(() => {
        const incomingPost = location.state?.post;
        // Check if incomingPost is defined and has the expected structure
        if (incomingPost) {
          // Safely map only allowed fields
          setPostData(prev => ({
            ...prev,
            ...(incomingPost.id && { id: incomingPost.id }),
            title: incomingPost.title || "",
            image: incomingPost.image || "",
            content: Array.isArray(incomingPost.content) ? incomingPost.content : [],
            SEO: {
              description: incomingPost.SEO?.description || "",
              keywords: incomingPost.SEO?.keywords || [],
            },
            status: incomingPost.status || "unpublished",
          }));
        }
    }, []);

    return (
        <div className="edit-container">
            <div className="edit-form">
                <h2>Edit Post</h2>
                <button onClick={savePost}>Save</button>
                <button onClick={saveAndPublishPost}>Save and publish</button>


                <label>Title</label>
                <input
                    type="text"
                    value={postData.title}
                    onChange={e => handlePostChange("title", e.target.value)}
                />

                <label>SEO Description</label>
                <input
                    type="text"
                    value={postData.SEO.description}
                    onChange={e => handleSEOChange("description", e.target.value)}
                />

                <label>SEO Keywords</label>
                <div className="keywords-box">
                    {postData.SEO.keywords.map((word, index) => (
                        <div key={index} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <p>{word}</p>
                            <button
                                type="button"
                                onClick={() =>
                                    handleSEOChange(
                                        "keywords",
                                        postData.SEO.keywords.filter((_, i) => i !== index)
                                    )
                                }
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Enter keyword and press Enter"
                    onKeyDown={e => {
                        if (e.key === "Enter" && e.target.value.trim() !== "") {
                            e.preventDefault();
                            handleSEOChange("keywords", [
                                ...postData.SEO.keywords,
                                e.target.value.trim(),
                            ]);
                            e.target.value = "";
                        }
                    }}
                />

                <label>Header Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(null, e.target.files[0])}
                />

                <h3>Sections</h3>
                {postData.content.map((section, index) => (
                    <div key={index} className="section-block">
                        <label>Type</label>
                        <select
                            value={section.type}
                            onChange={e => updateSection(index, {"type": e.target.value})}
                        >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="image">Image</option>
                            <option value="text">Text</option>
                        </select>

                        {(section.type === "left" || section.type === "right") && (
                            <>
                                <label>Text</label>
                                <textarea
                                    value={section.text}
                                    onChange={e => updateSection(index, {"text": e.target.value})}
                                />
                                <label>Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleImageUpload(index, e.target.files[0])}
                                />
                            </>
                        )}

                        {section.type === "text" && (
                            <>
                                <label>Text</label>
                                <textarea
                                    value={section.text}
                                    onChange={e => updateSection(index, {"text": e.target.value})}
                                />
                            </>
                        )}

                        {section.type === "image" && (
                            <>
                                <label>Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleImageUpload(index, e.target.files[0])}
                                />
                            </>
                        )}

                        <button type="button" onClick={() => deleteSection(index)}>
                            Delete Section
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addSection}>
                    + Add Section
                </button>
            </div>

            <div className="preview-panel">
                <Post inputData={postData} />
            </div>
        </div>
    );
}

export default Edit;