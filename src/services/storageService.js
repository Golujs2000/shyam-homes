import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

// Limits
export const MEDIA_LIMITS = {
  IMAGE_MAX_MB: 10,
  VIDEO_MAX_MB: 50,
  MAX_IMAGES: 8,
  MAX_VIDEOS: 2,
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/quicktime", "video/x-matroska", "video/webm", "video/avi"],
};

/** Validate a single file. Returns null if valid, or an error string. */
export function validateMediaFile(file) {
  const isImage = MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = MEDIA_LIMITS.ALLOWED_VIDEO_TYPES.includes(file.type);
  if (!isImage && !isVideo) {
    return `"${file.name}" is not supported. Use JPG, PNG, WebP, MP4, or MOV.`;
  }
  if (isImage && file.size > MEDIA_LIMITS.IMAGE_MAX_MB * 1024 * 1024) {
    return `"${file.name}" exceeds the ${MEDIA_LIMITS.IMAGE_MAX_MB} MB image limit.`;
  }
  if (isVideo && file.size > MEDIA_LIMITS.VIDEO_MAX_MB * 1024 * 1024) {
    return `"${file.name}" exceeds the ${MEDIA_LIMITS.VIDEO_MAX_MB} MB video limit.`;
  }
  return null;
}

/**
 * Upload a single media file to Firebase Storage.
 * @param {File} file
 * @param {string} requestId
 * @param {function} onProgress - called with percent (0-100)
 */
export function uploadMediaFile(file, requestId, onProgress) {
  return new Promise((resolve, reject) => {
    const isImage = MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type);
    const fileType = isImage ? "image" : "video";
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `listing-requests/${requestId}/${Date.now()}_${sanitizedName}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(percent);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(new Error(getUploadErrorMessage(error)));
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ url, path: storagePath, type: fileType, name: file.name, size: file.size });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/** Delete a file from Firebase Storage by its storage path. */
export async function deleteMediaFile(storagePath) {
  try {
    await deleteObject(ref(storage, storagePath));
    return { success: true };
  } catch (err) {
    console.warn("Error deleting media file:", err);
    return { success: false, error: err };
  }
}

function getUploadErrorMessage(error) {
  switch (error.code) {
    case "storage/unauthorized": return "Permission denied. Firebase Storage rules may need updating.";
    case "storage/canceled": return "Upload was cancelled.";
    case "storage/quota-exceeded": return "Firebase Storage quota exceeded.";
    default: return `Upload failed: ${error.message || "Unknown error"}`;
  }
}
