import { CameraIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { db, storage } from "../firebase";
function PostModal({ isvisible, close, user }) {
  if (!isvisible) return null;

  const imagePickerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);

  const addImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };

  const upload = async () => {
    if (loading) return;

    setLoading(true);

    const documentRef = await addDoc(collection(db, "posts"), {
      uid: user.uid,
      captionRef: captionRef.current.value,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${documentRef.id}/image`);

    await uploadString(imageRef, selectedImage, "data_url").then(
      async (snapshot) => {
        const URL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", documentRef.id), {
          image: URL,
        });
      }
    );

    close();
    setLoading(false);
    setSelectedImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[400px] flex flex-col bg-white rounded-md">
        <button
          className="text-red-600 font-semibold text-lg place-self-end"
          onClick={() => close()}
        >
          close X
        </button>
        {selectedImage && (
          <img
            src={selectedImage}
            className="w-full object-cover max-h-96 cursor-pointer"
            onClick={() => setSelectedImage(null)}
            alt=""
          />
        )}

        <div
          className="flex justify-center cursor-pointer"
          onClick={() => imagePickerRef.current.click()}
        >
          <CameraIcon className="w-10 h-10 text-gray-800" />
        </div>

        <div className="bg-white p-2 rounded-lg">
          <input
            type="text"
            placeholder="Add a caption"
            ref={captionRef}
            className="w-full p-2 outline-none"
          />

          <input type="file" ref={imagePickerRef} onChange={addImage} hidden />
          <button
            onClick={upload}
            className="w-full p-2 bg-blue-600 disabled:bg-gray-400 text-white rounded-md"
            disabled={!selectedImage}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
