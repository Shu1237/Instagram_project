import axios from "axios";

export const uploadFileWithProgress = async (file, onProgress) => {
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const type = "auto";
  const cloud_url = `https://api.cloudinary.com/v1_1/${cloud_name}/${type}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  try {
    const response = await axios.post(cloud_url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      },
    });

    return {
      success: true,
      url: response.data.secure_url,
      public_id: response.data.public_id,
    };
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const uploadMultipleFilesWithProgress = async (
  files,
  onProgress,
  onFileComplete
) => {
  const results = [];
  const totalFiles = files.length;
  let completedFiles = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      const result = await uploadFileWithProgress(file, (fileProgress) => {
        // Calculate overall progress
        const overallProgress = Math.round(
          ((completedFiles + fileProgress / 100) / totalFiles) * 100
        );
        if (onProgress) {
          onProgress(overallProgress, i, fileProgress);
        }
      });

      results.push(result);
      completedFiles++;

      if (onFileComplete) {
        onFileComplete(i, result);
      }
    } catch (error) {
      results.push({
        success: false,
        error: error.message,
      });
      completedFiles++;
    }
  }

  return results;
};
