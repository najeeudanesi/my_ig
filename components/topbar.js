import React from "react";
import { useRouter } from "next/router";
import SearchPanel from "./searchPanel";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
function Topbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    if (searchQuery == "") {
      setSearchPanelOpen(false);
    } else {
      setSearchPanelOpen(true);
    }
  };

  const searchUsers = () => {
    const filteredUsers = users.filter((user) =>
      user.data().username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    if (searchQuery == "") {
      setSearchPanelOpen(false);
    } else {
      setSearchPanelOpen(true);
    }
    searchUsers();
  }, [searchQuery]);

  useEffect(() => {
    onSnapshot(query(collection(db, "users")), (snapshot) => {
      setUsers(snapshot.docs);
    });
  }, [db]);

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

  return (
    <div className="shadow-sm bg-white border-b z-50 sticky top-0 h-20 flex items-center justify-center">
      <div className="max-w-xs ">
        <div className="relative mt-1 p-3 rounded-md">
          <input
            className="bg-gray-50 block w-full  pl-7 text-xs h-10
            border-gray-300 focus:ring-black focus:border-black rounded-md"
            type={"text"}
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <SearchPanel
        isVisible={searchPanelOpen}
        onClose={() => setSearchPanelOpen(false)}
        users={filteredUsers}
      />
    </div>
  );
}

export default Topbar;
