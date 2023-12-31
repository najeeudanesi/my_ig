import Link from "next/link";
import {
  HomeIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import PostModal from "./postmodal";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [db]);

  const logOut = () => {
    auth.signOut();
  };

  return (
    <div className="fixed">
      {user && (
        <div className="w-32 bg-white flex-shrink-0">
          <ul className="flex flex-col items-center py-6 gap-5">
            <li className="mb-6 mt-20">
              <Link href="/">
                <div className="flex items-center">
                  <HomeIcon className="w-6 h-6" />
                  <span className="text-md">Home</span>
                </div>
              </Link>
            </li>
            <li className="mb-6">
              <Link href="/explore">
                <div className="flex items-center">
                  <GlobeAltIcon className="w-6 h-6" />
                  <span className="text-md">Explore</span>
                </div>
              </Link>
            </li>
            <li className="mb-6 cursor-pointer">
              <div className="flex items-center" onClick={() => setOpen(true)}>
                <div className="flex  justify-between">
                  <PlusCircleIcon className="w-6 h-6" />
                  <span className="text-md">Post</span>
                </div>
              </div>
            </li>
            <li className="mb-6">
              <Link href="/profile">
                <div className="flex items-center">
                  <UserIcon className="w-6 h-6" />
                  <span className="text-md">Profile</span>
                </div>
              </Link>
            </li>
            <li className="mt-12">
              <div className="flex items-center">
                <button className="btn" onClick={logOut}>
                  Log Out
                </button>
              </div>
            </li>
          </ul>

          <PostModal
            isvisible={open}
            close={() => setOpen(false)}
            user={user}
          />
        </div>
      )}
    </div>
  );
}
