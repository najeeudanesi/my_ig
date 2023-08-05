import Navbar from "../components/navbar";
import Topbar from "../components/topbar";

import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "../components/post";
import { db } from "../firebase";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-2 lg:col-span-1 h-screen">
          <Topbar />
        </div>
        <div className="col-span-4 lg:col-span-5 mt-20">
          <div className="flex flex-col items-center">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                uid={post.data().uid}
                img={post.data().image}
                caption={post.data().captionRef}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
