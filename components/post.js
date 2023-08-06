import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  PaperAirplaneIcon,
  DotsCircleHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import Moment from "react-moment";
import InputEmoji from "react-input-emoji";

function post({ id, uid, img, caption, timestamp }) {
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

  const postComment = async () => {
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
    <div>
      {user && (
        <div className="bg-white rounded-md my-7 border w-full object-cover  max-w-[800px]">
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
              <TrashIcon
                className="h-6 cursor-pointer text-red-500"
                onClick={deletePost}
              />
            ) : (
              <DotsCircleHorizontalIcon className="h-6 text-gray-500" />
            )}
          </div>
          <div>
            <img
              src={img}
              className="object-cover w-[800px] max-h-[800px] "
              alt="not available"
            />
          </div>
          <div className="flex justify-between items-center px-4 pt-4 my-2">
            <div className="flex items-center space-x-2">
              {hasUserLiked ? (
                <HeartIconFilled
                  onClick={likethePost}
                  className=" text-red-700 h-10 w-10 cursor-pointer"
                />
              ) : (
                <HeartIcon
                  onClick={likethePost}
                  className=" text-black h-10 w-10 cursor-pointer"
                />
              )}
              <div className="text-black font-semibold text-lg">
                {" "}
                {likes.length}
                {" Likes"}
              </div>
            </div>
          </div>
          <div className="px-8 pb-4">
            <div className="flex items-center space-x-1 ">
              <p className="font-semibold text-lg">
                {posterData?.data().username}
              </p>
              <div className="px-2">
                {" "}
                <p className="text-gray-800 text-sm">{caption}</p>
              </div>
            </div>

            {comments.length > 0 && (
              <div className="max-h-24 overflow-y-scroll">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-center space-x-2 mb-3"
                  >
                    <img
                      className="h-6 w-6 rounded-full object-cover"
                      src={comment.data().userImage}
                      alt=""
                    />
                    <span className="font-semibold text-sm">
                      {" "}
                      {comment.data().username}
                    </span>
                    <p className="text-sm">{comment.data().comment}</p>
                    <Moment fromNow className="pr-5 text-xs text-gray-600">
                      {comment.data().timestamp?.toDate()}
                    </Moment>
                  </div>
                ))}
              </div>
            )}
            <form className="flex items-center p-4">
              <InputEmoji
                type="text"
                value={comment}
                onChange={setComment}
                placeholder="Add a comment..."
                onEnter={postComment}
              />
            </form>
            <Moment className="text-gray-900 my-2" fromNow>
              {timestamp?.toDate()}
            </Moment>
          </div>
        </div>
      )}
    </div>
  );
}

export default post;
