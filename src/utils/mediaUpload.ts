/**
 * Media Upload & Optimization Utilities
 * Handles client-side image compression, video thumbnail extraction,
 * and reliable cloud video/image upload without freezing the browser
 * or exceeding Firestore document limits (1MB).
 */

const IMGUR_CLIENT_ID = '546c25a59c58ad7';

/**
 * Compresses an image file using HTML5 Canvas to a crisp, lightweight JPEG/WebP.
 * Keeps resolution high (up to 1280px) while shrinking file size from 5-10MB to ~60-120KB.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) return reject(new Error('Empty image file'));

      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src); // fallback to original if canvas unsupported
          return;
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight JPEG
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Extracts a crystal-clear thumbnail poster frame from a video file
 * using HTML5 Video and Canvas.
 */
export async function extractVideoThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video');
      const url = URL.createObjectURL(file);
      video.src = url;
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0.5;

      const cleanUp = () => {
        URL.revokeObjectURL(url);
      };

      video.onloadeddata = () => {
        video.currentTime = Math.min(0.5, (video.duration || 1) / 2);
      };

      video.onseeked = () => {
        try {
          const canvas = document.createElement('canvas');
          const width = Math.min(640, video.videoWidth || 640);
          const height = video.videoHeight
            ? Math.round((video.videoHeight * width) / (video.videoWidth || 1))
            : 360;

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, width, height);
            const thumb = canvas.toDataURL('image/jpeg', 0.8);
            cleanUp();
            resolve(thumb);
            return;
          }
        } catch {
          // ignore error
        }
        cleanUp();
        resolve('');
      };

      video.onerror = () => {
        cleanUp();
        resolve('');
      };

      // Timeout safety
      setTimeout(() => {
        cleanUp();
        resolve('');
      }, 4000);
    } catch {
      resolve('');
    }
  });
}

/**
 * Uploads a video file to high-speed cloud CDN (Imgur).
 * Returns permanent direct HTTPS URL for video streaming (.mp4).
 */
export async function uploadVideoToCloud(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  // Max size 50MB for video upload
  const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
  if (file.size > MAX_VIDEO_BYTES) {
    throw new Error('حجم الفيديو أكبر من 50 ميجابايت، يرجى اختيار مقطع أصغر');
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/upload');
    xhr.setRequestHeader('Authorization', `Client-ID ${IMGUR_CLIENT_ID}`);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && response.success && response.data) {
          const directUrl = response.data.mp4 || response.data.link;
          if (directUrl) {
            resolve(directUrl);
            return;
          }
        }
        reject(
          new Error(
            response.data?.error?.message ||
              response.data?.error ||
              'فشل رفع الفيديو إلى خادم السحاب'
          )
        );
      } catch (err) {
        reject(new Error('فشل معالجة استجابة خادم السحاب'));
      }
    };

    xhr.onerror = () => {
      reject(new Error('خطأ في الاتصال بالإنترنت أثناء رفع الفيديو'));
    };

    const formData = new FormData();
    formData.append('video', file);
    xhr.send(formData);
  });
}

/**
 * Uploads an image file to cloud CDN or falls back to canvas-compressed base64.
 */
export async function uploadImageToCloud(file: File): Promise<string> {
  try {
    const compressedBase64 = await compressImageFile(file, 1280, 1280, 0.82);

    // If image is already tiny (< 150KB), base64 is completely safe and fast in Firestore
    if (compressedBase64.length < 200000) {
      return compressedBase64;
    }

    // Otherwise upload to Imgur CDN for ultra-lightweight URL
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (data.success && data.data?.link) {
      return data.data.link;
    }

    // fallback to compressed base64
    return compressedBase64;
  } catch {
    // fallback to compressed base64
    return compressImageFile(file, 1000, 1000, 0.75);
  }
}
