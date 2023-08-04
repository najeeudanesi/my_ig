import React from "react";
import Navbar from "../components/navbar";
function explore() {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-2 min-h-screen">
        <div className="col-span-2 lg:col-span-1">
          <Navbar />
        </div>
        <div className="col-span-2 lg:col-span-1">
          {/* Main content */}
          {/* Add your main content here */}
        </div>
      </div>
    </div>
  );
}

export default explore;
