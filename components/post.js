import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Moment from "react-moment";
import { DotsCircleHorizontalIcon, TrashIcon } from "@heroicons/react/solid";

function post({ id, uid, img, caption }) {
  const [user, setUser] = useState();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const [posterData, setPosterData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [db]);

  //get the comments
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  //getting the data of the person who posted it
  useEffect(() => {
    onSnapshot(
      query(collection(db, "users"), where("id", "==", uid)),
      (snapshot) => setPosterData(snapshot.docs[0])
    );
  });

  //check if current user has liked
  useEffect(() => {
    setHasUserLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likes]);

  //get the likes
  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db, id]);

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", id));
  };

  const postComment = async (e) => {
    e.preventDefault();

    const commentToPost = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToPost,
      username: user.displayName,
      userImage: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  const likethePost = async () => {
    if (!hasUserLiked) {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    } else {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    }
  };
  return (
    <div className="bg-white my-7 border rounded-sm w-full object-cover ">
      {/* Header */}

      <div className="flex items-center p-5">
        <img
          src={posterData?.data().profileImg}
          className="rounded-full h-12 w-12  border p-1 mr-3 object-cover"
          alt=""
        />
        <a
          href={`/${posterData?.data().username}`}
          className="flex-1 font-semibold"
        >
          {posterData?.data().username}
        </a>

        {user?.uid == uid ? (
          <TrashIcon className="h-5 cursor-pointer" onClick={deletePost} />
        ) : (
          <DotsCircleHorizontalIcon className="h-5" />
        )}
      </div>
      <img
        src={img}
        className="object-cover w-[800px] max-h-[800px] "
        alt="not available"
      />
    </div>
  );
}

export default post;
