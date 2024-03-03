import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { auth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

function signin() {
  const router = useRouter();

  const [{userInfo, newUser}, dispatch] = useStateProvider();

  useEffect( () => {
    if(userInfo?.id && !newUser){
      router.push("/");
    }
  }, [userInfo, newUser])

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { displayName: name, email, photoUrl: profileImage },
    } = await signInWithPopup(auth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });


        if (!data.status) {

          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          
          dispatch({
            
            type: reducerCases.SET_USER_INFO,
            
            userInfo: { name, email, profileImage, status: "" },
            
          });

          

          router.push("/onboarding");
        }else {

          const {id, name, email, profilePicture:profileImage, status} = data;
          dispatch({
            
            type: reducerCases.SET_USER_INFO,
            
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status
             },

            
          });
          router.push("/");

        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center bg-panel-header-background flex-col w-screen h-screen gap-6">

      {/* Whatsapp Giff  */}
      <div className="flex items-center justify-center">
        <Image
          src="/whatsapp.gif"
          width={300}
          height={300}
          alt="whatsapp"
          priority
        />
        <span className="text-7xl text-white">WhatsApp</span>
      </div>

      {/* button to login with google  */}
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg "
        onClick={handleLogin}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login With Google</span>
      </button>
    </div>
  );
}

export default signin;
