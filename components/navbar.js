import Link from "next/link";
import {
  HomeIcon,
  GlobeAltIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "@heroicons/react/solid";

export default function Navbar() {
  return (
    <div className="w-32 bg-white flex-shrink-0 fixed">
      <ul className="flex flex-col items-center py-6 gap-5">
        <li className="mb-6">
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
        <li className="mb-6">
          <Link href="/post">
            <div className="flex items-center">
              <PaperAirplaneIcon className="w-6 h-6" />
              <span className="text-md">Post</span>
            </div>
          </Link>
        </li>
        <li className="mb-6">
          <Link href="/profile">
            <div className="flex items-center">
              <HeartIcon className="w-6 h-6" />
              <span className="text-md">Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
