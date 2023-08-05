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
      <Topbar />
      <div className="grid grid-cols-2 min-h-screen">
        <div className="col-span-2 lg:col-span-1">
          <Navbar />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div>
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
