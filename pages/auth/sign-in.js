import "../../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firbase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setShowSnackbar(true);
      setSnackbarColor("green");
      router.push("/");
    } catch (error) {
      console.error(error);
      setShowSnackbar(true);
      setSnackbarColor("red");
    }

    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center">
        <div className="w-full max-w-xs">
          <p className="font-xs italic">This is najiu's version of Instagram</p>
          <div className="mt-32 ">
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mb-3 flex flex-col items-end">
              {" "}
              <a href="/auth/forgetpassword" className="text-blue-500 text-sm">
                forgot password?
              </a>{" "}
            </div>

            {loading ? (
              <button
                disabled
                className="w-full bg-gray-500 text-white py-3 rounded-lg focus:outline-none"
              >
                Loading...
              </button>
            ) : (
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-600"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            )}
          </div>

          <p className="mt-4">
            Don't have an account?{" "}
            <a href="/auth/sign-up" className="text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
      {showSnackbar && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-lg text-white ${
            snackbarColor === "green" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {snackbarColor === "green"
            ? "Login Successful!"
            : "invalid credentials!"}
        </div>
      )}
    </>
  );
}

export default SignIn;
