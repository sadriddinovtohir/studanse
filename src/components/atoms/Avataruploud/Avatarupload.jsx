import { Camera } from "lucide-react";
import { useState } from "react";

export default function AvatarUpload({ setImage = () => { } }) {
  const [image, setLocalImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setLocalImage(url);
      setImage(file);
    }
  };

  return (
    <div className="relative w-[140px] h-[140px] mx-auto">

      {/* Avatar */}
      <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-gray-700 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-medium">
        {image ? (
          <img src={image} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          "AD"
        )}
      </div>

      {/* Camera button */}
      <label
        htmlFor="avatarInput"
        className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center border-4 border-black cursor-pointer"
      >
        <Camera className="text-white w-5 h-5" />
      </label>

      {/* Hidden input */}
      <input
        id="avatarInput"
        type="file"
        onChange={handleImage}
        className="hidden"
        accept="image/*"
      />

    </div>
  );
}