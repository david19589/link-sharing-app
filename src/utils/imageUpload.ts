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
        setPreviewUrl(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return { handleImage, previewUrl, setPreviewUrl };
}
