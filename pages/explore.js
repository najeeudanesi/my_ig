import React from "react";
import Navbar from "../components/navbar";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Topbar from "../components/topbar";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
function explore() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/auth/sign-in");
      }
    });
  }, [auth]);
  return (
    <div>
      {user && (
        <div>
          <Topbar />

          <div className="grid grid-cols-6 min-h-screen">
            <div className="col-span-2 lg:col-span-1 h-screen">
              <Navbar />
            </div>
            <div className="col-span-4 lg:col-span-5">
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {posts.map((post) => (
                  <img
                    key={post.id}
                    src={post.data().image}
                    className="object-cover w-full md:h-64  lg:h-80 h-32"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default explore;
