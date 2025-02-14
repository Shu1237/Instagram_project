import axios from 'axios'

export const uploadFile = async (file) => {
    const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const type = file.type.split("/")[0];
    const cloud_url = `https://api.cloudinary.com/v1_1/${cloud_name}/${type}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    try {
        const response = await axios.post(cloud_url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
        return response.data.secure_url;
    } catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);
        return null;
    }
};