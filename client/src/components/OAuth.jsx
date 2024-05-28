import { AiFillGithub } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import { BsGoogle } from "react-icons/bs";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../firebase";
import { useGoogleRegisterMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OAuth = () => {
  const [googleRegister, { isLoading, error, data }] =
    useGoogleRegisterMutation();

  const navigate = useNavigate();

  const auth = getAuth(app);
  // google
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const user = resultsFromGoogle.user;
      const googleData = {
        name: user.displayName,
        email: user.email,
        avatar: {
          url: user.photoURL,
        },
      };
      googleRegister(googleData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //github
  const handleGithubClick = async () => {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGitHub = await signInWithPopup(auth, provider);
      console.log(resultsFromGitHub);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-11">
      <button
        type="button"
        className="bg-gray-200 p-4 rounded-full border-green-500 border-2"
        onClick={handleGoogleClick}
      >
        <BsGoogle className="text-base" />
      </button>
      {/* <button
        type="button"
        className="bg-gray-200 p-3 rounded-full border-green-500 border-2"
      >
        <CgFacebook className="text-2xl" />
      </button>
      <button
        type="button"
        className="bg-gray-200 p-3 rounded-full border-green-500 border-2"
      >
        <AiFillGithub className="text-2xl" onClick={handleGithubClick} />
      </button> */}
    </div>
  );
};
export default OAuth;
