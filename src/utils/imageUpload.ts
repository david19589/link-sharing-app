import { useState } from "react";

export function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState(() => {
    return localStorage.getItem("previewUrl") || "";
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        localStorage.removeItem("previewUrl");
        setPreviewUrl(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const profilePicture = localStorage.getItem("previewUrl");

  return { handleImage, previewUrl, profilePicture };
}
