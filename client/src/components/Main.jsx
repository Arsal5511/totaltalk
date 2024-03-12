import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { auth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import ChatList from "./Chatlist/ChatList";

function Main() {
  const router = useRouter();
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);
  useEffect(() => {
    if (redirectLogin) {
      router.push("/signin");
    }
  }, [redirectLogin]);

  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      setRedirectLogin(true);
    }

    if (!userInfo && currentUser) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });

      if (!data.status) {
        router.push("/signin");
      }
      const {
        id,
        name,
        email,
        profilePicture: profileImage,
        status,
      } = data.data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: {
          id,
          name,
          email,
          profileImage,
          status,
        },
      });
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`)
      console.log({data})
    };
    if(currentChatUser?.id){

      getMessages();
    }
  }, [currentChatUser]);

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden ">
      <ChatList />
      {currentChatUser ? <Chat /> : <Empty />}
      <Chat />
    </div>
  );
}

export default Main;
